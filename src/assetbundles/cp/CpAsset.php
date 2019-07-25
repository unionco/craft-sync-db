<?php

namespace unionco\craftsyncdb\assetbundles\cp;

use craft\web\AssetBundle;
use craft\web\assets\vue\VueAsset;
use unionco\craftsyncdb\SyncDbPlugin;
use craft\web\assets\cp\CpAsset as DefaultCpAsset;

class CpAsset extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = SyncDbPlugin::getInstance()->getBasePath() . '/assetbundles/cp/dist/';
        $this->depends = [
            DefaultCpAsset::class,
            VueAsset::class,
        ];

        if (getenv('SYNCDB_ENABLE_DEV') === 'true') {
            $this->js = ['http://localhost:8080/app.js'];
            parent::init();
            return;
        }
        $this->css = ['css/app.css'];
        $this->js = ['js/app.js', 'js/chunk-vendors.js'];
        parent::init();
    }
}