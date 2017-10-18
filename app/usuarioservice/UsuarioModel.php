<?php

//require_once BASEDIR . '/util/ModelBase.php';


class UsuarioModel extends ModelBase { //implements iModelBase {

	public $table = 'usuario';

	public $agregateds = [
		[
			'entity' 	=> 'FazendaEUsuarioModel',
			'param' 	=> 'fazenda_e_usuario',
			'fk' 		=>  'id_usuario'
		]
	];

	public $regra_validacao = [
		'id' 			=> 'numerico',
		'nome' 			=> 'requerido tamanho_max[130] nome',
		'cargo' 		=> 'requerido tamanho_max[80]',
		'email' 		=> 'requerido email',
		'senha' 		=> 'requerido tamanho_max[20]',
		'telefone' 		=> 'requerido tamanho_max[25]',
		'status' 		=> '',
		'gerente' 		=> ''
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