<?php

//require_once BASEDIR . '/util/ModelBase.php';


class PaisModel extends ModelBase { //implements iModelBase {

	public $table = 'pais';

	public $agregateds = [
	];

	public $regra_validacao = [
		'id' 			=> 'numerico',
		'descr' 		=> 'requerido tamanho_max[130] nome',
		'abreviacao' 	=> 'requerido tamanho_max[2]'
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