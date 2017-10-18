<?php
	
	set_time_limit(600);
	

    define('SO_NAME', 'AgroWeb');
    define('SO_SUBDOMAIN', 'agroweb');
    define('SO_DOMAIN', 'agrinvestbrasil.com.br');
    define('SO_URL', SO_SUBDOMAIN . '.' . SO_DOMAIN);
    define('SO_EMAIL', 'no-reply@' . SO_DOMAIN);

    define('SANDBOX_PATH', dirname(__FILE__));
    define('DOCTRINE_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'lib');
    define('MODELS_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'models');

    define('DSN', 'mysql://root:Agrnvst941142@localhost/padrao');
	
    require_once(DOCTRINE_PATH . DIRECTORY_SEPARATOR . 'Doctrine.php');

    spl_autoload_register(array('Doctrine', 'autoload'));

    $manager = Doctrine_Manager::getInstance();
    $manager->openConnection(DSN, 'doctrine');
    $manager->setAttribute('model_loading', 'conservative');
    
    Doctrine::loadModels(MODELS_PATH);
	
	
	Doctrine::generateModelsFromDb('models');
	
?>