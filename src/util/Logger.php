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

    public function log(string $text, string $level = 'normal'): void
    {
        $this->console->stdout($text, $this->levels[$level]);
        $this->console->stdout(PHP_EOL);
    }

    public function logCmd(string $text): void
    {
        $text = preg_replace('/\-\-password=\"(.*)\"/', '--password="*****"', $text);
        $this->console->stdout('$ ' . $text, $this->levels['normal']);
    }

    public function logOutput(array $output): void
    {
        $this->log('[Output]', 'info');
        if (!count($output)) {
            return;
        }
        foreach ($output as $line) {
            $this->log($line, 'info');
        }
    }
}
