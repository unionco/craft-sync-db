<?php

namespace unionco\craftsyncdb\assetbundles\cp;

use craft\web\AssetBundle;
use unionco\craftsyncdb\SyncDbPlugin;

class CpAsset extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = SyncDbPlugin::getInstance()->getBasePath() . '/assetbundles/cp/dist/';

        $this->js = [
            'js/vendor.main.js',
            'js/main.js',
        ];

        $this->css = [
            'css/main.css',
        ];
        
        parent::init();
    }
}
