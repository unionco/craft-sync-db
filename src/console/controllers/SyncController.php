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
use craft\helpers\Console;
use unionco\syncdb\SyncDb;
use yii\console\Controller;
use yii\console\widgets\Table;
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
        $craft = SyncDbPlugin::$plugin->craft;
        $craft->run($environment);

        return self::EXIT_CODE_NORMAL;
    }

    /** @return int */
    public function actionDumpConfig($environment = 'production')
    {
        $craft = SyncDbPlugin::$plugin->craft;

        [
            'config' => $config,
            'ssh' => $ssh,
            'remoteDb' => $remoteDb,
            'localDb' => $localDb,
        ] = $craft->dumpConfig($environment);

        $this->stdout("Common Config\n", Console::FG_GREEN);
        echo Table::widget([
            'headers' => ['remoteWorkingDir', 'localWorkingDir'],
            'rows' => [[$config['remoteWorkingDir'], $config['localWorkingDir']]],
        ]);

        $this->stdout("SSH Config\n", Console::FG_GREEN);
        echo Table::widget([
            'headers' => ['Key', 'Value'],
            'rows' => $ssh->getRows(),
        ]);

        $this->stdout("Remote Database Config\n", Console::FG_GREEN);
        echo Table::widget([
            'headers' => ['Key', 'Value'],
            'rows' => $remoteDb->getRows(),
        ]);

        $this->stdout("Local Database Config\n", Console::FG_GREEN);
        echo Table::widget([
            'headers' => ['Key', 'Value'],
            'rows' => $localDb->getRows(),
        ]);

        return self::EXIT_CODE_NORMAL;
    }
}
