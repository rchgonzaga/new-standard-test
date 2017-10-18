<?php

//require_once BASEDIR . '/util/ModelBase.php';


class FazendaModel extends ModelBase { //implements iModelBase {

	public $table = 'fazenda';

	public $agregateds = [
	];

	public $regra_validacao = [
		'id' 			=> 'numerico',
		'id_cidade'		=> 'requerido numerico',
		'nome' 			=> 'requerido tamanho_max[80] nome',
		'area_total' 	=> 'requerido decimal[13,2]',
		'area_plantio'	=> 'requerido decimal[13,2]'
	];


	public function __construct() {

		parent::__construct($this);

	}

	// --------- CALLBACKS ---------- //
	
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