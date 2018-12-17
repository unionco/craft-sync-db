<?php
/**
 * craft-sync-db plugin for Craft CMS 3.x
 *
 * Craft 3 plugin to sync database across environments
 *
 * @link      github.com/abryrath
 * @copyright Copyright (c) 2018 Abry Rath<abryrath@gmail.com>
 */

namespace abryrath\craftsyncdb\assetbundles\Craftsyncdb;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

/**
 * @author    Abry Rath<abryrath@gmail.com>
 * @package   Craftsyncdb
 * @since     1.0.0
 */
class CraftsyncdbAsset extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = "@abryrath/craftsyncdb/assetbundles/craftsyncdb/dist";

        $this->depends = [
            CpAsset::class,
        ];

        $this->js = [
            'js/Craftsyncdb.js',
        ];

        $this->css = [
            'css/Craftsyncdb.css',
        ];

        parent::init();
    }
}
