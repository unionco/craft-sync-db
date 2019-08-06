<?php

namespace unionco\craftsyncdb\migrations;

use Craft;
use craft\db\Migration;
use unionco\craftsyncdb\SyncDbPlugin;

/**
 * m190805_192551_yaml_config_file migration.
 */
class m190805_192551_yaml_config_file extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        // Place migration code here...
        if (SyncDbPlugin::getInstance()->cp->convertConfigFile()) {
            echo "Configuration file converted successfully. New file: config/syncdb.yaml\n";
            echo "You can remove the old PHP-based configuration file (config/syncdb.php\n";
        }
    }

    /**
     * @inheritdoc
     */
    public function safeDown()
    {
        echo "m190805_192551_yaml_config_file cannot be reverted.\n";
        return false;
    }
}
