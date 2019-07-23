<?php
/**
 * craft-sync-db plugin for Craft CMS 3.x
 *
 * Craft 3 plugin to sync database across environments
 *
 * @link      github.com/unionco
 * @copyright Copyright (c) 2018 Abry Rath<unionco@gmail.com>
 */

namespace unionco\craftsyncdb;

use Craft;
use craft\base\Plugin;
use craft\console\Application as ConsoleApplication;
use craft\events\PluginEvent;
use craft\events\RegisterCpNavItemsEvent;
use craft\events\RegisterTemplateRootsEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\i18n\PhpMessageSource;
use craft\services\Plugins;
use craft\web\twig\variables\Cp;
use craft\web\UrlManager;
use craft\web\View;
use unionco\craftsyncdb\services\CpService;
use unionco\craftsyncdb\services\Sync as SyncService;
use unionco\craftsyncdb\twigextensions\SyncDbTwigExtension;
use unionco\syncdb\SyncDb;
use yii\base\Event;

/**
 * Class Craftsyncdb
 *
 * @author    Abry Rath<unionco@gmail.com>
 * @package   Craftsyncdb
 * @since     1.0.0
 *
 * @property  SyncService $sync
 */
class SyncDbPlugin extends Plugin
{
    const CONSOLE_PREFIX = 'sync-db/sync';
    const DUMP_COMMAND = '/dump';

    /** @var SyncDbPlugin */
    public static $plugin;

    /**
     * @var \unionco\syncdb\SyncDb
     * @psalm-suppress PropertyNotSetInConstructor
     **/
    public $syncDb;

    /** @var string */
    public $schemaVersion = '1.0.0';

    /**
     * @param string $id
     * @param null|\yii\base\Module $parent
     * @param array $config
     */
    public function __construct($id, $parent = null, array $config = [])
    {
        $this->id = $id;

        /** @psalm-suppress UndefinedClass */
        Craft::setAlias('@plugins/sync-db', $this->getBasePath());

        // Translation category
        /** @psalm-suppress UndefinedClass */
        $i18n = Craft::$app->getI18n();
        /** @noinspection UnSafeIsSetOverArrayInspection */
        if (!isset($i18n->translations[$id]) && !isset($i18n->translations[$id . '*'])) {
            $i18n->translations[$id] = [
                'class' => PhpMessageSource::class,
                'sourceLanguage' => 'en-US',
                'basePath' => '@plugins/sync-db/translations',
                'forceTranslation' => true,
                'allowOverrides' => true,
            ];
        }

        Event::on(
            View::class,
            View::EVENT_REGISTER_CP_TEMPLATE_ROOTS,
            function (RegisterTemplateRootsEvent $event) {
                $event->roots['sync-db'] = $this->getBasePath() . '/templates';
            }
        );

        parent::__construct($id, $parent, $config);
    }

    /**
     * @return void
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;
        
        $this->checkConfigFileExists();
        
        /** @psalm-suppress UndefinedClass */
        if (!$this->syncDb) {
            $this->syncDb = new SyncDb([
                'baseDir' => CRAFT_BASE_PATH,
                'storagePath' => Craft::$app->getPath()->getStoragePath(),
                'environments' => Craft::$app->getPath()->getConfigPath() . '/syncdb.php',
                'remoteDumpCommand' => 'craft ' . self::CONSOLE_PREFIX . self::DUMP_COMMAND,
            ]);
        }

        if (Craft::$app instanceof ConsoleApplication) {
            $this->controllerNamespace = 'unionco\craftsyncdb\console\controllers';
        } else {
            Craft::$app->getView()->registerTwigExtension(new SyncDbTwigExtension());
        }

        $this->setComponents([
            'cp' => CpService::class,
        ]);

        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_INSTALL_PLUGIN,
            function (PluginEvent $event) {
                if ($event->plugin === $this) {
                    $this->checkConfigFileExists();
                }
            }
        );

        Event::on(
            Cp::class,
            Cp::EVENT_REGISTER_CP_NAV_ITEMS,
            function (RegisterCpNavItemsEvent $event) {
                $event->navItems[] = [
                    'url' => 'sync-db',
                    'label' => 'Sync Database',
                    'icon' => '@plugins/sync-db/icon-mask.svg',
                ];
            }
        );

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                // URL: /admin/sync-db/start
                $event->rules['sync-db/sync/start'] = 'sync-db/sync/init';
                $event->rules['sync-db/sync/status'] = 'sync-db/sync/status';
                $event->rules['sync-db/status'] = 'sync-db/sync/status';
            }
        );

        /** @psalm-suppress UndefinedClass */
        Craft::info(
            /** @psalm-suppress UndefinedClass */
            Craft::t(
                'sync-db',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    public static function getInstance(): SyncDbPlugin
    {
        return self::$plugin;
    }

    public function checkConfigFileExists()
    {
        /** @psalm-suppress UndefinedClass */
        $configFilePath = Craft::$app->getPath()->getConfigPath() . '/syncdb.php';
        if (!file_exists($configFilePath)) {
            $defaultConfigPath = $this->basePath . '/config/default.php';
            if (!file_exists($defaultConfigPath)) {
                throw new \Exception("Default configuration not found");
            }
            copy($defaultConfigPath, $configFilePath);
        }
    }
}
