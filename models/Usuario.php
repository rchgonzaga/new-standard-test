<?php

/**
 * Usuario
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6401 2009-09-24 16:12:04Z guilhermeblanco $
 */
class Usuario extends BaseUsuario {
    
    var $idProperty = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $hasOne = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $hasMany = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $params = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $validationRule = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    var $modelBase = NULL; //NAO MODIFICAR ESTA PROPRIEDADE
    
    function __construct() {

        $this->idProperty = 'id_usuario';
        
        $this->hasOne = array(
            
        );
        
        $this->hasMany = array(
            'FazendaEUsuario',
            // 'UsuarioPerfil'
        );
        
        $this->params = array(
            /*array(
                'field' => '',
                'value' => ''
            )*/
        );
        
        $this->validationRule = array(
            'id' 			=> 'numerico',
            'nome' 			=> 'requerido tamanho_max[130] nome',
            'cargo' 		=> 'requerido tamanho_max[80]',
            'email' 		=> 'requerido email',
            'senha' 		=> 'requerido tamanho_max[20]',
            'telefone' 		=> 'requerido tamanho_max[25]',
            'status' 		=> '',
            'gerente' 		=> '',
            'operacional' 	=> ''
        );
        
        //NAO MODIFICAR ESTE TRECHO DO CODIGO
        
        parent::__construct();
    }

    public function fromDb() {
        
        $this->nome != '' ? $this->set('nome', FromDb::string($this->nome)) : '' ;
        
    }
    
    public function toDb() {
        
        $this->nome != '' ? $this->set('nome', ToDb::string($this->nome)) : '' ;
        
    }
    
}