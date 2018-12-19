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
use abryrath\craftsyncdb\util\Logger;
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

    public function getLogger()
    {
        return new Logger(new Console());
    }

    public function actionSyncDb($environment = 'production')
    {
        $logger = $this->getLogger();
        Craftsyncdb::$plugin->syncDb->sync($logger, $environment);
    }

    public function actionDumpmysql()
    {
        $logger = $this->getLogger();
        Craftsyncdb::$plugin->syncDb->dump($logger);
    }
}
