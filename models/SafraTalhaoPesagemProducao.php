<?php

/**
 * SafraTalhaoPesagemProducao
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6401 2009-09-24 16:12:04Z guilhermeblanco $
 */
class SafraTalhaoPesagemProducao extends BaseSafraTalhaoPesagemProducao {
   
    var $idProperty = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $hasOne = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $hasMany = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $params = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $validationRule = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $modelBase = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    function __construct() {

        $this->idProperty = 'id_safra_talhao_pesagem_producao';
        
        $this->hasOne = array(
            'SafraTalhao',
            'PesagemProducao'
        );
        
        $this->hasMany = array(
            // 'UsuarioPerfil'
        );
        
        $this->params = array(
            /*array(
                'field' => '',
                'value' => ''
            )*/
        );
        
        $this->validationRule = array(
            'peso_limpo' 			=> 'requerido',
            'id_safra_talhao'       => 'requerido numerico',
            'id_pesagem_producao' 	=> 'requerido numerico'
        );
        
        //NAO MODIFICAR ESTE TRECHO DO CODIGO
        
        parent::__construct();
    }
}