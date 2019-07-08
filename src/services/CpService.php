<?php

namespace unionco\craftsyncdb\services;

use Craft;
use craft\base\Component;
use unionco\craftsyncdb\SyncDbPlugin;

class CpService extends Component
{
    public static $config;
    
    const ENV_PRODUCTION = 'production';
    const ENV_STAGING = 'staging';
    const ENV_DEV = 'dev';

    public static $environmentHierarchy = [
        self::ENV_PRODUCTION => 3,
        self::ENV_STAGING => 2,
        self::ENV_DEV => 1,
    ];

    public function init()
    {
        if (!self::$config) {
            self::$config = SyncDbPlugin::getInstance()->syncDb->getSettings();
        }
    }

    public function sourceOptions(): array
    {
        $currentEnv = self::parseEnv(CRAFT_ENVIRONMENT);
        $availableEnvs = self::$config->environments;

        $filteredEnvs = array_filter(
            $availableEnvs,
            /**
             * @param array $env,
             * @return bool
             */
            function ($env) use ($currentEnv) {
                return self::$environmentHierarchy[$env->environment] >= self::$environmentHierarchy[$currentEnv];
            }
        );

        $options = [];
        foreach ($filteredEnvs as $key => $env) {
            $options[] = [
                'label' => $env->host . ' (' . $key . ')',
                'value' => $key,
            ];
        }

        return $options;
    }

    public static function parseEnv($env): string
    {
        if (strpos(self::ENV_PRODUCTION, $env) !== false) {
            return self::ENV_PRODUCTION;
        } elseif (strpos(self::ENV_STAGING, $env) !== false) {
            return self::ENV_STAGING;
        } else {
            return self::ENV_DEV;
        }
    }
}
