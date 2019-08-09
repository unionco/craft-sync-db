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
use craft\web\View;
use yii\base\Event;
use craft\base\Plugin;
use craft\web\UrlManager;
use unionco\syncdb\SyncDb;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\i18n\PhpMessageSource;
use craft\web\twig\variables\Cp;
use Symfony\Component\Yaml\Yaml;
use unionco\craftsyncdb\SyncDbPlugin;
use craft\events\RegisterUrlRulesEvent;
use unionco\craftsyncdb\models\Settings;
use craft\events\RegisterCpNavItemsEvent;
use unionco\craftsyncdb\services\CpService;
use craft\events\RegisterTemplateRootsEvent;
use craft\console\Application as ConsoleApplication;
use unionco\craftsyncdb\services\Sync as SyncService;
use unionco\craftsyncdb\twigextensions\SyncDbTwigExtension;

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
    /** Constants */
    const CONSOLE_PREFIX = 'sync-db/sync';
    const DUMP_COMMAND = '/dump';

    /** @var SyncDbPlugin */
    public static $plugin;

    /** @var string */
    public static $yamlConfigFile = '';

    /** @var \unionco\syncdb\SyncDb|null **/
    public $syncDb;

    /** @var string */
    public $schemaVersion = '1.1.0';

    /** @var bool */
    public $hasCpSettings = true;

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
        static::$yamlConfigFile = Craft::$app->getPath()->getConfigPath() . '/syncdb.yaml';

        $this->setComponents([
            'cp' => CpService::class,
        ]);

        $this->syncDb = new SyncDb([
            /** @psalm-suppress UndefinedConst */
            'baseDir' => Craft::$app->getBasePath(),
            'storagePath' => Craft::$app->getPath()->getStoragePath(),
            'environments' => $this->getSettings()->getEnvironments(),
            'remoteDumpCommand' => 'craft ' . self::CONSOLE_PREFIX . self::DUMP_COMMAND,
        ]);

        if (Craft::$app instanceof ConsoleApplication) {
            $this->controllerNamespace = 'unionco\craftsyncdb\console\controllers';
        } else {
            Craft::$app->getView()->registerTwigExtension(new SyncDbTwigExtension());
        }


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
                $event->rules['sync-db/config/save'] = 'sync-db/config/save';
                $event->rules['sync-db/yaml'] = 'sync-db/config/yaml';
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

    protected function createSettingsModel()
    {
        if (!static::$yamlConfigFile) {
            return;
        }
        if (!file_exists(static::$yamlConfigFile)) {
            $this->cp->convertConfigFile();
        }
        $settings = new Settings();
        $settings->hydrate(static::$yamlConfigFile);
        return $settings;
    }

    protected function settingsHtml()
    {
        $tableNames = Craft::$app->getDb()->getSchema()->getTableNames();
        $view = Craft::$app->getView();
        $options = [
            'settings' => $this->getSettings(),
            'tableNames' => $tableNames,
        ];

        return $view->renderTemplate('sync-db/settings', $options);
    }
}
