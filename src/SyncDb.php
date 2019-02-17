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
use yii\base\Event;
use craft\base\Plugin;
use unionco\syncdb\SyncDb as SyncDbLib;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\i18n\PhpMessageSource;
use craft\console\Application as ConsoleApplication;
use unionco\craftsyncdb\services\Sync as SyncService;

/**
 * Class Craftsyncdb
 *
 * @author    Abry Rath<unionco@gmail.com>
 * @package   Craftsyncdb
 * @since     1.0.0
 *
 * @property  SyncService $sync
 */
class SyncDb extends Plugin
{
    const CONSOLE_PREFIX = 'sync-db/sync';
    const DUMP_COMMAND = '/dumpmysql';

    /** @var SyncDb */
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
        parent::__construct($id, $parent, $config);
    }

    /**
     * @return void
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        /** @psalm-suppress UndefinedClass */
        $configFilePath = Craft::$app->getPath()->getConfigPath() . '/syncdb.php';
        if (!file_exists($configFilePath)) {
            $defaultConfigPath = $this->basePath . '/config/default.php';
            if (!file_exists($defaultConfigPath)) {
                throw new \Exception("Default configuration not found");
            }
            copy($defaultConfigPath, $configFilePath);
        }

        /** @psalm-suppress UndefinedClass */
        if (!$this->syncDb) {
            $this->syncDb = new SyncDbLib([
                'baseDir' => CRAFT_BASE_PATH,
                'storagePath' => Craft::$app->getPath()->getStoragePath(),
                'environments' => Craft::$app->getPath()->getConfigPath() . '/syncdb.php',
                'remoteDumpCommand' => 'craft ' . self::CONSOLE_PREFIX . self::DUMP_COMMAND,
            ]);
        }

        if (Craft::$app instanceof ConsoleApplication) {
            $this->controllerNamespace = 'unionco\craftsyncdb\console\controllers';
        }

        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_INSTALL_PLUGIN,
            function (PluginEvent $event) {
                if ($event->plugin === $this) {
                }
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
}
