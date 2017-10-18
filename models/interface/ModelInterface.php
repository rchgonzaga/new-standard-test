<?php

/**
* ModelInterface
*
* @author André Luiz Santos Nascimento
* @copyright (c) 2009, by André Luiz Santos Nascimento
* @version 1.0
* @link www.qooxfinance.com.br 
*
*/

interface ModelInterface {
	
	public function find($params);
	
	public function persist($entity, $post, $hasOne, $hasMany);
	
	public function loadToForm($params, $hasOne);
	
	public function deltree($params);
	
	public function getNextId($params);
	
	public function loadToTrigger($params, $post);
	
	public function loadToGrid($params, $post);
	
	public function loadToStore($params);
	
	public function toMysql();
	
	public function fromMysql();
	
}