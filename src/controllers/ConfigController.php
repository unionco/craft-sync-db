<?php

namespace unionco\craftsyncdb\controllers;

use Craft;
use craft\helpers\Json;
use craft\web\Controller;
use Symfony\Component\Yaml\Yaml;
use unionco\craftsyncdb\SyncDbPlugin;

class ConfigController extends Controller
{
    protected $allowAnonymous = true;

    public function actionSave()
    {
        $newConfig = Json::decode(Craft::$app->getRequest()->getBodyParam('config'), true);
        $environments = SyncDbPlugin::getInstance()->syncDb->getSettings()->environments;
        if (!key_exists($newConfig['name'], $environments)) {
            return $this->asJson([
                'success' => false,
                'message' => 'Unknown environment: ' . $newConfig['name'],
            ]);
        }
        
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
