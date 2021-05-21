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
use craft\helpers\StringHelper;
use unionco\syncdb\Model\ChainStep;
use unionco\syncdb\Model\SetupStep;
use unionco\craftsyncdb\SyncDbPlugin;
use unionco\syncdb\Model\TeardownStep;
use Monolog\Logger;
/**
 * Sync Command
 *
 * @author    Abry Rath<unionco@gmail.com>
 * @package   SyncDb
 * @since     1.0.0
 */
class SyncController extends Controller
{
    protected $defaultAction = 'sync';

    /**
     * @param string $environment
     * @return int */
    public function actionSync(string $environment = 'production', string $logLevel = '')
    {
        $craft = SyncDbPlugin::$plugin->craft;
        $l = $this->_parseLogLevel($logLevel);
        $craft->run($environment, $l);

        return self::EXIT_CODE_NORMAL;
    }

    public function actionPreview(string $environment = 'production', string $logLevel = '')
    {
        $craft = SyncDbPlugin::$plugin->craft;
        $l = $this->_parseLogLevel($logLevel);
        $scenario = $craft->preview($environment, $l);
        $ssh = $scenario->getSshContext();

        $this->stdout("Setup Commands\n", Console::FG_GREEN);
        $this->stdout("These commands are run before any of the chained action commands\n");

        $rows = \array_map(
            function (SetupStep $step) use ($ssh): array {
            return [
                $step->getId(),
                $step->getName(),
                $step->getCommandString($ssh, true, true)
            ];
        }, $scenario->getSetupSteps());

        echo Table::widget([
            'headers' => ['ID', 'Name', 'Command'],
            'rows' => $rows,
        ]);

        $this->stdout("Chain Commands\n", Console::FG_GREEN);
        $this->stdout("These are the primary actions to sync the database\n");

        $rows = \array_map(
            function (ChainStep $step) use ($ssh): array {
            return [
                $step->getId(),
                $step->getName(),
                $step->getCommandString($ssh, true, true)
            ];
        }, $scenario->getChainSteps());

        echo Table::widget([
            'headers' => ['ID', 'Name', 'Command'],
            'rows' => $rows,
        ]);

        $this->stdout("Teardown/Cleanup Commands\n", Console::FG_GREEN);
        $this->stdout("These commands are run to cleanup the database sync\n");

        $rows = \array_map(
            function (TeardownStep $step) use ($ssh): array {
            return [
                $step->getId(),
                $step->getRelatedId(),
                $step->getName(),
                $step->getCommandString($ssh, true, true)
            ];
        }, $scenario->getTeardownSteps());

        echo Table::widget([
            'headers' => ['ID', 'Related ID', 'Name', 'Command'],
            'rows' => $rows,
        ]);


        return self::EXIT_CODE_NORMAL;
    }

    /** @return int */
    public function actionConfig(string $environment = 'production', string $logLevel = '')
    {
        $craft = SyncDbPlugin::$plugin->craft;
        $l = $this->_parseLogLevel($logLevel);
        [
            'config' => $config,
            'ssh' => $ssh,
            'remoteDb' => $remoteDb,
            'localDb' => $localDb,
        ] = $craft->dumpConfig($environment, $l);

        $common = $config['common'];
        $this->stdout("Common Config\n", Console::FG_GREEN);
        echo Table::widget([
            'headers' => ['remoteWorkingDir', 'localWorkingDir'],
            'rows' => [[$common['remoteWorkingDir'], $common['localWorkingDir']]],
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

    private function _parseLogLevel(string $logLevel = ''): int
    {
        if (!$logLevel) {
            return Logger::INFO;
        }
        $l = strtolower($logLevel);
        if (StringHelper::startsWith($l, 'd')) {
            return Logger::DEBUG;
        } elseif (StringHelper::startsWith($l, 'i')) {
            return Logger::INFO;
        } elseif (StringHelper::startsWith($l, 'n')) {
            return Logger::NOTICE;
        } elseif (StringHelper::startsWith($l, 'w')) {
            return Logger::WARNING;
        } elseif (StringHelper::startsWith($l, 'e')) {
            return Logger::ERROR;
        }
    }
}
