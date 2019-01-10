<?php

namespace abryrath\craftsyncdb\util;

use abryrath\syncdb\util\Logger as LoggerInterface;
use yii\helpers\Console;

class Logger implements LoggerInterface
{
    protected $console;
    protected $levels = [
        'info' => CONSOLE::FG_GREEN,
        'error' => CONSOLE::FG_RED,
        'normal' => CONSOLE::FG_YELLOW,
    ];

    public function __construct($console)
    {
        $this->console = $console;
    }

    public function log($text, $level = 'normal') : void
    {
        $this->console->stdout($text, $this->levels[$level]);
        $this->console->stdout(PHP_EOL);
    }

    public function logCmd($text): void
    {
        $this->console->stdout('$ ' . $text, $this->levels['normal']);
    }

    public function logOutput($text): void
    {
        if (is_array($text)) {
            if (!count($text)) {
                return;
            }
            foreach ($text as $line) {
                $this->console->stdout($line, $this->levels['info']);
            }
            return;
        }
        $this->console->stdout($text, $this->levels['info']);
    }
}
