<?php
/**
 * craft-sync-db plugin for Craft CMS 3.x
 *
 * Craft 3 plugin to sync database across environments
 *
 * @link      github.com/abryrath
 * @copyright Copyright (c) 2018 Abry Rath<abryrath@gmail.com>
 */

namespace abryrath\craftsyncdb\console\controllers;

use abryrath\craftsyncdb\Craftsyncdb;
use Craft;
use yii\console\Controller;
use yii\helpers\Console;

/**
 * Sync Command
 *
 * @author    Abry Rath<abryrath@gmail.com>
 * @package   Craftsyncdb
 * @since     1.0.0
 */
class SyncController extends Controller
{
    // Public Methods
    // =========================================================================

    /**
     * Handle craft-sync-db/sync console commands
     *
     * @return mixed
     */
    public function actionIndex()
    {
        $result = 'something';

        echo "Welcome to the console SyncController actionIndex() method\n";

        return $result;
    }

    public function actionSyncDb($environment = 'production')
    {
        $logger = new class($this)
        {
            protected $console;
            protected $levels = [
                'info' => CONSOLE::FG_GREEN,
                'error' => CONSOLE::FG_RED,
                'normal' => CONSOLE::FG_YELLOW,
            ];

            public function __construct($console)
            {
                $this->console = $console;
            }

            public function log($text, $level = 'normal')
            {
                $this->console->stdout($text, $this->levels[$level]);
                $this->console->stdout(PHP_EOL);
            }
        };

        Craftsyncdb::$plugin->sync->sync($logger, $environment);
    }

    public function actionDumpmysql()
    {
        Craftsyncdb::$plugin->sync->dumpMysql();
    }
}
