<?php

namespace unionco\craftsyncdb\controllers;

use Craft;
use craft\helpers\Json;
use craft\web\Controller;
use Symfony\Component\Yaml\Yaml;
use unionco\craftsyncdb\SyncDbPlugin;

class ConfigController extends Controller
{
    // protected $allowAnonymous = true;

    public function actionSave()
    {
        $newConfig = Craft::$app->getRequest()->getBodyParam('settings');
        SyncDbPlugin::getInstance()->cp->writeSettings($newConfig);
        return $this->asJson([
            'success' => true
        ]);
    }

    public function actionYaml()
    {
        $config = SyncDbPlugin::getInstance()->settings;
        // var_dump($config);
        die;
    }
}
