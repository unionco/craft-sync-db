<?php
namespace unionco\craftsyncdb\controllers;

use Craft;
use Monolog\Logger;
use craft\helpers\Json;
use craft\web\Controller;
use unionco\syncdb\SyncDb;
use Monolog\Handler\StreamHandler;
use unionco\craftsyncdb\SyncDbPlugin;
use Highlight\Highlighter;

class SyncController extends Controller
{
    protected $allowAnonymous = ['init', 'status']; //true;

    /** @var SyncDb $syncDb */
    public static $syncDb;

    public function actionInit()
    {
        $this->requirePostRequest();

        //var_dump(Craft::$app->getRequest()); die;
        //$logFile = Craft::$app->getRequest()->getRequiredBodyParam('logFile');
        $logFile = Craft::$app->getRequest()->getBodyParam('logFile');
        //$env = Craft::$app->getRequest()->getRequiredBodyParam('env');
        $env = Craft::$app->getRequest()->getBodyParam('env');
        // $jsonBody = Craft::$app->getRequest()->getRawBody();
        // $body = Json::decode($jsonBody, false);
        if (!self::$syncDb) {
            self::$syncDb = SyncDbPlugin::getInstance()->syncDb;
        }

        // if (!self::$syncDb->running() && !self::$syncDb->)
        $filePath = Craft::$app->getPath()->getStoragePath() . '/syncdb-' . $logFile;
        // $logger = new Logger('sync');
        // $logger->pushHandler(new StreamHandler($filePath, Logger::INFO));

        $errors = null;
        $success = null;
        $complete = null;
        $logOutput = null;

        if (!self::$syncDb->running() && !self::$syncDb->success()) {
            // Not started yet
            //$cmd  = 'php ' . CRAFT_BASE_PATH . '/craft sync-db/sync/background ' . $filePath . ' ' . $env . ' > /dev/null &';
            //echo $cmd; die;
            //exec($cmd);


            // $filePath = Craft::$app->getPath()->getStoragePath() . '/syncdb-' . $logFile;
            $logger = new Logger('sync');
            $logger->pushHandler(new StreamHandler($filePath, Logger::INFO));
            $syncDb = SyncDbPlugin::getInstance()->syncDb;
            $syncDb->sync($logger, $env);
        }
        //return Json::encode(['success' => true]);

        // Testing out highlight.php
        $highlighter = new Highlighter();
        $logOutput = file_get_contents($filePath);

        $highlightResult = $highlighter->highlight('accesslog', $logOutput);
        $output = '<pre><code class="hljs '. $highlightResult->language . '">';
        $output .= $highlightResult->value;
        $output .= '</code></pre>';
        return $this->renderTemplate('sync-db/index', [
            'output' => $output,
        ]);
    }

    public function actionStatus()
    {
        // return Json::encode(['hello' => 'world']);
        $this->requirePostRequest();

        //var_dump(Craft::$app->getRequest()); die;
        $logFile = Craft::$app->getRequest()->getRequiredBodyParam('logFile');
        $env = Craft::$app->getRequest()->getRequiredBodyParam('env');
        // $jsonBody = Craft::$app->getRequest()->getRawBody();
        // $body = Json::decode($jsonBody, false);
        if (!self::$syncDb) {
            self::$syncDb = SyncDbPlugin::getInstance()->syncDb;
        }

        // if (!self::$syncDb->running() && !self::$syncDb->)
        $filePath = Craft::$app->getPath()->getStoragePath() . '/syncdb-' . $logFile;
        $logger = new Logger('sync');
        $logger->pushHandler(new StreamHandler($filePath, Logger::INFO));

        $errors = null;
        $success = null;
        $complete = null;
        $logOutput = null;

        if (self::$syncDb->success()) {
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
        $logOutput = \nl2br(\file_get_contents($filePath));
        return Json::encode(compact('errors', 'success', 'complete', 'logOutput'));
    }
}