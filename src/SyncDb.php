<?php
/**
 * craft-sync-db plugin for Craft CMS 3.x
 *
 * Craft 3 plugin to sync database across environments
 *
 * @link      github.com/abryrath
 * @copyright Copyright (c) 2018 Abry Rath<abryrath@gmail.com>
 */

namespace abryrath\craftsyncdb;

use abryrath\craftsyncdb\models\Settings;
use abryrath\craftsyncdb\services\Sync as SyncService;
//use abryrath\syncdb\SyncDb;
use Craft;
use craft\base\Plugin;
use craft\console\Application as ConsoleApplication;
use craft\events\PluginEvent;
use craft\services\Plugins;
use yii\base\Event;

/**
 * Class Craftsyncdb
 *
 * @author    Abry Rath<abryrath@gmail.com>
 * @package   Craftsyncdb
 * @since     1.0.0
 *
 * @property  SyncService $sync
 */
class SyncDb extends Plugin
{
    const CONSOLE_PREFIX = 'sync-db/sync';
    const DUMP_COMMAND = 'dumpmysql';

    public static $plugin;
    public $syncDb;

    public $schemaVersion = '1.0.0';

    public function init()
    {
        parent::init();
        self::$plugin = $this;
        $this->syncDb = new SyncDb([
            'baseDir' => CRAFT_BASE_PATH,
            'storagePath' => Craft::$app->getPath()->getStoragePath(),
            'environments' => Craft::$app->getPath()->getConfigPath() . '/syncdb.php',
            'remoteDumpCommand' => 'craft sync-db/sync/dumpmysql',
        ]);

        if (Craft::$app instanceof ConsoleApplication) {
            $this->controllerNamespace = 'abryrath\craftsyncdb\console\controllers';
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

    protected function createSettingsModel()
    {
        return new Settings();
    }

    protected function settingsHtml(): string
    {
        return Craft::$app->view->renderTemplate(
            'sync-db/settings',
            [
                'settings' => $this->getSettings(),
            ]
        );
    }
}
