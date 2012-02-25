<?php

// if you don't want to setup permissions the proper way, just uncomment the following PHP line
// read http://symfony.com/doc/current/book/installation.html#configuration-and-setup for more information
//umask(0000);

// this check prevents access to debug front controllers that are deployed by accident to production servers.
// feel free to remove this, extend it, or make something more sophisticated.
if (!in_array(@$_SERVER['REMOTE_ADDR'], array(
    '127.0.0.1',
    '::1',
))) {
    header('HTTP/1.0 403 Forbidden');
    exit('You are not allowed to access this file. Check '.basename(__FILE__).' for more information.');
}


const CLASS_CACHING = true;

if (false == CLASS_CACHING) {
    require_once __DIR__.'/../app/bootstrap.php.cache';
    $kernel->loadClassCache();
} else {
    require_once __DIR__.'/../vendor/symfony/src/Symfony/Component/ClassLoader/UniversalClassLoader.php';
    require_once __DIR__.'/../app/autoload.php';
}

use Symfony\Component\HttpFoundation\Request;

require_once __DIR__.'/../app/AppKernel.php';

$kernel = new AppKernel('dev', true);


$kernel->handle(Request::createFromGlobals())->send();


