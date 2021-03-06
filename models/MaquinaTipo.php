<?php

/**
 * MaquinaTipo
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6401 2009-09-24 16:12:04Z guilhermeblanco $
 */
class MaquinaTipo extends BaseMaquinaTipo  {
   
    var $idProperty = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $hasOne = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $hasMany = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $params = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $validationRule = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $modelBase = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    function __construct() {

        $this->idProperty = 'id_tipo_maquina';
        
        $this->hasOne = array(
            
        );
        
        $this->hasMany = array(
            'Maquina'
        );
        
        $this->params = array(
            /*array(
                'field' => '',
                'value' => ''
            )*/
        );
        
        $this->validationRule = array(
            'id'                => 'numerico',
            'descr'        => 'requerido nome'
        );
        
        //NAO MODIFICAR ESTE TRECHO DO CODIGO
        
        parent::__construct();
    }
}