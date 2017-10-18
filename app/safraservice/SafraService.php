<?php

class SafraService extends \Slim\Slim {

	private $app;

	private $table = '';

	private $tpls = null;

	private $model = 'Safra';
        
    var $modelBase = NULL; //NAO MODIFICAR ESTA PROPRIEDADE

	function __construct() {

        $this->modelBase = new ModelBase(new $this->model);
        
		
		$this->app = $this->getInstance();

		$this->tpls = (object)[
			'index'  => strtolower($this->model) . '/inicial.html.twig'
		];
	}

	// Normal route
	function index(){
	    $args = [];

		$get = $this->app->request->get();
		$post = $this->app->request->getBody();
		
	    $this->app->render($this->tpls->index, $args);
	}

	function all(){
		$get = $this->app->request->get();
		$post = $this->app->request->getBody();
		echo json_encode($this->modelBase->findAll());
	}

	function find($id = null){
		$get = $this->app->request->get();
		$post = $this->app->request->getBody();
		echo json_encode( $this->modelBase->find([array('field' => 'id', 'value' => $id)]), true );
	}

	function findFull($id = null){
		$get = $this->app->request->get();
		$post = $this->app->request->getBody();
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
