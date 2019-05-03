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

use unionco\craftsyncdb\SyncDbPlugin;
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
}
