<?php

/**
 * ModelBase
 *
 */

class ModelBase {
	
	var $table = NULL;
	
	var $und = NULL;
	
	public function __construct($table) {
		
		$this->table = $table;
		
		$this->und = new __();
		
	}
	
	public function find($params, $object = false) {
		
		// Gera um alias para a tabela principal para fazer os joins locais
		$randomAlias = ' ' . chr(64+rand(0,26));
		
		
		$entity = Doctrine_Query::create()
			      ->from($this->table->getTable()->getComponentName());
		
		$this->mountQuery($entity, $params);
		
		$registry = $entity->fetchOne()->getData();

		// Verifica se existem na configurações do objeto o parametro que força o carregamento de objetos agregados
		// caso haja, busca todas a referencias e agrega ao objeto como metodo padrão.
		// !$object, significa que o metodo está sendo chamado para recuperar somente o objeto sem as dependencias diretas
		if(!$object){
			if(count($this->table->hasMany) > 0){
				foreach ($this->table->hasMany as $hasEntity) {
					
					$obj = new $hasEntity;
					
					if(count($obj->hasOne) > 0){
						foreach ($obj->hasOne as $hasOneEntity) {
							$toInner = $this->und->without($obj->hasOne, $this->table->idProperty );
						}

						$toKey = $this->und->keys($toInner)[0];
						$registry[$hasEntity] = Doctrine_Query::create()
							->from($obj->getTable()->getComponentName() . $randomAlias)
							->where($this->table->idProperty . ' = ?', $registry['id'])
							->innerJoin($randomAlias.'.'. $toInner[$toKey])
							->execute(array(), Doctrine::HYDRATE_ARRAY);
					}

				}
			}
		}
			
		return ($object ? $entity->fetchOne() : $registry);
		
	}
	
	/**
	 * Metodo responsavel por recuperar todos os registros
	*/
	public function findFull($params, $one = true) {
		
		// Gera um alias para a tabela principal para fazer os joins locais
		$randomAlias = ' ' . chr(64+rand(0,26));
		
		// repositorio de relacionamentos
		$relationReps = array();
		
		$entity = Doctrine_Query::create()
			      ->from($this->table->getTable()->getComponentName() . $randomAlias);
		
		// Verifica se a tabela tem relacionamentos diretos, LOCAIS
		// Isto faz com que todo relacionamento direto, ou seja id_tablea, sempre esteja presente como um objeto
		if($this->table->getTable()->getRelations()){
			
			// E verifica se possui pelo atributo Type que tem que ser igual a ZERO 0
			// iterando todos os itens do array de relacionamentos
			foreach ($this->table->getTable()->getRelations()  as $relation) {
				if($relation->getType() == 0) {
					$relationReps[] = $relation->getClass();
					$entity->innerJoin($randomAlias.'.'.$relation->getClass());
				}
			}
		}
		
		$entity->where($params['field'] . ' = ?', $params['value']);
		
		$entity = $entity->execute(array(), Doctrine::HYDRATE_ARRAY);
		
		$store = array();
		
		// Gera um alias para a tabela principal para fazer os joins locais
		$randomAlias = ' ' . chr(64+rand(0,26));

		// FOREACH reponsavel por carregar o componente diretamente atrelado
		foreach ($entity as $entKey => $entValue) {
			foreach ($relationReps as $relKey => $relValue) {

				$directEntity = $relationReps[$relKey];
				$directEntity = new $directEntity;

				foreach ($directEntity->hasOne as $dirctKey => $directValue) {
					try {
						$arry =  Doctrine_Query::create()
							->from($directValue)
							->where('id = ' . $entity[$entKey][$relationReps[$relKey]][(new $directValue)->idProperty])
							->fetchArray();

						$entity[$entKey][$relationReps[$relKey]][$directValue] = (count($arry) > 0 ? $arry[0] : $arry);
					} catch(Exception $e) {
						util::var_dump('Tabela: ' . $directValue . ' - Mensagem: ' . $e->getMessage());
						die();
					}				
				}
			}
		}

		// Para cada registro encontrado busca por entidades relacionadas e a inclui no objeto retornado
		foreach ($entity as $record) {
			
			$registry = $record;
		
			// Verifica se existem na configurações do objeto o parametro que força o carregamento de objetos agregados
			// caso haja, busca todas a referencias e agrega ao objeto como metodo padrão.
			if(count($this->table->hasMany) > 0){
				foreach ($this->table->hasMany as $hasEntity) {


					$registry[$hasEntity] = Doctrine_Query::create()
						->from($hasEntity)
						->where($this->table->idProperty . ' = ?', $record['id'])
						->execute(array(), Doctrine::HYDRATE_ARRAY);

					// para cada registro, carrega seus seguintes
					foreach ($registry[$hasEntity] as $subKey => $subValue) {

						// recupera todas as relações da tabela
						foreach ( (new $hasEntity)->getTable()->getRelations() as $cu) {

							// busca o nome da entidade relacionada
							$subEntity = $cu->getTable()->getComponentName();
							$idProp = (property_exists((new $subEntity), 'idProperty') ? (new $subEntity)->idProperty : false);

							// caso possua ID e seja UM PARA MUITOS, FAZ ...
							if($idProp && $cu->getType() == 1){
								//if($subEntity != $this->table->getTable()->getComponentName())
								$registry[$hasEntity][$subKey][$subEntity] = Doctrine_Query::create()
									->from($subEntity)
									->where((new $hasEntity)->idProperty . ' = ?', $registry[$hasEntity][$subKey]['id'])
									->execute(array(), Doctrine::HYDRATE_ARRAY);
							} else {

									// executa busca das entidades diretamente associadas 
									// DESCE MAIS UM NIVEL
									$registry[$hasEntity][$subKey][$subEntity] = Doctrine_Query::create()
										->from($subEntity)
										->where('id = ?', $registry[$hasEntity][$subKey][(new $subEntity)->idProperty])
										->fetchArray()[0];

									foreach ( $registry[$hasEntity][$subKey][$subEntity] as $sKey => $sValue) {

										foreach ((new $subEntity)->getTable()->getRelations() as $sKkKey => $sVvValue) {
											if($sVvValue->getType() == 0){

												$subSub = $sVvValue->getTable()->getComponentName();
												$rootEntity = $registry[$hasEntity][$subKey][$subEntity];

												$registry[$hasEntity][$subKey][$subEntity][ $sVvValue->getTable()->getComponentName() ] = Doctrine_Query::create()
													->from($sVvValue->getTable()->getComponentName())
													->where( 'id = ' . $rootEntity[(new $subSub)->idProperty])
													->fetchArray()[0];
											}

										}
									}

							}
						}

					}

				}
			}
			
			$store[] = $registry;
			
		}
		
		return ($one ? $store[0] : $store);
		
	}
	
	/**
	 * Metodo responsavel por recuperar todos os registros
	*/
	public function findAll($params = null, $start = null, $limit = null) {
		
		// Gera um alias para a tabela principal para fazer os joins locais
		$randomAlias = ' ' . chr(64+rand(0,26));
		
		// repositorio de relacionamentos
		$relationReps = array();
		
		$entity = Doctrine_Query::create()
			      ->from($this->table->getTable()->getComponentName() . $randomAlias);

		if($params)
			$this->mountQuery($entity, $params);

		// Verifica se a tabela tem relacionamentos diretos, LOCAIS
		// Isto faz com que todo relacionamento direto, ou seja id_tablea, sempre esteja presente como um objeto
		if($this->table->getTable()->getRelations()){
			
			// E verifica se possui pelo atributo Type que tem que ser igual a ZERO 0
			// iterando todos os itens do array de relacionamentos
			foreach ($this->table->getTable()->getRelations()  as $relation) {
				if($relation->getType() == 0) {
					$relationReps[] = $relation->getClass();
					$entity->innerJoin($randomAlias.'.'.$relation->getClass());
				}
			}
		}

		if($start && $limit){
			$entity->offset($start)->limit($limit);
		}
		$entity = $entity->execute(array(), Doctrine::HYDRATE_ARRAY);

		$store = array();
		
		// Gera um alias para a tabela principal para fazer os joins locais
		$randomAlias = ' ' . chr(64+rand(0,26));

		// FOREACH reponsavel por carregar o componente diretamente atrelado
		foreach ($entity as $entKey => $entValue) {
			foreach ($relationReps as $relKey => $relValue) {

				$directEntity = $relationReps[$relKey];
				$directEntity = new $directEntity;

				foreach ($directEntity->hasOne as $dirctKey => $directValue) {
					try {
						$arry =  Doctrine_Query::create()
							->from($directValue)
							->where('id = ' . $entity[$entKey][$relationReps[$relKey]][(new $directValue)->idProperty])
							->fetchArray();

						$entity[$entKey][$relationReps[$relKey]][$directValue] = (count($arry) > 0 ? $arry[0] : $arry);
					} catch(Exception $e) {
						util::var_dump('Tabela: ' . $directValue . ' - Mensagem: ' . $e->getMessage());
						die();
					}				
				}
			}
		}

		// Para cada registro encontrado busca por entidades relacionadas e a inclui no objeto retornado
		foreach ($entity as $record) {
			
			$registry = $record;
		
			// Verifica se existem na configurações do objeto o parametro que força o carregamento de objetos agregados
			// caso haja, busca todas a referencias e agrega ao objeto como metodo padrão.
			if(count($this->table->hasMany) > 0){
				foreach ($this->table->hasMany as $hasEntity) {


					$registry[$hasEntity] = Doctrine_Query::create()
						->from($hasEntity)
						->where($this->table->idProperty . ' = ?', $record['id'])
						->execute(array(), Doctrine::HYDRATE_ARRAY);

					// para cada registro, carrega seus seguintes
					foreach ($registry[$hasEntity] as $subKey => $subValue) {

						// recupera todas as relações da tabela
						foreach ( (new $hasEntity)->getTable()->getRelations() as $cu) {

							// busca o nome da entidade relacionada
							$subEntity = $cu->getTable()->getComponentName();
							$idProp = (property_exists((new $subEntity), 'idProperty') ? (new $subEntity)->idProperty : false);

							// caso possua ID e seja UM PARA MUITOS, FAZ ...
							if($idProp && $cu->getType() == 1){
								//if($subEntity != $this->table->getTable()->getComponentName())
								$registry[$hasEntity][$subKey][$subEntity] = Doctrine_Query::create()
									->from($subEntity)
									->where((new $hasEntity)->idProperty . ' = ?', $registry[$hasEntity][$subKey]['id'])
									->execute(array(), Doctrine::HYDRATE_ARRAY);
							} else {

									// executa busca das entidades diretamente associadas 
									// DESCE MAIS UM NIVEL
									$registry[$hasEntity][$subKey][$subEntity] = Doctrine_Query::create()
										->from($subEntity)
										->where('id = ?', $registry[$hasEntity][$subKey][(new $subEntity)->idProperty])
										->fetchArray()[0];

									foreach ( $registry[$hasEntity][$subKey][$subEntity] as $sKey => $sValue) {

										foreach ((new $subEntity)->getTable()->getRelations() as $sKkKey => $sVvValue) {
											// carrega somente as entidades de relacionamento 1 - 1
											if($sVvValue->getType() == 0){

												$subSub = $sVvValue->getTable()->getComponentName();
												$rootEntity = $registry[$hasEntity][$subKey][$subEntity];

												$registry[$hasEntity][$subKey][$subEntity][ $sVvValue->getTable()->getComponentName() ] = Doctrine_Query::create()
													->from($sVvValue->getTable()->getComponentName())
													->where( 'id = ' . $rootEntity[(new $subSub)->idProperty])
													->fetchArray()[0];
											}

										}
									}
							}
						}

					}

				}
			}
			
			$store[] = $registry;
			
		}
		
		return $store;
		
	}
	
	public function persist($post) {
		
		$component = $this->table->getTable()->getComponentName();
				  
		// check if it is an update action, and if so, grab the existent object from the database
		// to procede the update, the oposite is to create a new one
		// Doctrine::getTable($this->table->getTable()->getComponentName())->find($post['id'])
		$entity = (
			(array_key_exists('id', $post) && isset($post['id']) && $post['id'] != NULL) ? 
			Doctrine_Query::create()->update($this->table->getTable()->getComponentName()) :
			new $component
		);

		$update = ( (array_key_exists('id', $post) && isset($post['id']) && $post['id'] != NULL) ? true : false );
		
		$validacao =  new Validacao($post, $this->table->validationRule, '');
		$validacao = $validacao->executar();
		
		// Check if the params are valid
		if($validacao) {

			$return['success']	= false;
			$return['msg']		= 'Ocorreu um erro na gravação dos dados, verifique os campos em vermelho.';
			$return['errors']	= $validacao;

		} else {
			
			// Update
			if($update) {
				foreach ($post as $field => $value) {
					
					// verifica se o valor do campo no POST NÃO é um array
					// caso negativo, signifca que ele é um campo com valor teoricamente válido
					// e na sequancia verifica se é uma STRING e case seja, coloca aspas para fazer o insert
					if(!is_array($value)) {
						$entity->set(
							$field, 
							(isset($value) ? ( is_string($value) ? "'".$value."'" : $value ) : "''") 
						);
					} else {

						// verifica se o campo é uma array valido com elementos
						if(count($value) > 0 ) {
							// remove todos os registros para segurança da inserção
							$queryToDelete = Doctrine_Query::create()
								->delete($field)
								->where($this->table->idProperty . ' = ?', $post['id'])
								->execute();
							
							foreach ($value as $vKey => $vValue) {

								$nEntity = new $field;
								foreach ($vValue as $vvKey => $vvValue) {
									// verifica se a coluna vinda do POST, está entre os campos da tabela
									if($this->und->indexOf($this->und->keys( $nEntity->getTable()->getColumns() ), $vvKey) > 0 ) {
										$nEntity->{$vvKey} = (isset($vvValue) ? $vvValue : "''");
										$nEntity->{$this->table->idProperty} = $post['id'];
									}
								}
								// salva a entidade
								$nEntity->save();
								//toLog($params, $entity, $operation, $token = NULL )
								$this->toLog($nEntity->id, $nEntity, 'update');

							}
						}
					
					}
				}	
			}
			
			$return = array(
				'success' => false,
				'msg' => 'Erro ao savar.'
			);
			
			if( !$update ){

				$toSaveFirst = array();
				// Verifica se a tabela tem relacionamentos diretos, LOCAIS
				// Isto faz com que todo relacionamento direto, ou seja id_tablea, sempre esteja presente como um objeto
				if($this->table->getTable()->getRelations()){
					
					// E verifica se possui pelo atributo Type que tem que ser igual a ZERO 0
					// iterando todos os itens do array de relacionamentos
					foreach ($this->table->getTable()->getRelations()  as $relation) {
						if($relation->getType() == 1){

							$toSaveFirst[$relation->getClass()] = $post[$relation->getClass()];

							$index = array_search($relation->getClass(), $this->und->keys($post));
							array_splice($post, $index, $index);
						}
					}
				}

				// if(!$post['id'])
				// 	$post['id'] = rand(99999, 99999999);
				//util::var_dump($post);

				$entity->fromArray($post);
				$entity->save();

				// caso haja entidades postadas que sejam atreladas ao objeto mas não diretamente
				if(count($toSaveFirst)) foreach ($toSaveFirst as $key => $value) {
						if($value){
							foreach ($value as $kKey => $vValue) {


								// retira das subentidades valores que são arrays
								$index = 0;
								foreach ($vValue as $vZzkey => $zZzvalue) {
									if(is_array($zZzvalue))
										array_splice($vValue, $index, $index);
									$index++;
								}

								if(!array_key_exists($entity->idProperty, $vValue))
									$vValue[$entity->idProperty] = $entity->id;


								$nEntity = new $key;
								$nEntity->fromArray($vValue);
								$nEntity->save();
							}
						}

					};

				//toLog($params, $entity, $operation, $token = NULL )
				$this->toLog($entity->id, $entity, 'create');
				
				foreach ($post as $field => $value) {
					if(is_array($value) && count($value) > 0) {

						// remove todos os registros para segurança da inserção
						$queryToDelete = Doctrine_Query::create()
							->delete($field)
							->where($this->table->idProperty . ' = ?', $entity->id)
							->execute();
						
						foreach ($value as $vKey => $vValue) {

							$nEntity = new $field;
							foreach ($vValue as $vvKey => $vvValue) {
								// verifica se a coluna vinda do POST, está entre os campos da tabela
								if($this->und->indexOf($this->und->keys( $nEntity->getTable()->getColumns() ), $vvKey) > 0 ) {
									$nEntity->{$vvKey} = (isset($vvValue) ? $vvValue : '');
									$nEntity->{$this->table->idProperty} = $entity->id;
								}
							}
							// salva a entidade
							$nEntity->save();

							//toLog($params, $entity, $operation, $token = NULL )
							$this->toLog($nEntity->id, $nEntity, 'create');

						}
							
					}
				}
				
				if($entity->id){
					$return = array(
						'success' => true,
						'msg' => 'Registro salvo!!!'
					);
				}
				
			} else {
				
				// foreach ($post as $posKey => $postValue) {
				// 	if(!$postValue){
				// 		$post[$posKey] = '0.00';
				// 		util::var_dump($posKey . ': ' . $post[$posKey]);
				// 	}
				// 	//empty
				// 	// if($postValue) {
				// 	// 	util::var_dump( $post[$posKey] );
				// 	// 	util::var_dump( $postValue );
				// 	// }
				// }

				$entity->where("id = ?", $post['id']);

				$rows = $entity->execute();

				// Executa um select para o log
				$this->toLog($post['id'], 
					Doctrine_Query::create()
						->from($entity->getRootAlias())
						->where('id = ?', $post['id'])
						->fetchOne()
					, 'update');
				
				$return = array(
					'success' => true,
					'msg' => 'Registro salvo!!!'
				);

			}
			
		}
		
		return $return;
		
		//util::var_dump($post);
		// if ($entity->exists()) {
			
		// 	//verifica se o usuario pode realizar alteracoes no lancamento
			
		// 	if (!Autenticar::permissao('modificar', $this->table)) {
				
		// 		Util::extException('Voce nao tem permissao para modificar este lancamento e 
		// 			infelizmente nao posso deixar voce realizar esta operacao. Entre em 
		// 			contato com um supervisor e explique a situacao.'
		// 		);
				
		// 	}
			
		// 	$create = false;
			
		// 	if (array_key_exists('validado', $entity->toArray())) {
				
		// 		$conn = Doctrine_Manager::getInstance()->connection();
				
		// 		//verifica se lancamento ja foi validado
				
		// 		$query = '
		// 			SELECT
		// 				validado
		// 			FROM
		// 				' . $entity->getTable()->getTableName() . '
		// 			WHERE
		// 				id = ' . $entity->id . '
		// 		';
				
		// 		if ($validado = $conn->fetchOne($query)) {
					
		// 			Util::extException('Este lan�amento foi bloqueado e infelizmente n�o posso 
		// 				deixar voc� realizar esta opera��o. Entre em contato com um supervisor 
		// 				e explique a situa��o.'
		// 			);
					
		// 		}
				
		// 	}
	        
		// } else {
			
		// 	//verifica se o usu�rio pode criar um novo lan�amento
			
		// 	if (!Autenticar::permissao('criar', $this->table)) {
				
		// 		Util::extException('Voc� n�o tem permiss�o para criar este lan�amento e 
		// 			infelizmente n�o posso deixar voc� realizar esta opera��o. 
		// 			Entre em contato com um supervisor e explique a situa��o.'
		// 		);
				
		// 	}
			
		// 	$create = true;
			
		// }
		
		// $this->fromArray($entity, $post);
		
		// $errors = array();
		
		// if (method_exists($entity,'validationRule')) {
		    
		//     $entity->validationRule($post);
			
        // }
		
		// Util::validacao($entity->toArray(), $entity->validationRule, $errors);
		
		// foreach ($entity->hasOne as $children) {
			
		// 	Util::validacao($entity->{$children}->toArray(), $entity->{$children}->validationRule, $errors);
			
		// }
		
		// if (count($errors) == 0) {
			
		// 	if (method_exists($entity,'extraValidation')) {
			    
		// 	    $entity->extraValidation($post);
				
        //     }
			
		// 	if (array_key_exists('id_usuario', $entity->toArray()) && $this->table != 'Usuario') {
				
		// 		$entity->id_usuario = $_SESSION['usuario']['id'];
				
		// 	}
			
		// 	$entity->save();
			
		// 	$log = new UsuarioLog();
			
		// 	$log->set('id_entidade', $entity->id);
		// 	$log->set('id_usuario', $_SESSION['usuario']['id']);
		// 	$log->set('entidade', $this->table);
		// 	$log->set('operacao', $create ? 'criar' : 'modificar');
		// 	$log->set('historico', json_encode( $entity->toArray() ));
		// 	$log->set('dt_hr_operacao', date('Y-m-d H:i:s'));
			
		// 	$log->save();
			
		// 	$log->free();
			
		// 	if ($this->table == 'Pesagem' && $post['hash_usuario'] != '') {
				
		// 		$conn = Doctrine_Manager::getInstance()->connection();
				
		// 		$log = new UsuarioLog();
				
		// 		$query = "SELECT id FROM usuario WHERE email = '" . $post['hash_usuario'] . "';";
				
		// 		$id_usuario = $conn->fetchOne($query);
				
		// 		$log->set('id_entidade', $entity->id);
		// 		$log->set('id_usuario', $id_usuario);
		// 		$log->set('entidade', $this->table);
		// 		$log->set('operacao', 'hash');
		// 		$log->set('historico', json_encode( $entity->toArray() ));
		// 		$log->set('dt_hr_operacao', date('Y-m-d H:i:s'));
				
		// 		$log->save();
				
		// 		$log->free();
				
		// 	}
			
        //     if (property_exists($entity->getTable()->getComponentName(), 'hasMany')) {
                
    	// 		foreach ($entity->hasMany as $children) {
    				
    	// 			$this->persistDelete($entity, $children, $post[$children]);
    				
    	// 		}
    			
        //     }
            
		// 	if (method_exists($entity, 'persist_callback')) {
				
		// 		$entity->persist_callback();
				
		// 	}
			
		// 	$entity->free();
			
		// 	$result['success'] = true;
			
		// } else {
			
		// 	Util::extException('Para saber mais, passe o mouse sobre os campos em vermelho.', $errors);
			
		// }
		
		// return $result;
		
	}
	
	public function deltree($params) {
		
		$token = date_timestamp_get(date_create());
		
		// if (!Autenticar::permissao('excluir', $this->table)) {
			
		// 	 Util::extException('Voc� n�o tem permiss�o para excluir este lan�amento
		// 		e infelizmente n�o posso deixar voc� realizar esta opera��o. 
		// 		Entre em contato com um supervisor e explique a situa��o.'
		// 	);
			
		// }
		
		$params = (is_array($params) ? $this->und->values($this->und->first($params))[0] : $params );
		
		if ($entity = $this->find($params, true)) {
			
			// if (array_key_exists('validado', $entity->toArray())) {
				
			// 	if ($entity->validado) {
			// 		Util::extException('Este lan�amento j� foi validado. N�o � poss�vel realizar altera��es ou exclu�-lo.');
			// 	}
				
			// }
			
			$log = new Log();
			
			$log->set('id_entidade', $params);
			$log->set('id_usuario',1);
			$log->set('entidade', $entity->getTable()->getComponentName());
			$log->set('operacao', 'excluir');
			$log->set('historico', json_encode( $entity->getData() ));
			$log->set('dt_operacao', date('Y-m-d'));
			$log->set('hr_operacao', date('H:i:s'));
			$log->set('token', $token);
			
			$log->save();
			
			$log->free();
			
			if($entity->hasMany){
				foreach ($entity->hasMany as $toDelete) {
					
					$subEntity = Doctrine_Query::create()
						->from($toDelete)
						->where($entity->idProperty . ' = ?', $params)
						->execute(array(), Doctrine::HYDRATE_ARRAY);
					
					$log = new Log();
					
					$log->set('id_entidade', $params);
					$log->set('id_usuario',1);
					$log->set('entidade', $toDelete);
					$log->set('operacao', 'excluir');
					$log->set('historico', json_encode( $subEntity ));
					$log->set('dt_operacao', date('Y-m-d'));
					$log->set('hr_operacao', date('H:i:s'));
					$log->set('token', $token);
					
					$log->save();
					
					$log->free();
					
					$queryToDelete = Doctrine_Query::create()
						->delete($toDelete)
						->where($entity->idProperty . ' = ?', $params)
						->execute();
					
				}
			}
			
			$query = Doctrine_Query::create()
					->delete($entity->getTable()->getComponentName())
					->where('id = ?', $params)
					->execute();

			$result['success'] = true;
			
		} else {
			
			Util::extException('Nenhum registro a ser excluido com o c�digo informado foi a encontrado.');
			
		}
		
		return $result;
		
	}
	
	public function toLog($params, $entity, $operation, $token = NULL ){

		if(!$token)
			$token = date_timestamp_get(date_create());

			$log = new Log();
			
			$log->set('id_entidade', $params);
			$log->set('id_usuario',1);

			if(method_exists($entity, 'getTable')) {
				$log->set('entidade', $entity->getTable()->getComponentName());
			} else {
				$log->set('entidade', $entity->getRootAlias());
			}

			$log->set('operacao', $operation);

			if(method_exists($entity, 'getData')) {
				//$log->set('historico', $entity->getData());
				$log->set('historico', json_encode( $entity->getData() ));
			} else {
				//$log->set('historico', $entity->getTable()->getComponentName());
				$log->set('historico', $entity->getSql() );
			}

			$log->set('dt_operacao', date('Y-m-d'));
			$log->set('hr_operacao', date('H:i:s'));
			$log->set('token', $token);
			
			$log->save();
			
			$log->free();

			return true;
	}

	public function mountQuery($entity, $params, &$prefix = '')
	{
		
		if (count($params) > 0 && is_array($params)) {
			
			$firstTime = true;
			$array = array('IS NOT NULL', 'IS NULL');
			$pagination = array('start', 'limit');
			
			foreach ($params as $index) {
				
				$index['value'] = !function_exists(
					$index['value']) ? 
					$index['value'] : 
					call_user_func($index['value']);
				
				if ( ! in_array($index['field'], $pagination)) {
					
					if ($firstTime) {
						
						if ( ! in_array($index['value'], $array)) {
							if (substr($index['value'], 0, 2)=='IN') {
								$entity->where($prefix . $index['field'] . ' ' .$index['value']);
							} else if(substr($index['value'], 0, 6)=='NOT IN'){
								$entity->where($prefix . $index['field'] . ' ' .$index['value']);
							} else {
								$entity->where($prefix . $index['field'] . ' = ?', $index['value']);
							}
						} else {
							$entity->where($prefix . $index['field'] . ' ' .$index['value']);					
						}
						
						$firstTime = false;
						
					} else {
						
						if ( ! in_array($index['value'], $array)) {
							$entity->andWhere($prefix . $index['field'] . ' = ?', $index['value']);
						} else {
							$entity->andWhere($prefix . $index['field'] . ' ' .$index['value']);					
						}
						
					}
					
				}
				
			}
			
		}
		
	}
	
}
