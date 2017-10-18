<?php

//require_once BASEDIR . '/util/ModelBase.php';


class CidadeModel extends ModelBase { //implements iModelBase {

	public $table = 'cidade';

	public $agregateds = [
		[
			'entity' 	=> 'EstadoModel',
			'param' 	=> 'estado',
			'fk' 		=>  'id'
		]
	];

	public $regra_validacao = [
		'id' 			=> 'numerico',
		'id_estado'		=> 'requerido numerico',
		'descr' 		=> 'requerido tamanho_max[130] nome'
	];


	public function __construct() {

		parent::__construct($this);

	}

	// --------- CALLBACKS ---------- //
	
	// public function preValidadeCallBack(){
	// 	$validacao = array(
	// 		'coizi' => 'O coizi está errado',
	// 		'negossi' => 'Sáporra ta zuzada'
	// 	);
	// 	return $validacao;
	// }
	public function preValidadeCallBack(){

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