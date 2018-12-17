<?php

namespace abryrath\craftsyncdb\util;

use Craft;

class Util
{
    public static function storagePath($path = null)
    {
        static $craftStoragePath;

        if ($craftStoragePath === null) {
            $craftStoragePath = Craft::$app->path->getStoragePath();
        }

        if ($path) {
            return $craftStoragePath . '/' . trim($path, '/');
        }

        return $craftStoragePath . '/';
    }

    public static function env($key, $default = null)
    {
        // first try normal env
        $value = getenv($key);

        // if normal env is false, try site specific env
        if ($value === false) {
            return $default;
        }

        switch (strtolower($value)) {
            case 'true':
            case '(true)':
                return true;

            case 'false':
            case '(false)':
                return false;

            case 'empty':
            case '(empty)':
                return '';

            case 'null':
            case '(null)':
                return;
        }

        // if (strlen($value) > 1 && StringHelper::startsWith($value, '"') && StringHelper::endsWith($value, '"')) {
        //     return substr($value, 1, -1);
        // }

        return $value;
    }

    public static function checkExecutable(string $path): bool
    {
        $cmd = "which {$path}";
        $output = null;
        $returnVar = null;

        exec($cmd, $output, $returnVar);

        if ($returnVar != 0) {
            return false;
        }

        return true;
    }
}
