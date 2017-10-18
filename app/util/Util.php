<?php

function resolveKeys($key){
    // return  ($key >= 'id_fazenda' ? 'fazenda' :
    //     $key == 3 ? '#ACFA58' :
    //     $key == 2 ? '#FFFF00' :
    //     $key == 1 ? '#DF7401' :
    //     '#FF0000');
}

function nc($params){
    return new stdObject($params);
}


/*
class stdObject {
    public function __construct(array $arguments = array()) {
        if (!empty($arguments)) {
            foreach ($arguments as $property => $argument) {
                if ($argument instanceOf Closure) {
                    $this->{$property} = $argument;
                } else {
                    $this->{$property} = $argument;
                }
            }
        }
    }

    public function __call($method, $arguments) {
        if (isset($this->{$method}) && is_callable($this->{$method})) {
            return call_user_func_array($this->{$method}, $arguments);
        } else {
            throw new Exception("Fatal error: Call to undefined method stdObject::{$method}()");
        }
    }
}

$person = new stdObject(array(
    "name" => "nick",
    "age" => 23,
    "friends" => array("frank", "sally", "aaron"),
    "sayHi" => function() {
        return "Hello there";
    }
));

$person->sayHi2 = function() {
    return "Hello there 2";
};

$person->test = function() {
    return "test";
};

var_dump($person->name, $person->test(), $person->sayHi2());
*/

class stdObject {
    public function __construct(array $arguments = array()) {
        if (!empty($arguments)) {
            foreach ($arguments as $property => $argument) {
                if ($argument instanceOf Closure) {
                    $this->{$property} = $argument;
                } else {
                    $this->{$property} = $argument;
                }
            }
        }
    }

    public function __call($method, $arguments) {
        if (isset($this->{$method}) && is_callable($this->{$method})) {
            return call_user_func_array($this->{$method}, $arguments);
        } else {
            throw new Exception("Fatal error: Call to undefined method stdObject::{$method}()");
        }
    }
}



function genRndString($length = 10) {
    $characters = 'abcdefghijklmnopqrstuvwxyz';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function issetValueNull(&$mixed) {
    return (isset($mixed)) ? $mixed : null;
}

function zip() {
    $args = func_get_args();

    $ruby = array_pop($args);
    if (is_array($ruby))
        $args[] = $ruby;

    $counts = array_map('count', $args);
    $count = ($ruby) ? min($counts) : max($counts);
    $zipped = array();

    for ($i = 0; $i < $count; $i++) {
        for ($j = 0; $j < count($args); $j++) {
            $val = (isset($args[$j][$i])) ? $args[$j][$i] : null;
            $zipped[$i][$j] = $val;
        }
    }
    return $zipped;
}

function decimal($valor){

    $valor = str_replace('.', '', $valor);
    $valor = str_replace(',', '.', $valor);

    return $valor;

}

function decimal_br($valor, $casas = 2, $milhar = true){

    if($milhar){
        $valor = str_replace(',', '', $valor);
        $valor = number_format($valor, $casas, ',', '.');
    } else {
        $valor = str_replace(',', '', $valor);
        $valor = number_format($valor, $casas, ',', '');
    }
    return $valor;

}

function inteiro($valor){

    $valor = str_replace('.', '', $valor);
    $valor = str_replace(',', '', $valor);

    return $valor;

}

function ucase($str){

    $str = utf8_decode($str);

    $str = str_replace(array('Â', 'â', 'À', 'à', 'Á', 'á', 'Ä', 'ä', 'Ã', 'ã'), 'A', $str);
    $str = str_replace(array('Ê', 'ê', 'È', 'è', 'É', 'é', 'Ë', 'ë'), 'E', $str);
    $str = str_replace(array('Î', 'î', 'Í', 'í', 'Ì', 'ì', 'Ï', 'ï'), 'I', $str);
    $str = str_replace(array('Ô', 'ô', 'Õ', 'õ', 'Ò', 'ò', 'Ó', 'ó', 'Ö', 'ö'), 'O', $str);
    $str = str_replace(array('Û', 'û', 'Ù', 'ù', 'Ú', 'ú', 'Ü', 'ü'), 'U', $str);
    $str = str_replace(array('ç','Ç'), 'C', $str);

    $str = strtoupper($str);

    $str = str_replace('º', 'o', $str);
    $str = str_replace('ª', 'a', $str);

    return trim($str);

}


function validateDate($date, $format = 'Y-m-d H:i:s') {
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) == $date;
}


function result($query = ''){

    $mysqli = new mysqli('localhost', 'root', 'Agrnvst941142', 'padrao');

    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') '
                . $mysqli->connect_error);
    }

    $result = $mysqli->query($query) or die($mysqli->error);

    return $result;

}

function check_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if (!function_exists('baseUrl')) {
    function baseUrl($atRoot=FALSE, $atCore=FALSE, $parse=FALSE){
        if (isset($_SERVER['HTTP_HOST'])) {
            $http = isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off' ? 'https' : 'http';
            $hostname = $_SERVER['HTTP_HOST'];
            $dir =  str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);

            $core = preg_split('@/@', str_replace($_SERVER['DOCUMENT_ROOT'], '', realpath(dirname(__FILE__))), NULL, PREG_SPLIT_NO_EMPTY);
            $core = $core[0];

            $tmplt = $atRoot ? ($atCore ? "%s://%s/%s/" : "%s://%s/") : ($atCore ? "%s://%s/%s/" : "%s://%s%s");
            $end = $atRoot ? ($atCore ? $core : $hostname) : ($atCore ? $core : $dir);
            $base_url = sprintf( $tmplt, $http, $hostname, $end );
        }
        else $base_url = 'http://localhost/';

        if ($parse) {
            $base_url = parse_url($base_url);
            if (isset($base_url['path'])) if ($base_url['path'] == '/') $base_url['path'] = '';
        }

        return $base_url;
    }
}

function registerController($app, $controller, $menuName = null){

    $dir = strtolower($controller);

    require BASEDIR."/$dir/$controller.php";

    $class = new ReflectionClass($controller);
    $methods = $class->getMethods();

    $arrPatterns = array();
    foreach ($methods as $method) {
        $bufferName = '';
        if($method->class == $controller && $method->name != '__construct'){

          $r = new ReflectionMethod($controller, $method->name);
          $params = $r->getParameters();

          if($params){
            if($method->name != 'create'){
              $bufferName .= $method->name . '|';
            } else {
              $bufferName .= $method->name;
            }
          } else {
            $bufferName .= $method->name;
          }

          foreach ($params as $param) {
              //$param is an instance of ReflectionParameter
              if($param->getName() != 'errors'){
                $bufferName .= '(/:' . $param->getName() . ')';
              }

          }

          $arrPatterns[] = $bufferName;

        }
    }
    
    // verifica se o nome do item foi informado
    if($menuName)   
        $GLOBALS['menuArray'][] = array(
            'label' => $menuName,
            'url' => strtolower($controller)
        );

    foreach ($arrPatterns as $method) {
        $httpMethod = substr($method, 0, 3);

        $param = (strpos($method, '|') > 0 ? explode('|', $method) : '');
        $p = (count($param) > 1 ? $param[1] : '');

        $method = (count($param)>1 ? $param[0] : $method);

        //echo "<br>app->$httpMethod('$dir/".strtolower($method)."$p',\"$controller:$method\");";

        switch ($httpMethod) {
            case 'get':
                $app->get('/'.$dir.'/'.(strtolower($method) == 'index' ? '' : strtolower($method)).$p, "$controller:$method");
                break;

            case 'pos':
                $app->post('/'.$dir.'/'.strtolower($method).$p, "$controller:$method");
                break;

            case 'put':
                $app->put('/'.$dir.'/'.strtolower($method).$p, "$controller:$method");
                break;

            case 'del':
                $app->delete('/'.$dir.'/'.strtolower($method).$p, "$controller:$method");
                break;

            default:
                $app->get('/'.$dir.'/'.(strtolower($method) == 'index' ? '' : strtolower($method)).$p, "$controller:$method");
                break;
        }
    }

}
