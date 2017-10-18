<?php

class Base extends \Slim\Slim {

	public $app;

	function __construct() {
		$this->app = $this->getInstance();
	}



}