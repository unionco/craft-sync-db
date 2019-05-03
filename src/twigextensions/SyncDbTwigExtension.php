<?php

namespace unionco\craftsyncdb\twigextensions;

use Craft;
use Twig\Extension\AbstractExtension;
use unionco\craftsyncdb\SyncDbPlugin;

class SyncDbTwigExtension extends AbstractExtension
{
    public function __construct()
    {
        $env = Craft::$app->getView()->getTwig();
        $env->addGlobal('syncdb', SyncDbPlugin::getInstance());
    }

    public function getFilters()
    {
        return [];
    }

    public function getFunctions()
    {
        return [];
    }
}
