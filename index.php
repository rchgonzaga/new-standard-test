<?php

//ini_set('memory_limit', '-1');

error_reporting(E_ALL & ~E_STRICT);

define('SEP', '\\');
define('BASEDIR', dirname(__FILE__).'/app');
define('TEMPLATEDIR', dirname(__FILE__).'/templates');
define('BASE', dirname(__FILE__));

// DEBUG {true : false}
define('DEBUG', false);

$GLOBALS['globalEntities'] = array(
    'id_fazenda' => 'fazenda',
    'id_usuario' => 'usuario'
);

$GLOBALS['menuArray'] = array();

require 'vendor/autoload.php';

require 'app/base.php';

require 'app/util/Util.php';
require 'app/util/FromDb.php';
require 'app/util/ToDb.php';
require 'app/util/utilphp110/util.php';
require 'app/util/underscore.php';
require 'app/util/validator.php';
require_once 'app/util/idiorm.php';
require_once 'app/util/paris.php';

require 'app/util/upload/extras/Uploader.php';

/*Doctrine config*/
/*Doctrine config*/
/*Doctrine config*/
    define('SO_NAME', 'nParao');
    define('SO_SUBDOMAIN', 'nparao');
    define('SO_DOMAIN', 'agrinvestbrasil.com.br');
    define('SO_URL', SO_SUBDOMAIN . '.' . SO_DOMAIN);
    define('SO_EMAIL', 'no-reply@' . SO_DOMAIN);

    define('SANDBOX_PATH', dirname(__FILE__));
    define('DOCTRINE_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'lib');
    define('MODELS_PATH', SANDBOX_PATH . DIRECTORY_SEPARATOR . 'models');

    define('DSN', 'mysql://root:Agrnvst941142@localhost/comparacao');

    require_once(DOCTRINE_PATH . DIRECTORY_SEPARATOR . 'Doctrine.php');

    spl_autoload_register(array('Doctrine', 'autoload'));

    $manager = Doctrine_Manager::getInstance();
    $manager->openConnection(DSN, 'doctrine');
    $manager->setAttribute('model_loading', 'conservative');

    Doctrine::loadModels(MODELS_PATH);				
/*Doctrine config*/
/*Doctrine config*/
/*Doctrine config*/

ORM::configure('mysql:host=localhost;dbname=lobo');
ORM::configure('username', 'root');
ORM::configure('password', 'Agrnvst941142');
ORM::configure('logging', true);

// Prepare app
$app = new \Slim\Slim(array(
    'templates.path' => TEMPLATEDIR
));

// Prepare view
$app->view(new \Slim\Views\Twig());
$app->view->parserOptions = array(
    'charset' => 'utf-8',
    //'cache' => realpath('templates/cache'),
    'auto_reload' => true,
    'strict_variables' => false,
    'autoescape' => true
);
$app->view->parserExtensions = array(new \Slim\Views\TwigExtension());


$app->get('/', function() use ($app){
    $app->redirect('inicial');
});

registerController($app,
    'Inicial',
    'Home'
);

registerController($app,
    'UsuarioService',
    'Usuário'
);

registerController($app,
    'FazendaService',
    'Fazenda'
);

registerController($app,
    'CidadeService',
    'Cidade'
);

registerController($app,
    'EstadoService',
    'Estado'
);

registerController($app,
    'PaisService',
    'Pais'
);

registerController($app,
    'MaquinaService',
    'Maquina'
);

registerController($app,
    'MaquinaTipoService',
    'Tipo Maquina'
);

registerController($app,
    'MaquinaStatusService',
    'Status Maquina'
);

registerController($app,
    'MaodeobraService',
    'Mao de obra'
);

registerController($app,
    'TalhaoService',
    'Talhao'
);

registerController($app,
    'CulturaService',
    'Cultura'
);

registerController($app,
    'SafraService',
    'Safra'
);

// não está no menu
registerController($app,
    'SafraTalhaoService',
    null
);

registerController($app,
    'SiloService',
    'Silo'
);

registerController($app,
    'PesagemProducaoService',
    'Pesagem Producao'
);


registerController($app,
    'CaminhaoFreteService',
    'Caminhao Frete'
);


registerController($app,
    'TabelaClassificacaoService',
    'Tabela'
);


registerController($app,
    'TabelaIndiceValorService',
    'Indices'
);


$twig = $app->view()->getEnvironment();
$twig->addGlobal('arrayMenu', $GLOBALS['menuArray']);
$twig->addGlobal('nome', "Rafael");

$app->run();
