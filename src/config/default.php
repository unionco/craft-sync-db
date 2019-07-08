<?php

use Symfony\Component\Console\Output\Output;
use unionco\craftsyncdb\services\CpService;

/**
 *  This is the default configuration that will be copied into your Craft
 *  config path, if it does not exist. Any changes to this file will be
 *  overwritten
 **/

 return [
    'globals' => [
        // Array of tables to ignore in dump
        'ignoredTables' => [],
    ],
    'remotes' => [
        'production' => [
            'username' => 'user',
            'host' => 'example.com',
            'root' => '/path/to/project/',
            'backupDirectory' => '/path/to/project/storage/backups/databases/',
            'port' => 22,
            'phpPath' => '/usr/local/bin/php',
            'mysqlDumpPath' => '/usr/bin/mysqldump',
            // See Symfony\Component\Console\Output\Output for verbosity options
            'verbosity' => Output::VERBOSITY_DEBUG,
            'environment' => CpService::ENV_PRODUCTION,
        ],
        // 'staging' => [
        //     'username' => 'user',
        //     'host' => 'staging.example.com',
        //     'root' => '/path/to/project/',
        //     'backupDirectory' => '/path/to/project/storage/backups/databases/',
        //     'port' => 22,
        //     'phpPath' => '/usr/local/bin/php',
        //     'mysqlDumpPath' => '/usr/bin/mysqldump',
        //     'verbosity' => Output::VERBOSITY_DEBUG,
        //     'environment' => CpService::ENV_STAGING,
        // ],
    ],
];
