<?php

class Api extends Base {

	private $app;

	function __construct() {
		parent::__construct();
		$this->app = parent::getInstance();
	}
	
	function index($param = null){
	    echo 'VIEW';
	}

	function postGetCidade(){

		$q = $this->app->request->post('q');

		$cidades = result("SELECT 
								c.id,
								c.descr label,
								e.abreviacao uf
							FROM cidade c
							INNER JOIN estado e ON e.id = c.id_estado
							WHERE c.descr like '%".$q."%'")->fetch_array();

		$resul = ($cidades ? [$cidades] : []);
		echo json_encode($resul);
	}
}

?>