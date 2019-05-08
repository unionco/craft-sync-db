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

use Craft;
use Monolog\Logger;
use yii\helpers\Console;
use yii\console\Controller;
use Monolog\Handler\StreamHandler;
use unionco\craftsyncdb\SyncDbPlugin;

/**
 * Sync Command
 *
 * @author    Abry Rath<unionco@gmail.com>
 * @package   SyncDb
 * @since     1.0.0
 */
class SyncController extends Controller
{
    /** 
     * @param string $environment
     * @return int */
    public function actionIndex($environment = 'production')
    {
        /** @var \unionco\syncdb\SyncDb */
        $syncDb = SyncDbPlugin::$plugin->syncDb;
        
        $syncDb->sync(null, $environment);

        return self::EXIT_CODE_NORMAL;
    }

    /** @return int */
    public function actionDumpmysql()
    {
        /** @var \unionco\syncdb\SyncDbPlugin */
        $syncDb = SyncDbPlugin::$plugin->syncDb;
        
        $syncDb->dump();

        return self::EXIT_CODE_NORMAL;
    }

    public function actionBackground(string $logFile, string $env)
    {
        $filePath = Craft::$app->getPath()->getStoragePath() . '/' . $logFile;
        $logger = new Logger('sync');
        $logger->pushHandler(new StreamHandler($filePath, Logger::INFO));
        $syncDb = SyncDbPlugin::getInstance()->syncDb;
        $syncDb->sync($logger, $env);
    }
}
