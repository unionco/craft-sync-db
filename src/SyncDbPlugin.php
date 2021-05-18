<?php

/**
 * craft-sync-db plugin for Craft CMS 3.x
 *
 * Craft 3 plugin to sync database across environments
 *
 * @link      github.com/unionco
 * @copyright Copyright (c) 2018 Abry Rath<unionco@gmail.com>
 */

namespace unionco\craftsyncdb;

use Craft;
use craft\web\View;
use yii\base\Event;
use craft\base\Plugin;
use craft\web\UrlManager;
use unionco\syncdb\SyncDb;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\i18n\PhpMessageSource;
use craft\web\twig\variables\Cp;
use Symfony\Component\Yaml\Yaml;
use unionco\craftsyncdb\SyncDbPlugin;
use craft\events\RegisterUrlRulesEvent;
use unionco\craftsyncdb\models\Settings;
use craft\events\RegisterCpNavItemsEvent;
use unionco\craftsyncdb\services\CpService;
use craft\events\RegisterTemplateRootsEvent;
use unionco\craftsyncdb\services\CraftService;
use craft\console\Application as ConsoleApplication;
use unionco\craftsyncdb\services\Sync as SyncService;
use unionco\craftsyncdb\twigextensions\SyncDbTwigExtension;

/**
 * Class Craftsyncdb
 *
 * @author    Abry Rath<unionco@gmail.com>
 * @package   Craftsyncdb
 * @since     1.0.0
 *
 * @property  SyncService $sync
 */
class SyncDbPlugin extends Plugin
{
    /** Constants */
    const CONSOLE_PREFIX = 'sync-db/sync';

    /** @var SyncDbPlugin */
    public static $plugin;

    /** @var \unionco\syncdb\SyncDb|null **/
    public $syncDb;

    /** @var string */
    public $schemaVersion = '1.2.0';

    /** @var bool */
    public $hasCpSettings = false;

    /**
     * @param string $id
     * @param null|\yii\base\Module $parent
     * @param array $config
     */
    public function __construct($id, $parent = null, array $config = [])
    {
        $this->id = $id;

        /** @psalm-suppress UndefinedClass */
        Craft::setAlias('@plugins/sync-db', $this->getBasePath());

        // Translation category
        /** @psalm-suppress UndefinedClass */
        $i18n = Craft::$app->getI18n();
        /** @noinspection UnSafeIsSetOverArrayInspection */
        if (!isset($i18n->translations[$id]) && !isset($i18n->translations[$id . '*'])) {
            $i18n->translations[$id] = [
                'class' => PhpMessageSource::class,
                'sourceLanguage' => 'en-US',
                'basePath' => '@plugins/sync-db/translations',
                'forceTranslation' => true,
                'allowOverrides' => true,
            ];
        }

        Event::on(
            View::class,
            View::EVENT_REGISTER_CP_TEMPLATE_ROOTS,
            function (RegisterTemplateRootsEvent $event) {
                $event->roots['sync-db'] = $this->getBasePath() . '/templates';
            }
        );

        parent::__construct($id, $parent, $config);
    }

    /**
     * @return void
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;

        $this->setComponents([
            'craft' => CraftService::class,
        ]);

        if (Craft::$app instanceof ConsoleApplication) {
            $this->controllerNamespace = 'unionco\craftsyncdb\console\controllers';
        }

        Event::on(
            Cp::class,
            Cp::EVENT_REGISTER_CP_NAV_ITEMS,
            function (RegisterCpNavItemsEvent $event) {
                $event->navItems[] = [
                    'url' => 'sync-db',
                    'label' => 'Sync Database',
                    'icon' => '@plugins/sync-db/icon-mask.svg',
                ];
            }
        );

        /** @psalm-suppress UndefinedClass */
        Craft::info(
            /** @psalm-suppress UndefinedClass */
            Craft::t(
                'sync-db',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    public static function getInstance(): SyncDbPlugin
    {
        return self::$plugin;
    }
}
