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
use unionco\syncdb\SyncDb;
use yii\console\Controller;
use Monolog\Handler\StreamHandler;
use unionco\craftsyncdb\SyncDbPlugin;
use Symfony\Component\Console\Output\Output;

/**
 * Sync Command
 *
 * @author    Abry Rath<unionco@gmail.com>
 * @package   SyncDb
 * @since     1.0.0
 */
class SyncController extends Controller
{
    private function verbosity(string $verbosity): ?int
    {
        $verbosityLevel = null;
        if ($verbosity) {
            $input = trim($verbosity);
            switch ($input) {
                case 'quiet':
                    $verbosityLevel = Output::VERBOSITY_QUIET;
                    break;
                case 'normal':
                    $verbosityLevel = Output::VERBOSITY_NORMAL;
                    break;
                case 'verbose':
                    $verbosityLevel = Output::VERBOSITY_VERBOSE;
                    break;
            }
        }

        return $verbosityLevel;
    }

    /** 
     * @param string $environment
     * @return int */
    public function actionIndex($environment = 'production', string $verbosity = 'normal')
    {
        $verbosityLevel = $this->verbosity($verbosity);

        /** @var SyncDb */
        $syncDb = SyncDbPlugin::$plugin->syncDb;
        
        $syncDb->sync(null, $environment, false, $verbosityLevel);

        return self::EXIT_CODE_NORMAL;
    }

    /** @return int */
    public function actionDump(string $verbosity = 'normal', bool $remote = false)
    {
        $verbosityLevel = $this->verbosity($verbosity);
        
        /** @var \unionco\syncdb\SyncDbPlugin */
        $syncDb = SyncDbPlugin::$plugin->syncDb;
        
        $syncDb->dump(null, $verbosityLevel, $remote);

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
