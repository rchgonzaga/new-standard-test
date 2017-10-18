<?php

//require_once BASEDIR . '/util/ModelBase.php';

class FazendaEUsuarioModel extends ModelBase { //implements iModelBase {

	public $table = 'fazenda_e_usuario';

	public $agregateds = [];

	public $regra_validacao = [
		'id_fazenda' 			=> 'numerico requerido',
		'id_usuario' 			=> 'numerico requerido'
	];


	public function __construct() {
		
		parent::__construct($this);

	}

	public function save($params){

		return parent::save($params);

	}

	public function delete($params){

		return parent::delete($params);

	}

	// --------- CALLBACKS ---------- //
	
	public function preValidadeCallBack() {
		
	}

	public function preSaveCallBack() {
		
	}

	public function posSaveCallBack() {
		
	}

	public function preDeleteCallBack() {
		
	}

	public function posDeleteCallBack() {
		
	}

	// --------- CALLBACKS ---------- //

}