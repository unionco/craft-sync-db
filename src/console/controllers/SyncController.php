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

use abryrath\craftsyncdb\SyncDb;
use abryrath\craftsyncdb\util\Logger;
use Craft;
use yii\console\Controller;
use yii\helpers\Console;

/**
 * Sync Command
 *
 * @author    Abry Rath<abryrath@gmail.com>
 * @package   SyncDb
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
        SyncDb::$plugin->syncDb->sync($logger, $environment);
    }

    public function actionDumpmysql()
    {
        $logger = $this->getLogger();
        SyncDb::$plugin->syncDb->dump($logger);
    }
}
