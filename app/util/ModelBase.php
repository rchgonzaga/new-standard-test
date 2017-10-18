<?php

interface iModelBase {
    public function save($params);
    public function delete($params);
	
	public function preValidadeCallBack();
	public function preSaveCallBack();
	public function posSaveCallBack();
	public function preDeleteCallBack();
	public function posDeleteCallBack();
}

class ModelBase extends Model {

	var $table 	= NULL;
	var $child 	= NULL;
	var $undrs 	= NULL;
	
	// constructor
	public function __construct($child) {
		
		$this->child = $child;
		$this->table = $child->table;
		$this->addAggregatedToFilter();
		$this->undrs = new __();
		
	}
	
	// Method to find an entity by your defaul PK or a field that you choose
	public function find($valor, $field = 'id'){
		$field = ($field ? $field : 'id');

		$entity = @ORM::for_table($this->table)
			->where($field, $valor)
			->find_array();
		$this->findAggregatedsAdd($valor, $entity[0]);
		return ($entity ? $entity[0] : $entity);
	}
	
	
	/**
	 * Find all data from an Entity
	 *
	*/
	public function findAll($field = null, $valor = null){
		
		$entity;

		if($field && $valor){
			$entity = @ORM::for_table($this->table)
				->where($field, $valor)
				->find_array();
		} else {
			$entity = @ORM::for_table($this->table)
				->find_array();
		}

		$this->findAggregatedsAdd($valor, $entity, false);

		return $entity;
	}
	
	/**
	 * Default save mathod, that receive the posted parans end convert into table fields
	 *
	*/
	public function save($params){

		$entity;
		
		$token = date_timestamp_get(date_create());

		$validacao =  new Validacao($params, $this->child->regra_validacao, '');
		$validacao = $validacao->executar();
		
		// Call the customized rules of validations regardless the normal Controller validation fields
		$this->resolveUserValidation($this->table, $params);

		// PRE SAVE CALLBACK
		if (method_exists($this->child,'preValidadeCallBack')) {
			if($this->child->preValidadeCallBack()){
				foreach ($this->child->preValidadeCallBack() as $key => $value) {
					$validacao[$key] = $value;
				}	 
			}
		}
		// PRE SAVE CALLBACK
		
		$resultado = [];
		
		// Check if the params are valid
		if($validacao){

			$resultado['success']	= false;
			$resultado['msg']		= 'Ocorreu um erro na gravação dos dados, veifique os campos em vermelho.';
			$resultado['errors']	= $validacao;

		} else {

			// PRE SAVE CALLBACK
			if (method_exists($this->child,'preSaveCallBack')) {
				$this->child->preSaveCallBack();
			}
			// PRE SAVE CALLBACK

			// check if it is an update action, and if so, grab the existent object from the database
			// to procede the update, the oposite is to create a new one
 			$entity = (
 				(array_key_exists('id', $params) && isset($params['id']) && $params['id'] != NULL) ?
 				ORM::for_table($this->table)->find_one($params['id']) :
 				$entity = ORM::for_table($this->table)->create()
 			);

 			// iterate over the parameters setting the value to then
 			// if there is an aggregated parameter in the array,
 			// remove to apply the aggregated rule
			foreach ($params as $key => $value) {

				// Verify if the agregated entity is in the parameters, if so, remove then to save de main entity
				if(count($this->child->agregateds)){
					foreach ($this->child->agregateds as $agregated) {
						$agregated = (object) $agregated;
						if($agregated->param != $key){
							$entity->set($key, (is_array($value) ? $value['id'] : $value));
						}
					}
				} else {
					// Check if all keys are in the "regra_validacao", only these keys will be saved.
					if(array_key_exists($key,$this->child->regra_validacao)){
						$entity->set($key, (is_array($value) ? $value['id'] : $value));
					}
				}
			}
			
			$entity->save();
			
			// Log update or save
			$this->logDataBase(
				$this->table, 
				$entity->as_array(), 
				( array_key_exists('id', $params) ? 'update' : 'insert'),
				$token
			);

			// Check if the model has agregateds
			// If so, delete then and create again if it was an update, or just create if it was
			// a new registry
			if(count($this->child->agregateds)){
				
				foreach ($this->child->agregateds as $agregated) {
					$agregated = (object) $agregated;
					//implementar um update
					
					$dataToLog = ORM::for_table($agregated->param)->where_equal($agregated->fk, $entity->id)->find_array();
					
					// Log update or save
					$this->logDataBase(
						$agregated->param, 
						(count($dataToLog) ? $dataToLog[0] : $dataToLog),
						'delete',
						$token
					);
					
					//delete all the related registries
					ORM::for_table($agregated->param)
					    ->where_equal($agregated->fk, $entity->id)
					    ->delete_many();
					
					// and create again, based on the post
					$newAgregated = new $agregated->entity();

					foreach ($params[$agregated->param] as $toSave) {
						$toSave = (array)$toSave;
						// get the id from the new created entity in the line 74
						$toSave[$agregated->fk] = $entity->id;
						$newAgregated->save($toSave);
					}
				}
				
			}

			// POST SABE CALLBACK
			if (method_exists($this->child,'posSaveCallBack')) {
				$this->child->posSaveCallBack();
			}
			// POST SABE CALLBACK
			$resultado['success'] = true;
			$resultado['msg'] = 'Registro '. (array_key_exists('id', $params) ? 'autalizado' : 'criado') .' com sucesso';
				
		}
		
		return $resultado;

	}

	public function delete($params){
		$entity;
		$resultado = [];
		
		$token = date_timestamp_get(date_create());

		if(!array_key_exists('id', $params)){

			$resultado['success']	= false;
			$resultado['msg']		= 'Erro ao excluir registro';
			$resultado['errors']	= ['id' => 'Campo ID não encontrado'];

		} else {

			// PRE DELETE CALLBACK
			if (method_exists($this->child,'preDeleteCallBack')) {
				$this->child->preDeleteCallBack();
			}
			// PRE DELETE CALLBACK

			if(array_key_exists('id', $params)){
	 			$entity = ORM::for_table($this->table)->find_one($params['id']);
			}

			if($entity){

				foreach ($this->agregateds as $aggregated) {
					
					// Log delete
					$this->logDataBase(
						$aggregated['param'], 
						ORM::for_table($aggregated['param'])->where_equal($aggregated['fk'], $params['id'])->find_array(), 
						'delete',
						$token
					);
					
					ORM::for_table($aggregated['param'])
					    ->where_equal($aggregated['fk'], $params['id'])
						->delete_many();
				}

				// Log delete
				$this->logDataBase(
					$this->table, 
					ORM::for_table($this->table)->find_one($params['id'])->as_array(), 
					'delete',
					$token
				);
				
				ORM::for_table($this->table)->find_one($params['id'])->delete();

				$resultado['success'] 	= true;
				$resultado['msg']		= 'Registro apagado';
			} else {
				$resultado['success'] 	= false;
				$resultado['msg']		= 'Registro não encontrado';
			}

			// POST DELETE CALLBACK
			if (method_exists($this->child,'posDeleteCallBack')) {
				$this->child->posDeleteCallBack();
			}
			// POST DELETE CALLBACK
				
		}
		
		return $resultado;
	}

	// for each aggregated, add the param to the filter
	private function addAggregatedToFilter(){

		if($this->agregateds){
			foreach ($this->child->agregateds as $aggregated) {
				$this->child->regra_validacao[ $aggregated['param'] ] = '';
			}
		}

	}

	private function findAggregatedsAdd($id, &$entity, $many = false){

		// to findo many records
		if($many){
			for ($i=0; $i < count($entity); $i++) { 
				// look into the child class and search to the aggregateds
				if($this->child->agregateds){
					// foreach aggregated, find the whole entity to load
					foreach ($this->child->agregateds as $aggregated) {
						$tmpAggregated = new $aggregated['entity']();

						$toAdd = $tmpAggregated->findAll($aggregated['fk'], $entity[$i]['id']);

						// if the field could be resolved, put it in the return array
						if($toAdd){
							foreach ($toAdd as $add) {
								foreach ($add as $key => $value) {
									if($key != $aggregated['fk']){
										$add[$key] = $this->resolveEntities($key, $value);
									}
								}
								$entity[$i][$aggregated['param']][] = $add;
							}

						// case else, just show the id number, instead of the whole entity
						} else {
							$entity[$i][$aggregated['param']][] = $tmpAggregated->find($entity[$i]['id'], $aggregated['fk']);
						}
					}
				}
			}
		// find only one record aggregated
		} else {
			if($this->child->agregateds){
				foreach ($this->child->agregateds as $aggregated) {
					$tmpAggregated = new $aggregated['entity']();
					
					$toAdd = $tmpAggregated->findAll($aggregated['fk'], $entity[0]['id']);

					// if the field could be resolved, put it in the return array
					if($toAdd){
						foreach ($toAdd as $add) {
							foreach ($add as $key => $value) {
								if($key != $aggregated['fk']){
									
									$add[$key] = $value;
								}
							}
							$entity[$aggregated['param']][] = $add;
						}

					// case else, just show the id number, instead of the whole entity
					} else {
						$entity[$aggregated['param']][] = $tmpAggregated->find($id, $aggregated['fk']);
					}

				}
			}
		}

		return $entity;
	}

	private function resolveEntities($key, $value){
		
		$entity = false;

		if(@$GLOBALS['globalEntities'][$key]){
			$entity = ORM::for_table($GLOBALS['globalEntities'][$key])
				->where('id', $value)
				->find_array()[0];
		}

		return $entity;
	}
	
	private function resolveUserValidation($entity, $params) {
		//$this->jsException($params);
	}
	
	public function jsException($msg){
		echo json_encode( array('success' => false, 'msg' => json_encode($msg)) );
		die();
	}
	
	public function logDataBase($table, $params, $type, $token){
		
		$log = ORM::for_table('log')->create();
		
		// Resolve the id to use
		$id = (
			array_key_exists('id', $params) ? 
			$params['id'] : 
			array_key_exists('id_'.$table, $params) 
		);
		
		if(!$id){
			$id = (
				array_key_exists('id_'.$table, $params) ?
				$params['id_'.$table] :
				$this->undrs->first($params)
			);
		}
		
		$log->id_entidade = (is_array($id) ? $this->undrs->last($this->undrs->values($id)) : $id );
		$log->id_usuario = 0;
		$log->entidade = $table;
		$log->operacao = $type;
		$log->historico = json_encode($params);
		$log->dt_operacao = date("Y-m-d");
		$log->hr_operacao = date("h:i:s");
		$log->token = $token;

		$log->save();
		
	}

}