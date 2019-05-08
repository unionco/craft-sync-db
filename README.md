# craft-sync-db plugin for Craft CMS 3.x

Craft 3 plugin to sync database across environments

<img src="resources/img/plugin-logo.svg" height="200px" width="200px"/>

## Requirements

This plugin requires Craft CMS 3.0.0-beta.23 or later.

## Installation

To install the plugin, follow these instructions.

1. Open your terminal and go to your Craft project:

        cd /path/to/project

2. Then tell Composer to load the plugin:

        composer require unionco/craft-sync-db

3. In the Control Panel, go to Settings → Plugins and click the “Install” button for craft-sync-db.

## craft-sync-db Overview

craft-sync-db uses [`unionco/syncdb`](https://github.com/unionco/syncdb) to perform database synchronization across your different environments.

## Configuring craft-sync-db

 Configuration of remote servers is done via config file `<CRAFT_ROOT>/config/syncdb.php`. This file should be copied into your `config/` directory automatically. If it is deleted, you can copy it from `vendor/unionco/craft-sync-db/config/default.php`.

 There are several properties needed for each environment. Given the example config:

```
<?php

return [
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
```

Each environment requires the following properties:

| property | description |
|---|---|
| username | SSH/server username |
| host | SSH/server hostname or IP |
| root | Path of the Craft installation on the server |
| backupDirectory | Path where database backups will be created on the remote server |
| port | SSH port |
| phpPath | Path to `php` executable |
| mysqlDumpPath | Path to `mysqldump` executable |
| verbosity | Log level |
| environment | Determines the environment, e.g. dev, staging, production. Used so that lower environments are never synced into higher environments |

## Using craft-sync-db

NOTE: `craft-sync-db` plugin must be installed on the project on the remote server as well.

As of version v0.5.0, `craft-sync-db` provides a CP user interface.

To use `craft-sync-db` on the command line:
`php craft sync-db/sync <remote_key>`, where `<remote_key>` is an array key in your configuration file.

## craft-sync-db Roadmap

Some things to do, and ideas for potential features:

* Release it

Brought to you by [Abry Rath<abryrath@gmail.com>](github.com/abryrath)
