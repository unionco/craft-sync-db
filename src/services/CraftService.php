<?php

namespace unionco\craftsyncdb\services;

use craft\base\Component;
use craft\helpers\App;
use craft\helpers\Json;
use craft\helpers\StringHelper;
use Symfony\Component\Yaml\Exception\ParseException;
use Symfony\Component\Yaml\Yaml;
use unionco\syncdb\Model\Scenario;
use unionco\syncdb\Service\Config;
use unionco\syncdb\SyncDb;
use yii\base\InvalidConfigException;

class CraftService extends Component
{
    private const PHP = 'php';
    private const JSON = 'json';
    private const YAML = 'yaml';

    private static $configTypes = [self::PHP, self::JSON, self::YAML];

    /**
     * Entry point to SyncDb::run
     * @param string $environment
     * @return array
     */
    public function run(string $environment)
    {
        $syncdb = $this->getSyncDb();
        $config = $this->getConfig();
        return $syncdb->run($config, $environment);
    }

    /**
     * Entry point to SyncDb::preview
     * @param string $environment
     * @return Scenario
     */
    public function preview(string $environment): Scenario
    {
        $syncdb = $this->getSyncDb();
        $config = $this->getConfig();
        /** @var \unionco\syncdb\Model\Scenario $scenario */
        $scenario = $syncdb->preview($config, $environment);

        return $scenario;
    }

    /**
     * Entry point to SyncDb::dumpConfig
     * @param string $environment
     * @return array
     */
    public function dumpConfig(string $environment)
    {
        $syncDb = $this->getSyncDb();
        $config = $this->getConfig();
        return $syncDb->dumpConfig($config, $environment);
    }

    /**
     * Get the syncdb class, initialized with the Craft log location
     * @return SyncDb
     */
    private function getSyncDb()
    {
        $syncdb = new SyncDb($this->getLogPath());
        return $syncdb;
    }

    /**
     * Attempt to retrieve, parse, and normalize the config file.
     * Will try .php, .yaml, and then .json, in that order.
     * @return array
     */
    private function getConfig()
    {
        $configPath = $this->getConfigFilePath();
        $config = $this->normalizeConfig($configPath);
        return $config;
    }

    /**
     * Take the config file path and load it into a normalized array
     * @param string $path
     * @throws InvalidConfigException
     * @return array
     */
    private function normalizeConfig($path)
    {
        if (StringHelper::endsWithAny($path, ['.php'])) {
            return require $path;
        } elseif (StringHelper::endsWithAny($path, ['.yaml'])) {
            if (!\class_exists('Yaml')) {
                throw new InvalidConfigException('Your configuration uses YAML, but the Symfony YAML component is not installed.');
            }
            try {
                $yaml = Yaml::parseFile($path);
            } catch (ParseException $e) {
                throw $e;
            }
            return $yaml;
        } elseif (StringHelper::endsWithAny($path, ['.json'])) {
            $contents = \file_get_contents($path);
            return Json::decodeIfJson($contents, true);
        }
        throw new InvalidConfigException('Config does not use PHP, YAML, or JSON');
    }

    /**
     * Return the config file path (given its type)
     * @param self::PHP|self::YAML|self::JSON|null $type
     * @return string
     */
    public function getConfigFilePath($type = null): string
    {
        /** @var string */
        $pathPrefix = \Craft::$app->getPath()->getConfigPath();
        if ($type) {
            return $pathPrefix . '/syncdb.' . $type;
        }

        $config = null;
        foreach (self::$configTypes as $t) {
            $file = $pathPrefix . '/syncdb.' . $t;
            if (\file_exists($file)) {
                $config = $file;
                break;
            }
        }
        if (!$config) {
            $config = $this->writeDefaultConfig(self::PHP);
        }
        return $config;
    }

    /** @param self::PHP|self::JSON|self::YAML $type */
    private function writeDefaultConfig($type)
    {
        /** @var array */
        $defaultConfig = Config::getDefaultConfig([
            'driver' => App::env('DB_DRIVER'),
            'basePath' => CRAFT_BASE_PATH,
        ]);

        switch ($type) {
            case self::PHP:
                $basePath = CRAFT_BASE_PATH;
                $driver = App::env('DB_DRIVER');
                $output = <<<EOF
<?php

return [
    'common' => [
        'remoteWorkingDir' => '/var/www/',
        'localWorkingDir' => '{$basePath}',
        'ignoreTables' => [
            "craft_templatecaches",
            "craft_templatecachequeries",
            "craft_templatecacheelements",
            "craft_sessions",
            "craft_cache"
        ],
        'driver' => '{$driver}',
        'port' => 22,
    ],
    'local' => [
    ],
    'production' => [
        'user' => '',
        'host' => '',
        'identity' => '',
    ],
    'staging' => [
        'user' => '',
        'host' => '',
        'identity' => '',
    ],
];
EOF;
                try {
                    $path = $this->getConfigFilePath($type);
                    \file_put_contents($path, $output);
                } catch (\Throwable $e) {
                    throw $e;
                }
                return $path;
                break;
            case self::YAML:
                $yaml = Yaml::dump($defaultConfig);
                try {
                    $path = $this->getConfigFilePath(self::YAML);
                    \file_put_contents($path, $yaml);
                } catch (\Throwable $e) {
                    throw $e;
                }
                break;
            case self::JSON:
                $json = Json::encode($defaultConfig);
                try {
                    $path = $this->getConfigFilePath(self::JSON);
                    \file_put_contents($path, $json);
                } catch (\Throwable $e) {
                    throw $e;
                }
                break;
            default:
                throw new InvalidConfigException('Not implemented');
        }
    }

    /**
     * Return the path, file included, for a text log. Create it if it
     * does not exist yet. <craft>/storage/logs/syncdb.log
     * @return string
     */
    private function getLogPath(): string
    {
        $path = \Craft::$app->getPath()->getLogPath() . '/syncdb.log';
        if (!\file_exists($path)) {
            \touch($path);
        }
        return $path;
    }

}
