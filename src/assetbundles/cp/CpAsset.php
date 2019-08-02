<?php

namespace unionco\craftsyncdb\assetbundles\cp;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset as DefaultCpAsset;
use craft\web\assets\vue\VueAsset;
use unionco\craftsyncdb\SyncDbPlugin;

class CpAsset extends AssetBundle
{
    public function init()
    {
        $dev = getenv('SYNCDB_ENABLE_DEV') === 'true';

        $this->sourcePath = SyncDbPlugin::getInstance()->getBasePath() . '/assetbundles/cp/dist/';
        $this->depends = [
            DefaultCpAsset::class,
        ];

        if ($dev) {
            $this->js = [
                'https://vuejs.org/js/vue.js',
                'http://localhost:8080/app.js',
            ];
        } else {
            $this->depends[] = VueAsset::class;
            $this->css = ['css/app.css'];
            $this->js = ['js/app.js', 'js/chunk-vendors.js'];
        }
        parent::init();
    }
}
