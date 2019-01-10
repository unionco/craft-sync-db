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

use unionco\craftsyncdb\services\Sync as SyncService;
//use unionco\syncdb\SyncDb;
use craft\i18n\PhpMessageSource;
use Craft;
use craft\base\Plugin;
use craft\console\Application as ConsoleApplication;
use craft\events\PluginEvent;
use craft\services\Plugins;
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
class SyncDb extends Plugin
{
    const CONSOLE_PREFIX = 'sync-db/sync/';
    const DUMP_COMMAND = 'dumpmysql';
    const SYNC_COMMAND = 'sync-db';

    public static $plugin;
    public $syncDb;

    public $schemaVersion = '1.0.0';

    public function __construct($id, $parent = null, array $config = [])
    {
        $this->id = $id;
        Craft::setAlias('@plugins/sync-db', $this->getBasePath());
        // Translation category
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

    public function init()
    {
        parent::init();
        self::$plugin = $this;
        $this->syncDb = new \unionco\syncdb\SyncDb([
            'baseDir' => CRAFT_BASE_PATH,
            'storagePath' => Craft::$app->getPath()->getStoragePath(),
            'environments' => Craft::$app->getPath()->getConfigPath() . '/syncdb.php',
            'remoteDumpCommand' => 'craft ' . self::CONSOLE_PREFIX . self::DUMP_COMMAND,
        ]);

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

        Craft::info(
            Craft::t(
                'sync-db',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }
}
