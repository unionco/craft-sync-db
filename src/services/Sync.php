<?php
/**
 * craft-sync-db plugin for Craft CMS 3.x
 *
 * Craft 3 plugin to sync database across environments
 *
 * @link      github.com/abryrath
 * @copyright Copyright (c) 2018 Abry Rath<abryrath@gmail.com>
 */

namespace abryrath\craftsyncdb\services;

use abryrath\craftsyncdb\Craftsyncdb;
use abryrath\craftsyncdb\util\Util;
use Craft;
use craft\base\Component;

/**
 * @author    Abry Rath<abryrath@gmail.com>
 * @package   Craftsyncdb
 * @since     1.0.0
 */
class Sync extends Component
{
    const BACKUP_DIRECTORY = 'backups/databases/';
    const SQL_DUMP_FILE_NAME = 'db_dump.sql';
    const SQL_DUMP_FILE_TARBALL = 'db_dump.sql.tar.gz';

    public static function mysqlDumpCommand()
    {
        $mysqlDumpPath = Craftsyncdb::$plugin->getSettings()->mysqlDumpPath;
        $cmd = "{$mysqlDumpPath} ";
        if ($dbServer = Util::env('DB_SERVER')) {
            $cmd .= "-h {$dbServer} ";
        }
        if ($dbPort = Util::env('DB_PORT')) {
            $cmd .= "-P {$dbPort} ";
        }
        if ($dbUser = Util::env('DB_USER')) {
            $cmd .= "-u {$dbUser} ";
        }
        if ($dbPassword = Util::env('DB_PASSWORD')) {
            $cmd .= "--password=\"{$dbPassword}\" ";
        }
        if ($dbDatabase = Util::env('DB_DATABASE')) {
            $cmd .= "{$dbDatabase} ";
        }

        if ($dumpPath = static::sqlDumpPath(static::SQL_DUMP_FILE_NAME)) {
            $cmd .= " > {$dumpPath}";
        }

        return $cmd;
    }

    public static function importCommand(): string
    {
        $cmd = "mysql ";
        if ($dbUser = Util::env('DB_USER')) {
            $cmd .= "-u {$dbUser} ";
        }
        if ($dbServer = Util::env('DB_SERVER')) {
            $cmd .= "-h {$dbServer} ";
        }
        if ($dbPort = Util::env('DB_PORT')) {
            $cmd .= "-P {$dbPort} ";
        }
        if ($dbPassword = Util::env('DB_PASSWORD')) {
            $cmd .= "--password=\"{$dbPassword}\" ";
        }
        if ($dbDatabase = Util::env('DB_DATABASE')) {
            $cmd .= "{$dbDatabase} ";
        }

        if ($dumpPath = static::sqlDumpPath(static::SQL_DUMP_FILE_NAME)) {
            $cmd .= " < {$dumpPath}";
        }

        return $cmd;
    }

    public static function tarCommand(): string
    {
        $cmd = '';

        if ($dumpPath = static::sqlDumpPath()) {
            $cmd = "cd {$dumpPath} && tar -czvf ";
            $cmd .= static::SQL_DUMP_FILE_TARBALL;
            $cmd .= " ";
            $cmd .= static::SQL_DUMP_FILE_NAME;
        }

        return $cmd;
    }

    public static function extractCommand(): string
    {
        $cmd = "cd ";
        $cmd .= static::sqlDumpPath();
        $cmd .= " && tar -xzvf ";
        $cmd .= static::SQL_DUMP_FILE_TARBALL;

        return $cmd;
    }

    public static function rmCommand(): string
    {
        $cmd = '';

        if ($dumpPath = static::sqlDumpPath(static::SQL_DUMP_FILE_NAME)) {
            $cmd = "rm {$dumpPath}";
        }

        return $cmd;
    }

    public function dumpMysql()
    {
        $this->checkBackupPath();

        $steps = [
            static::mysqlDumpCommand(),
            static::tarCommand(),
            static::rmCommand(),
        ];

        foreach ($steps as $cmd) {
            static::exec($cmd);
        }
    }

    public function sync($logger, $environment = 'production')
    {
        $settings = Craftsyncdb::$plugin->getSettings();

        if (!$settings->valid()) {
            die();
        }

        $this->checkBackupPath();
        $remote = $settings->environments[$environment];

        $steps = [
            [
                'timing' => 'remote dump',
                'cmd' => $remote->getRemoteDumpCommand(),
            ],
            [
                'timing' => 'remote download',
                'cmd' => $remote->getRemoteDownloadCommand(
                    static::SQL_DUMP_FILE_TARBALL,
                    static::sqlDumpPath(static::SQL_DUMP_FILE_TARBALL)
                ),
            ],
            [
                'cmd' => $remote->getRemoteDeleteCommand(static::SQL_DUMP_FILE_TARBALL),
                'log' => 'Remote file deleted',
            ],
            [
                'cmd' => static::extractCommand(),
                'log' => 'Tarball extracted',
            ],
            [
                'cmd' => static::importCommand(),
                'log' => 'Local dump complete',
            ],
            [
                'cmd' => 'rm ' . $this->sqlDumpPath(static::SQL_DUMP_FILE_NAME),
            ],
            [
                'cmd' => 'rm ' . $this->sqlDumpPath(static::SQL_DUMP_FILE_TARBALL),
            ],
        ];

        foreach ($steps as $step) {
            $cmd = $step['cmd'];
            $timing = $step['timing'] ?? false;
            $log = $step['log'] ?? false;

            $startTime = null;
            $endTime = null;
            if ($timing) {
                $logger->log("Beginning {$timing}");
                $startTime = microtime(true);
            }

            static::exec($cmd);

            if ($timing) {
                $endTime = microtime(true);
                $diffTime = number_format(($endTime - $startTime), 2);
                $logger->log("Task {$timing} completed in {$diffTime} seconds" . PHP_EOL);
            }

            if ($log) {
                $logger->log($log . PHP_EOL);
            }

            sleep(1);
        }

        // $logger->log('Beginning remote dump');
        // $remoteSqlDumpStart = microtime(true);
        // $execRemoteSsh = $remote->getSshCommand();
        // $execRemoteDump = $remote->getRemoteDumpCommand();

        // $result = $this->exec($execRemoteDump);
        // $remoteSqlDumpEnd = microtime(true);

        // $logger->log('Remote dump completed in ' . number_format(($remoteSqlDumpEnd - $remoteSqlDumpStart), 2) . ' seconds');

        // sleep(1);
        // $logger->log('Begging remote download');
        // $downloadStart = microtime(true);
        // $execDownload = $remote->getRemoteDownloadCommand(statiic::SQL_DUMP_FILE_TARBALL);
        // $result = $this->exec($execDownload);
        // $downloadEnd = microtime(true);
        // $logger->log('Remote download completed in ' . number_format(($downloadEnd - $downloadStart), 2) . ' seconds');

        // sleep(1);

        // delete remote file
        // $remoteDeleteCommand =
        // $this->exec($remoteDeleteCommand);
        // $logger->log('Remote File Deleted');

        // $extractCommand = static::extractCommand();
        // static::exec($extractCommand);

        // $importCommand = static::importCommand();
        // static::exec($importCommand);
        // $logger->log('Local Dump Complete');

        // delete sql file
        //static::exec();

        // delete zip file
        //static::exec();

    }
    protected function checkBackupPath()
    {
        $backupPath = $this->sqlDumpPath();
        if (!file_exists($backupPath)) {
            mkdir($backupPath, 0777, true);
        }
    }

    protected static function sqlDumpPath($file = null)
    {
        if ($file) {
            return Util::storagePath(static::BACKUP_DIRECTORY . $file);
        }

        return Util::storagePath(static::BACKUP_DIRECTORY);
    }

    protected static function exec($cmd)
    {
        $silent = false;
        $failOnError = true;

        if ($silent) {
            $cmd = $cmd . " 2>&1";
        }

        echo $cmd . PHP_EOL;
        $output = null;
        $returnVar = null;

        exec($cmd, $output, $returnVar);

        if ($returnVar != 0) {
            var_dump($output);
            var_dump($returnVar);
            throw new \Exception("return non-zero:" . print_r($output, true));
        }
    }
}
