<?php

class Inicial extends \Slim\Slim {

	private $app;

	private $table = '';

	private $url = 'inicial';

	private $tpls = null;

	function __construct() {
		$this->app = $this->getInstance();

		$this->tpls = (object)[
			'index'  => $this->url . '/inicial.html.twig'
		];
	}

	function index(){
	    $args = [];

	    $args['casos'] = count(ORM::for_table('caso')->where(array(
            'deleted' => false
        )));

	    $args['usuarios'] = count(ORM::for_table('pessoa')->find_array());
	    
	    $args['pessoa'] = count(ORM::for_table('pessoa')->find_array());

	    $this->app->render($this->tpls->index, $args);
	}

	function create($errors = null){
		$args = [];

		if($errors){
			$args['errors'] = $errors;
		}

		$this->app->render($this->tpls->create, $args);
	}

	function edit($id = null){
		$args = [];

	  $this->app->render($this->tpls->create, $args);
	}

	function delete($id = null){

	}

	function postCreate(){

  }

}
