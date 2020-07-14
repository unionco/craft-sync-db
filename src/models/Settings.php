<?php

namespace unionco\craftsyncdb\models;

use craft\base\Model;
use craft\helpers\FileHelper;
use Symfony\Component\Yaml\Yaml;
use unionco\craftsyncdb\SyncDbPlugin;

class Settings extends Model
{
    /** @var string[] Tables to skip during sync */
    public $skipTables = [];

    /** @var array[] Configuration for remote environments*/
    public $environments = [];

    public function hydrate(string $yamlFilePath): void
    {
        $data = Yaml::parse(file_get_contents($yamlFilePath));
        $this->skipTables = $data['skipTables'] ?? [];
        $this->environments = $data['environments'] ?? [];
    }

    /**
     * Getter for environments
     * @return array[]
     */
    public function getEnvironments()
    {
        return $this->environments;
    }
}
