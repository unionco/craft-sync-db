<?php
/**
 * craft-sync-db plugin for Craft CMS 3.x
 *
 * Craft 3 plugin to sync database across environments
 *
 * @link      github.com/unionco
 * @copyright Copyright (c) 2018 Abry Rath<unionco@gmail.com>
 */

namespace unionco\craftsyncdb\console\controllers;

use unionco\craftsyncdb\SyncDb;
use unionco\craftsyncdb\util\Logger;
use Craft;
use yii\console\Controller;
use yii\helpers\Console;

/**
 * Sync Command
 *
 * @author    Abry Rath<unionco@gmail.com>
 * @package   SyncDb
 * @since     1.0.0
 */
class SyncController extends Controller
{

    public function getLogger()
    {
        return new Logger(new Console());
    }

    public function actionIndex($environment = 'production')
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
