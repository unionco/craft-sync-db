<?php
namespace unionco\craftsyncdb\controllers;

use Craft;
use Monolog\Logger;
use craft\helpers\Json;
use craft\web\Controller;
use Highlight\Highlighter;
use unionco\syncdb\SyncDb;
use Monolog\Handler\StreamHandler;
use unionco\craftsyncdb\SyncDbPlugin;
use unionco\craftsyncdb\jobs\SyncDbJob;

class SyncController extends Controller
{
    protected $allowAnonymous = ['init', 'status']; //true;

    /** @var SyncDb $syncDb */
    public static $syncDb;

    /** @var null|string $filePath */
    protected static $filePath = null;

    /** @var bool $complete */
    protected static $complete = false;

    const RESULT_FINISHED = 0;
    const RESULT_NOT_RUNNING = 1;
    const RESULT_RUNNING = 2;

    private static function logPath(string $fileName): string
    {
        return Craft::$app->getPath()->getStoragePath() . '/syncdb-' . $fileName;
    }

    public function actionInit()
    {
        $this->requirePostRequest();
        static::$complete = false;
        $logFile = Craft::$app->getRequest()->getBodyParam('logFile');
        $env = Craft::$app->getRequest()->getBodyParam('env');
        if (!self::$syncDb) {
            self::$syncDb = SyncDbPlugin::getInstance()->syncDb;
        }

        static::$filePath = static::logPath($logFile);

        if (!self::$syncDb->running() && !self::$syncDb->success()) {
            $job = new SyncDbJob();
            $job->env = $env;
            $job->filePath = static::$filePath;

            Craft::$app->getQueue()->push($job);
            Craft::$app->getQueue()->run();
        }
        $output = file_get_contents(static::$filePath);
        return $this->asJson([
            'result' => self::RESULT_FINISHED,
            'output' => $output,
            'debugFilePath' => static::$filePath,
        ]);
    }

    public function actionStatus()
    {
        $this->requirePostRequest();
        $logFile = Craft::$app->getRequest()->getBodyParam('logFile');
        static::$filePath = static::logPath($logFile);

        if (!static::$filePath) {
            return $this->asJson([
                'result' => self::RESULT_NOT_RUNNING,
                'debugFilePath' => static::$filePath,
            ]);
        }
        $logContents = '';
        try {
            $logContents = file_get_contents(static::$filePath);
        } catch (\Exception $e) {
            return $this->asJson([
                'result' => self::RESULT_RUNNING,
                'output' => $logContents,
            ]);
        }

        if (strpos($logContents, 'Craft SyncDB Complete') !== false) {
            return $this->asJson([
                'result' => self::RESULT_FINISHED,
                'output' => $logContents,
            ]);
        }

        return $this->asJson([
            'result' => self::RESULT_RUNNING,
            'output' => $logContents,
        ]);
    }
}
