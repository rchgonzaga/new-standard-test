<?php

/**
 * Cultura
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6401 2009-09-24 16:12:04Z guilhermeblanco $
 */
class Cultura extends BaseCultura{

    var $idProperty = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $hasOne = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $hasMany = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $params = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $validationRule = NULL; //NAO MODIFICAR ESTA PROPRIEDADE

    var $modelBase = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    function __construct() {

        $this->idProperty = 'id_cultura';
        
        $this->hasOne = array(

        );
        
        $this->hasMany = array(
            'Safra'
        );
        
        $this->params = array(
            /*array(
                'field' => '',
                'value' => ''
            )*/
        );
        
        $this->validationRule = array(
            'id'		=> 'requerido',
            'descr'		=> 'requerido tamanho_max[45] nome',
            'cor'		=> 'requerido tamanho_max[45]',

        );
        
        //NAO MODIFICAR ESTE TRECHO DO CODIGO
        
        parent::__construct();
    }

}