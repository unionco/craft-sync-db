<?php

namespace unionco\craftsyncdb\services;

use craft\helpers\App;
use craft\base\Component;
use unionco\syncdb\SyncDb;
use craft\helpers\FileHelper;
use craft\helpers\StringHelper;
use unionco\syncdb\Service\Config;
use yii\base\InvalidConfigException;

class CraftService extends Component
{
    private const PHP = 'php';
    private const JSON = 'json';
    private const YAML = 'yaml';
    private static $configTypes = [self::PHP, self::JSON, self::YAML];

    public function run(string $environment)
    {
        $syncdb = new SyncDb();
        $configPath = $this->getConfigFilePath();
        $config = $this->normalizeConfig($configPath);
        return $syncdb->run($config, $environment);
    }

    public function dumpConfig(string $environment)
    {
        $syncDb = new SyncDb();
        $configPath = $this->getConfigFilePath();
        $config = $this->normalizeConfig($configPath);
        return $syncDb->dumpConfig($config, $environment);
    }

    private function normalizeConfig($path)
    {
        if (StringHelper::endsWithAny($path, ['.php'])) {
            return require $path;
        }
        return [];
    }

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

        // if (\file_exists($pathPrefix . $yaml)) {
        //     //
        // }

        // $json = './syncdb.json';
        // if (\file_exists($pathPrefix . $json)) {

        // }

        // $php = './syncdb.php';
        // if (\file_exists($pathPrefix . $php))
    }

    /** @param self::PHP|self::JSON|self::YAML $type */
    private function writeDefaultConfig($type)
    {

        $defaultConfig = [
            'common' => [
                'remoteWorkingDir' => '/var/www/',
                'localWorkingDir' => CRAFT_BASE_PATH,
                'ignoreTables' => [
                    "craft_templatecaches",
                    "craft_templatecachequeries",
                    "craft_templatecacheelements",
                    "craft_sessions",
                    "craft_cache"
                ],
                'driver' => App::env('DB_DRIVER'),
                'port' => 22,
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
            ]
        ];

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
        'driver' => {$driver},
        'port' => 22,
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
            default:
                throw new InvalidConfigException('Not implemented');
        }
    }


}
