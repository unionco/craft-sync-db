<?php

namespace unionco\craftsyncdb\jobs;

use Monolog\Logger;
use craft\queue\BaseJob;
use Monolog\Handler\StreamHandler;
use unionco\craftsyncdb\SyncDbPlugin;

class SyncDbJob extends BaseJob
{
    public $filePath;
    public $env;

    public function execute($queue)
    {
        $logger = new Logger('sync');
        $logger->pushHandler(new StreamHandler($this->filePath, Logger::INFO));
        $syncDb = SyncDbPlugin::getInstance()->syncDb;
        $syncDb->sync($logger, $this->env);
        $logger->info('Craft SyncDB Complete');
    }

    /**
     * @return string
     */
    protected function defaultDescription()
    {
        return 'SyncDB';
    }
}
