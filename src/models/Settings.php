<?php

namespace unionco\craftsyncdb\models;

use craft\base\Model;
use Symfony\Component\Yaml\Yaml;

class Settings extends Model
{
    /** @var string[] Tables to skip during sync */
    public $skipTables;

    /** @var array[] Configuration for remote environments*/
    public $environments;

    public function hydrate(string $yamlFilePath): void
    {
        if (!$yamlFilePath) {
            return;
        }
        $data = Yaml::parseFile($yamlFilePath);
        $this->skipTables = $data['skipTables'];
        $this->environments = $data['environments'];
    }

    public function getEnvironments(): array
    {
        return $this->environments;
    }
}
