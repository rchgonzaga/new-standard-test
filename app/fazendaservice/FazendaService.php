<?php

class FazendaService extends Base {

	private $table = '';

	private $tpls = null;

	private $model = 'Fazenda';
        
    var $modelBase = NULL; //NAO MODIFICAR ESTA PROPRIEDADE

	function __construct() {
		
		parent::__construct();
		
        $this->modelBase = new ModelBase(new $this->model);

		$this->tpls = (object)[
			'index'  => strtolower($this->model) . '/inicial.html.twig'
		];
	}

	// Normal route
	function index(){
	    $args = [];
	    $this->app->render($this->tpls->index, $args);
	}

	function all(){
		echo json_encode($this->modelBase->findAll());
	}

	function find($id = null){
		echo json_encode( $this->modelBase->find([array('field' => 'id', 'value' => $id)]), true );
	}

	function findFull($id = null){
		echo json_encode( $this->modelBase->findFull(array('field' => 'id', 'value' => $id)));
	}

	// Delete
	function postDelete(){

		$post = $this->app->request->getBody();
		$post = json_decode( $post, true);

		echo json_encode( $this->modelBase->deltree($post) );

	}

	// Save or Update
	function postCreate(){

		$post = $this->app->request->getBody();
		$post = json_decode( $post, true);
		echo json_encode( $this->modelBase->persist($post) );

  	}
}
