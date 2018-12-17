<?php
/**
 * craft-sync-db plugin for Craft CMS 3.x
 *
 * Craft 3 plugin to sync database across environments
 *
 * @link      github.com/abryrath
 * @copyright Copyright (c) 2018 Abry Rath<abryrath@gmail.com>
 */

namespace abryrath\craftsyncdb\models;

use abryrath\craftsyncdb\Craftsyncdb;
use abryrath\craftsyncdb\util\Util;
use Craft;
use craft\base\Model;
use Exception;

/**
 * @author    Abry Rath<abryrath@gmail.com>
 * @package   Craftsyncdb
 * @since     1.0.0
 */
class Settings extends Model
{
    //public $remotes;
    public $environments;
    public $mysqlDumpPath;

    public function init()
    {
        $this->environments = [];
        $this->parseConfigFile();
        $this->mysqlDumpPath = $this->getMysqlDumpPath();
    }

    private function parseConfigFile()
    {
        $config = [];

        if (file_exists(CRAFT_BASE_PATH . '/config/syncdb.php')) {
            $config = require CRAFT_BASE_PATH . '/config/syncdb.php';
        }

        foreach ($config['remotes'] as $name => $values) {
            $env = new Environment();
            $env->name = $name;
            $env->readConfig($values);

            $this->environments[$name] = $env;
        }
    }

    private function getMysqlDumpPath()
    {
        // Check for explicit path in .env
        $path = Util::env('MYSQL_DUMP_PATH');

        if ($path && Util::checkExecutable($path)) {
            return $path;
        }

        // Check some common locations
        foreach (['/usr/bin/mysqldump', '/usr/local/bin/mysqldump'] as $path) {
            if (Util::checkExecutable($path)) {
                return $path;
            }
        }

        return false;
    }

    public function valid(): bool
    {
        if (!$this->environments || !count($this->environments)) {
            throw new Exception('No environments are configured');
        }

        foreach ($this->environments as $env) {
            if (!$env->valid()) {
                throw new Exception($env->getError());
            }
        }

        if (!$this->getMysqlDumpPath()) {
            throw new Exception('Could not find a valid mysqldump executable. Please check your configuration.');
        }

        return true;
    }
}
