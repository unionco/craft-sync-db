<?php
namespace unionco\craftsyncdb\controllers;

use Craft;
use Monolog\Logger;
use craft\helpers\Json;
use craft\web\Controller;
use unionco\syncdb\SyncDb;
use Monolog\Handler\StreamHandler;
use unionco\craftsyncdb\SyncDbPlugin;

class SyncController extends Controller
{
    protected $allowAnonymous = ['status']; //true;

    /** @var SyncDb $syncDb */
    public static $syncDb;

    public function actionStatus()
    {
        $this->requirePostRequest();

        //var_dump(Craft::$app->getRequest()); die;
        $logFile = Craft::$app->getRequest()->getRequiredBodyParam('logFile');
        $env = Craft::$app->getRequest()->getRequiredBodyParam('env');
        // $jsonBody = Craft::$app->getRequest()->getRawBody();
        // $body = Json::decode($jsonBody, false);
        if (!self::$syncDb) {
            self::$syncDb = SyncDbPlugin::getInstance()->syncDb;
        }

        $filePath = Craft::$app->getPath()->getStoragePath() . '/syncdb-' . $logFile;
        $logger = new Logger('sync');
        $logger->pushHandler(new StreamHandler($filePath, Logger::INFO));

        $errors = null;
        $success = null;
        $complete = null;
        $logOutput = null;

        if (!self::$syncDb->running() && !self::$syncDb->success()) {
            // Not started yet
            self::$syncDb->sync($logger, $env);
            $complete = false;
        } elseif (self::$syncDb->success()) {
            $complete = true;
            $success = true;
            // Finished with success
        } elseif (self::$syncDb->running()) {
            $complete = false;
            // Still running
        } else {
            $errors = true;
            $complete = true;
            $success = false;
            // Finished with error
        }
        $logOutput = \file_get_contents($filePath);
        return Json::encode(compact('errors', 'success', 'complete', 'logOutput'));
    }
}