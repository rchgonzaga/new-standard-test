<?php
    
	class Validacao{
		
		private $campos    = array();
		private $regras    = array();
		private $msg       = array();
		private $resultado = array();
		private $prefixo   = '';
		
		function __construct($campos = array(), $regras = array(), $prefixo){
			
			$this->campos  = $campos;
			$this->regras  = $regras;
			$this->prefixo = $prefixo;
			
			$this->msg['requerido']			= utf8_decode('O preenchimento do campo é obrigatório');
			$this->msg['tamanho_max']		= utf8_decode('O campo não pode ter mais que %d caracteres');
			$this->msg['tamanho_min']		= utf8_decode('O campo não pode ter menos que %d caracteres');
			$this->msg['decimal']			= utf8_decode('O campo deve conter um número decimal com no máximo %d digitos antes da "," e precisão de no máximo %s casas decimais');
			$this->msg['email']				= utf8_decode('O e-mail informado parece ser inválido');
			$this->msg['inteiro']			= utf8_decode('O campo deve conter apenas números');
			$this->msg['numerico']			= utf8_decode('O campo deve conter apenas números');
			$this->msg['maior_zero']		= utf8_decode('O campo deve conter um número maior que zero');
			$this->msg['data']				= utf8_decode('A data parece inválida, utilize o formato dd/mm/aaaa');
			$this->msg['data_futura']		= utf8_decode('A data não pode ser maior que a data de atual "' . date('d/m/Y') .'"');
			$this->msg['maior_igual_zero']	= utf8_decode('O campo deve conter um número igual ou maior que zero');
			$this->msg['ncm']				= utf8_decode('O NCM informado parece ser inválido');
			$this->msg['ex_tipi']			= utf8_decode('O EX TIPI informado parece ser inválido');
			$this->msg['ip']				= utf8_decode('O campo deve conter um endereço de IP válido');
			$this->msg['cnpj']				= utf8_decode('O CNPJ informado parece ser inválido');
			$this->msg['cpf']				= utf8_decode('O CPF informado parece ser inválido');
			$this->msg['cnpj_cpf']			= utf8_decode('O CNPJ ou CPF informado parece ser inválido');
			$this->msg['placa']				= utf8_decode('A Placa informada parece ser inválida, utilize o formato TTT0000');
			$this->msg['chave_acesso']		= utf8_decode('A Chave de Acesso informada parece ser inválida');
			$this->msg['cod_barra']			= utf8_decode('O Código de Barras informado parece ser inválido');
			$this->msg['cod_barra_titulo']	= utf8_decode('O Código de Barras informado parece ser inválido');
			$this->msg['nome']				= utf8_decode('O nome informador não parece um nome válido');
			$this->msg['igual']				= utf8_decode('O nome informador não parece um nome válido');
			
		}
		
		function executar(){
			
			foreach ($this->campos as $chave => $valor){
				
				// executa a regra caso a chave exista nas lista de campos vindos do modelo
				if(array_key_exists($chave,$this->regras)){

					$regras = explode(' ', $this->regras[$chave]);
					
					// o campo é obrigatório? Se não e se o campo for vazio não a motivo para seguir em frente
					if ( ! in_array('requerido', $regras, TRUE)){
						if ( @mb_strlen($this->campos[$chave]) == 0 || @is_array($this->campos[$chave])){
							continue;
						}
						
					}
					
					foreach ($regras as $regra){
						
						// separa os parametros (se existir) da regra
						// as regras podem ter parametros como: tamanho_max[5]
						$parametro = FALSE;
						if (preg_match("/(.*?)\[(.*?)\]/", $regra, $match)){
							$regra     = $match[1];
							$parametro = $match[2];
						}
						
						// verifica se o metodo de validação existe na classe
						if (method_exists($this, $regra)){
							
							if(!$this->$regra($this->campos[$chave], $parametro)){
								
								$chave_aux = $this->prefixo . $chave;
								$this->resultado[$chave_aux] = utf8_encode(vsprintf($this->msg[$regra], explode(',', $parametro)));
								continue 2;
								
							}
							
						}
						
					}
				}
				
			}
			
			return $this->resultado;
		
		}
		
		/**
		 * Requerido
		 *
		 * @access	public
		 * @param	string
		 * @return	bool
		 */
		function requerido($str){

			if(is_array($str)){
				$str = $str['id'];
			}

			return (trim($str) == '') ? FALSE : TRUE;

		}
		
		/**
		 * Tamanho Max
		 *
		 * @access	public
		 * @param	string
		 * @param	value
		 * @return	bool
		 */	
		 
		function tamanho_max($str, $val)
		{
			
			return (mb_strlen($str) > $val) ? FALSE : TRUE;	
			
		}
		
		/**
		 * Tamanho Min
		 *
		 * @access	public
		 * @param	string
		 * @param	value
		 * @return	bool
		 */	
		 
		function tamanho_min($str, $val)
		{
			
			return (mb_strlen($str) < $val) ? FALSE : TRUE;	
			
		}
		
		/**
		 * Email
		 *
		 * @access	public
		 * @param	string
		 * @return	bool
		 */	
		function email($str){
			
			$str = explode(';', $str);

			foreach ($str as $key => $value) {
				if ( ! preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", trim($value))) {
						return FALSE;
				}
			}
			
			return TRUE;
			
		}

		
		/**
		 * Nome
		 *
		 * @access	public
		 * @param	string
		 * @return	bool
		 */	
		function nome($name) {
		      $name = preg_replace('/[\s]+/is', ' ', $name);
		      $name = trim($name);
		      if(!preg_match('/^([a-zA-Z]+[\'-]?[a-zA-Z]+[ ]?)+$/', $name)) {
		      	return FALSE;
		      }

		      return TRUE;
		}
		
		/**
		 * Numeric
		 *
		 * @access	public
		 * @param	string
		 * @return	bool
		 */	
		function numerico($str){
			
			if(is_array($str)){
				$str = $str['id'];
			}

			return (bool)preg_match('/^[\-+]?[0-9]*\.?[0-9]+$/', $str);
		}
		
		/**
		 * Integer
		 *
		 * @access	public
		 * @param	string
		 * @return	bool
		 */	
		function inteiro($str){
			return (bool)preg_match('/^[\-+]?[0-9]+$/', $str);
		}
		
		function maior_zero($str){
			return ($str <= 0) ? FALSE : TRUE;
		}
		
		function maior_igual_zero($str){
			return ($str < 0) ? FALSE : TRUE;
		}
		
		function data($str){
			
			return (bool) date_create($str);
			
		}
		
		function data_futura($str){
			
			$data_str = date_create($str);
			
			return date_format($data_str, 'Y-m-d') > date('Y-m-d') ? FALSE : TRUE;
			
		}
		
		function placa($str){
			return (bool) preg_match('/^([A-Z]{2,3}[0-9]{4}|[A-Z]{3,4}[0-9]{3})$/', $str);
		}
		
		function ip($str){
			return (bool) preg_match('/^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:[.](?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/', $str);
		}
		
		function decimal($str, $val){
			
			$val = explode(',', $val);
			
			$str = explode('.', $str);
			
			if (function_exists('mb_strlen')){
				return (mb_strlen($str[0]) > $val[0]) || (mb_strlen($str[1]) > $val[1]) ? FALSE : TRUE;		
			}
			
			return (strlen($str[0]) > $val[0]) || (strlen($str[1]) > $val[1]) ? FALSE : TRUE;	
			
		}
		
		function ncm($str){
			
			if ($str === '') return TRUE;
			
			if ($str === '00') return TRUE;
			
			if ($str === '00000000') return TRUE;
			
			$conn = Doctrine_Manager::getInstance()->connection();
			
			$query = "
				SELECT
					DISTINCT ncm
				FROM
					ncm
				WHERE
					ncm = '" . $str . "'
			;";
			
			return (bool) $conn->fetchOne($query);
			
		}
		
		function ex_tipi($str){
			
			if ($str === '') return TRUE;
			
			$conn = Doctrine_Manager::getInstance()->connection();
			
			$query = "
				SELECT
					DISTINCT ex_tipi
				FROM
					ncm
				WHERE
					ex_tipi = '" . $str . "'
			;";
			
			return (bool) $conn->fetchOne($query);
			
		}
		
		function cnpj($str){
			
			if ($str == 'EXTERIOR') { return TRUE; }
			
			$str = str_replace(array('.', '/', '-'), '', $str);
			
			//calcula primeiro digito do cnpj
			$cnpj = substr($str, 0, 12);
			
			$array_cnpj = str_split($cnpj);
			
			$array_multiplicador = array(5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
			
			$valor_cnpj = 0;
			
			for($i=1; $i<=count($array_cnpj); $i++){
				$valor_cnpj += $array_cnpj[$i-1] * $array_multiplicador[$i-1];
			}
			
			$digito = ($valor_cnpj % 11) >= 2 ? 11 - ($valor_cnpj % 11) : 0;
			
			//calcula segundo digito do cnpj
			$cnpj = substr($str, 0, 12) . $digito;
			
			$array_cnpj = str_split($cnpj);
			
			$array_multiplicador = array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
			
			$valor_cnpj = 0;
			
			for($i=1; $i<=count($array_cnpj); $i++){
				$valor_cnpj += $array_cnpj[$i-1] * $array_multiplicador[$i-1];
			}
			
			$digito = ($valor_cnpj % 11) >= 2 ? 11 - ($valor_cnpj % 11) : 0;
			
			$cnpj .= $digito;
			
			return $str == $cnpj? true : false;
			
		}
		
		function cpf($str){
			
			$str = str_replace(array('.', '/', '-'), '', $str);
			
			//calcula primeiro digito do cpf
			$cpf = substr($str, 0, 9);
			
			$array_cpf = str_split($cpf);
			
			$array_multiplicador = array(1, 2, 3, 4, 5, 6, 7, 8, 9);
			
			$valor_cpf = 0;
			
			for($i=1; $i<=count($array_cpf); $i++){
				$valor_cpf += $array_cpf[$i-1] * $array_multiplicador[$i-1];
			}
			
			$digito = ($valor_cpf % 11) <= 9 ? ($valor_cpf % 11) : 0;
			
			//calcula segundo digito do cpf
			$cpf = substr($str, 0, 9) . $digito;
			
			$array_cpf = str_split($cpf);
			
			$array_multiplicador = array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
			
			$valor_cpf = 0;
			
			for($i=1; $i<=count($array_cpf); $i++){
				$valor_cpf += $array_cpf[$i-1] * $array_multiplicador[$i-1];
			}
			
			$digito = ($valor_cpf % 11) <= 9 ? ($valor_cpf % 11) : 0;
			
			$cpf .= $digito;
			
			return $str == $cpf? true : false;
			
		}
		
		function cnpj_cpf($str){
			
			if((!self::cnpj($str)) && (!self::cpf($str))){
				
				return false;
				
			}
			
			return true;
			
		}
		
		function chave_acesso($str){
			
			$str_chave = substr($str, 0, -1);
			
			$array_chave = str_split($str_chave);
			
			$array_multiplicador = array(
									   4,3,2,           //43
									   9,8,7,6,5,4,3,2, //40
									   9,8,7,6,5,4,3,2, //32
									   9,8,7,6,5,4,3,2, //24
									   9,8,7,6,5,4,3,2, //16
								   	   9,8,7,6,5,4,3,2  //8
								   );
			
			for($i=1; $i<=count($array_multiplicador); $i++){
				$array_resultado[$i-1] = $array_chave[$i-1] * $array_multiplicador[$i-1];
			}
			
			$valor_chave = 0;
			
			for($i=1; $i<=count($array_resultado); $i++){
				$valor_chave += $array_resultado[$i-1];
			}
			
			$dv = 11 - ($valor_chave % 11);
			
			$str_chave .= $dv <= 9 ? $dv : 0;
			
			return $str == $str_chave? true : false;
			
		}
		
		function cod_barra($str){
				
			$concessionaria = 0;  // 0 = bloquetos de cobranças // 1 = concessionárias (ex: cpfl)
		  
		    $str = str_replace(array('.', '/', '-'), '', $str);
			
				$cod_barra = 0;
			
			$verifica_concesionaria = substr($str, 0, 1);
			
			if ($verifica_concesionaria == 8){ $concessionaria = 1;} 

			$cod_barra_ini = substr($str, 0, 48);
			
			$array_cod_barra = str_split($cod_barra_ini);
			
			$tamanho_str = count($array_cod_barra);

			//=============================================================================

			If ($concessionaria == 1 && $tamanho_str == 44){ // POR LEITOR DE CÓDIGO DE BARRA - TAMANHO 44 - CONCESSIONÁRIA
				
				$cod_barra = substr($str, 0, 3) . substr($str, 4, 40) ;
				
				$array_cod_barra = str_split($cod_barra);
				
				$array_multiplicador = array(2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2);
			
				$valor_cod_barra = 0;
				
				for($i=1; $i<=43; $i++){
					$valor_cod_barra .= $array_cod_barra[$i-1] * $array_multiplicador[$i-1];
				}
				
				
				$array_valor_cod_barra = str_split($valor_cod_barra);
				$tamanho_array_valor_cod_barra = count($array_valor_cod_barra);
				
				
				for($i=1; $i<=$tamanho_array_valor_cod_barra; $i++){
					$soma_valor_cod_barra += $array_valor_cod_barra[$i-1] ;
				}
				
				$digito = ($soma_valor_cod_barra % 10) != 10 ?  10 - ($soma_valor_cod_barra % 10) : 0;

			    $cod_barra = substr($str, 0, 3) . $digito .  substr($str, 4, 40) ;
					
			}
			//=============================================================================
			
			If ($concessionaria == 1 && $tamanho_str == 48){ // POR DIGITAÇÃO MANUAL DE CÓDIGO DE BARRA - TAMANHO 48 - CONCESSIONÁRIA
				
				$campo1 = substr($str, 0, 11);
			
			    $campo2 = substr($str, 12, 11);
				
				$campo3 = substr($str, 24, 11);
			
			    $campo4 = substr($str, 36, 11);
				
				$array_multiplicador = array(2,1,2,1,2,1,2,1,2,1,2);
				
				$array_campo1 = str_split($campo1);
				$array_campo2 = str_split($campo2);
				$array_campo3 = str_split($campo3);
				$array_campo4 = str_split($campo4);
			
				$valor_cod_barra = 0;
				
				for($i=1; $i<=11; $i++){
					$valor_campo1 .= $array_campo1[$i-1] * $array_multiplicador[$i-1];
					$valor_campo2 .= $array_campo2[$i-1] * $array_multiplicador[$i-1];
					$valor_campo3 .= $array_campo3[$i-1] * $array_multiplicador[$i-1];
					$valor_campo4 .= $array_campo4[$i-1] * $array_multiplicador[$i-1];
				}
				//=== digito1 
				$array_valor_campo1 = str_split($valor_campo1);
				$tamanho_array_valor_campo1 = count($array_valor_campo1);

				for($i=1; $i<=$tamanho_array_valor_campo1; $i++){
					$soma_valor_campo1 += $array_valor_campo1[$i-1] ;
				}

				$digito1 = ($soma_valor_campo1 % 10) != 10 && ($soma_valor_campo1 % 10)?  10 - ($soma_valor_campo1 % 10) : 0;
				
				//=== digito2 
				$array_valor_campo2 = str_split($valor_campo2);
				$tamanho_array_valor_campo2 = count($array_valor_campo2);

				for($i=1; $i<=$tamanho_array_valor_campo2; $i++){
					$soma_valor_campo2 += $array_valor_campo2[$i-1] ;
				}

				$digito2 = ($soma_valor_campo2 % 10) != 10 && ($soma_valor_campo2 % 10) != 0?  10 - ($soma_valor_campo2 % 10) : 0;
				
				//=== digito3 
				$array_valor_campo3 = str_split($valor_campo3);
				$tamanho_array_valor_campo3 = count($array_valor_campo3);

				for($i=1; $i<=$tamanho_array_valor_campo3; $i++){
					$soma_valor_campo3 += $array_valor_campo3[$i-1] ;
				}

				$digito3 = ($soma_valor_campo3 % 10) != 10 && ($soma_valor_campo3 % 10) != 0 ?  10 - ($soma_valor_campo3 % 10) : 0;
				
				
				//=== digito4 
				$array_valor_campo4 = str_split($valor_campo4);
				$tamanho_array_valor_campo4 = count($array_valor_campo4);

				for($i=1; $i<=$tamanho_array_valor_campo4; $i++){
					$soma_valor_campo4 += $array_valor_campo4[$i-1] ;
				}

				$digito4 = ($soma_valor_campo4 % 10) != 10 && ($soma_valor_campo4 % 10) ?  10 - ($soma_valor_campo4 % 10) : 0;

				$cod_barra = $campo1 . $digito1 . $campo2 . $digito2 . $campo3 . $digito3 . $campo4 . $digito4 ;	

			}



			If ($concessionaria == 0 && $tamanho_str == 44){ // POR LEITOR DE CÓDIGO DE BARRA - TAMANHO 44 - BOLETOS
				
				$cod_barra = substr($str, 0, 4) . substr($str, 5, 39) ;
			
			    $valor_apagar = substr($str, 9, 8) . '.' . substr($str, 17, 2);
				
				$valor_apagar = Util::decimal_br($valor_apagar,2);

				$array_cod_barra = str_split($cod_barra);
				
			    $array_multiplicador = array(4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2);
				
				$valor_cod_barra = 0;
				
				for($i=1; $i<=count($array_cod_barra); $i++){
					$valor_cod_barra += $array_cod_barra[$i-1] * $array_multiplicador[$i-1];
				}
				
				$digito = ($valor_cod_barra % 11) != 10 ?  11 - ($valor_cod_barra % 11) : 0;
				
				if ((11 - ($valor_cod_barra % 11)) == 0 || (11 - ($valor_cod_barra % 11)) == 1 || (11 - ($valor_cod_barra % 11)) == 10 || (11 - ($valor_cod_barra % 11)) == 11){
					
				$digito = 1;	
				
				}else{
				
				$digito = (11 - ($valor_cod_barra % 11));
		
				}
				
				if ($_POST['valor_apagar'] == $valor_apagar){
				
				    $cod_barra = substr($str, 0, 4) . $digito .  substr($str, 5, 39) ;
				
				}else{
					
					$cod_barra = 0;
					
				}
					
			}
			//=============================================================================
			
			If ($concessionaria == 0 && $tamanho_str == 47){ // POR DIGITAÇÃO MANUAL DE CÓDIGO DE BARRA - TAMANHO 47 - boleto
				
				$campo1 = substr($str, 0, 9);
			
			    $campo2 = substr($str, 10, 10);
				
				$campo3 = substr($str, 21, 10);
			
			    $campo4 = substr($str, 32, 1);
				
				$campo5 = substr($str, 33, 14);
				
				$valor_apagar = substr($str, 37, 8) . '.' . substr($str, 45, 2);
				
				$valor_apagar = Util::decimal_br($valor_apagar,2);

				$array_multiplicador1 = array(2,1,2,1,2,1,2,1,2);
				$array_multiplicador2 = array(1,2,1,2,1,2,1,2,1,2);
				$array_multiplicador3 = array(1,2,1,2,1,2,1,2,1,2);
				
				$array_campo1 = str_split($campo1);
				$array_campo2 = str_split($campo2);
				$array_campo3 = str_split($campo3);
				$array_campo4 = str_split($campo4);
			
				$valor_cod_barra = 0;
				
				for($i=1; $i<=11; $i++){
					$valor_campo1 .= $array_campo1[$i-1] * $array_multiplicador1[$i-1];
					$valor_campo2 .= $array_campo2[$i-1] * $array_multiplicador2[$i-1];
					$valor_campo3 .= $array_campo3[$i-1] * $array_multiplicador3[$i-1];
				
				}
				//=== digito1 
				$array_valor_campo1 = str_split($valor_campo1);
				$tamanho_array_valor_campo1 = count($array_valor_campo1);

				for($i=1; $i<=$tamanho_array_valor_campo1; $i++){
					$soma_valor_campo1 += $array_valor_campo1[$i-1] ;
				}

				$digito1 = ($soma_valor_campo1 % 10) != 10 && ($soma_valor_campo1 % 10)?  10 - ($soma_valor_campo1 % 10) : 0;
					
				//=== digito2 
				$array_valor_campo2 = str_split($valor_campo2);
				$tamanho_array_valor_campo2 = count($array_valor_campo2);

				for($i=1; $i<=$tamanho_array_valor_campo2; $i++){
					$soma_valor_campo2 += $array_valor_campo2[$i-1] ;
				}

				$digito2 = ($soma_valor_campo2 % 10) != 10 && ($soma_valor_campo2 % 10) != 0?  10 - ($soma_valor_campo2 % 10) : 0;
				
				//=== digito3 
				$array_valor_campo3 = str_split($valor_campo3);
				$tamanho_array_valor_campo3 = count($array_valor_campo3);

				for($i=1; $i<=$tamanho_array_valor_campo3; $i++){
					$soma_valor_campo3 += $array_valor_campo3[$i-1] ;
				}

				$digito3 = ($soma_valor_campo3 % 10) != 10 && ($soma_valor_campo3 % 10) != 0 ?  10 - ($soma_valor_campo3 % 10) : 0;


                
				if ($_POST['valor_apagar'] == $valor_apagar){

				$cod_barra = $campo1 . $digito1 . $campo2 . $digito2 . $campo3 . $digito3 . $campo4 . $campo5 ;	
						
				}else{

				$cod_barra = 0;	
		
				}
		
			}
			
			return $str == $cod_barra? true : false;
			
		}
//=================================================================================================

	function cod_barra_titulo($str){
				
			$concessionaria = 0;  // 0 = bloquetos de cobranças // 1 = concessionárias (ex: cpfl)
		  
		    $str = str_replace(array('.', '/', '-'), '', $str);
			
				$cod_barra = 0;
			
			$verifica_concesionaria = substr($str, 0, 1);
			
			if ($verifica_concesionaria == 8){ $concessionaria = 1;} 

			$cod_barra_ini = substr($str, 0, 48);
			
			$array_cod_barra = str_split($cod_barra_ini);
			
			$tamanho_str = count($array_cod_barra);

			//=============================================================================

			If ($concessionaria == 1 && $tamanho_str == 44){ // POR LEITOR DE CÓDIGO DE BARRA - TAMANHO 44 - CONCESSIONÁRIA
				
				$cod_barra = substr($str, 0, 3) . substr($str, 4, 40) ;
				
				$array_cod_barra = str_split($cod_barra);
				
				$array_multiplicador = array(2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2);
			
				$valor_cod_barra = 0;
				
				for($i=1; $i<=43; $i++){
					$valor_cod_barra .= $array_cod_barra[$i-1] * $array_multiplicador[$i-1];
				}
				
				
				$array_valor_cod_barra = str_split($valor_cod_barra);
				$tamanho_array_valor_cod_barra = count($array_valor_cod_barra);
				
				
				for($i=1; $i<=$tamanho_array_valor_cod_barra; $i++){
					$soma_valor_cod_barra += $array_valor_cod_barra[$i-1] ;
				}
				
				$digito = ($soma_valor_cod_barra % 10) != 10 ?  10 - ($soma_valor_cod_barra % 10) : 0;

			    $cod_barra = substr($str, 0, 3) . $digito .  substr($str, 4, 40) ;
					
			}
			//=============================================================================
			
			If ($concessionaria == 1 && $tamanho_str == 48){ // POR DIGITAÇÃO MANUAL DE CÓDIGO DE BARRA - TAMANHO 48 - CONCESSIONÁRIA
				
				$campo1 = substr($str, 0, 11);
			
			    $campo2 = substr($str, 12, 11);
				
				$campo3 = substr($str, 24, 11);
			
			    $campo4 = substr($str, 36, 11);
				
				$array_multiplicador = array(2,1,2,1,2,1,2,1,2,1,2);
				
				$array_campo1 = str_split($campo1);
				$array_campo2 = str_split($campo2);
				$array_campo3 = str_split($campo3);
				$array_campo4 = str_split($campo4);
			
				$valor_cod_barra = 0;
				
				for($i=1; $i<=11; $i++){
					$valor_campo1 .= $array_campo1[$i-1] * $array_multiplicador[$i-1];
					$valor_campo2 .= $array_campo2[$i-1] * $array_multiplicador[$i-1];
					$valor_campo3 .= $array_campo3[$i-1] * $array_multiplicador[$i-1];
					$valor_campo4 .= $array_campo4[$i-1] * $array_multiplicador[$i-1];
				}
				//=== digito1 
				$array_valor_campo1 = str_split($valor_campo1);
				$tamanho_array_valor_campo1 = count($array_valor_campo1);

				for($i=1; $i<=$tamanho_array_valor_campo1; $i++){
					$soma_valor_campo1 += $array_valor_campo1[$i-1] ;
				}

				$digito1 = ($soma_valor_campo1 % 10) != 10 && ($soma_valor_campo1 % 10)?  10 - ($soma_valor_campo1 % 10) : 0;
				
				//=== digito2 
				$array_valor_campo2 = str_split($valor_campo2);
				$tamanho_array_valor_campo2 = count($array_valor_campo2);

				for($i=1; $i<=$tamanho_array_valor_campo2; $i++){
					$soma_valor_campo2 += $array_valor_campo2[$i-1] ;
				}

				$digito2 = ($soma_valor_campo2 % 10) != 10 && ($soma_valor_campo2 % 10) != 0?  10 - ($soma_valor_campo2 % 10) : 0;
				
				//=== digito3 
				$array_valor_campo3 = str_split($valor_campo3);
				$tamanho_array_valor_campo3 = count($array_valor_campo3);

				for($i=1; $i<=$tamanho_array_valor_campo3; $i++){
					$soma_valor_campo3 += $array_valor_campo3[$i-1] ;
				}

				$digito3 = ($soma_valor_campo3 % 10) != 10 && ($soma_valor_campo3 % 10) != 0 ?  10 - ($soma_valor_campo3 % 10) : 0;
				
				
				//=== digito4 
				$array_valor_campo4 = str_split($valor_campo4);
				$tamanho_array_valor_campo4 = count($array_valor_campo4);

				for($i=1; $i<=$tamanho_array_valor_campo4; $i++){
					$soma_valor_campo4 += $array_valor_campo4[$i-1] ;
				}

				$digito4 = ($soma_valor_campo4 % 10) != 10 && ($soma_valor_campo4 % 10) ?  10 - ($soma_valor_campo4 % 10) : 0;

				$cod_barra = $campo1 . $digito1 . $campo2 . $digito2 . $campo3 . $digito3 . $campo4 . $digito4 ;	

			}



			If ($concessionaria == 0 && $tamanho_str == 44){ // POR LEITOR DE CÓDIGO DE BARRA - TAMANHO 44 - BOLETOS
				
				$cod_barra = substr($str, 0, 4) . substr($str, 5, 39) ;
			
			    $valor_apagar = substr($str, 9, 8) . '.' . substr($str, 17, 2);
				
				$valor_apagar = Util::decimal_br($valor_apagar,2);

				$array_cod_barra = str_split($cod_barra);
				
			    $array_multiplicador = array(4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2,9,8,7,6,5,4,3,2);
				
				$valor_cod_barra = 0;
				
				for($i=1; $i<=count($array_cod_barra); $i++){
					$valor_cod_barra += $array_cod_barra[$i-1] * $array_multiplicador[$i-1];
				}
				
				$digito = ($valor_cod_barra % 11) != 10 ?  11 - ($valor_cod_barra % 11) : 0;
				
				if ((11 - ($valor_cod_barra % 11)) == 0 || (11 - ($valor_cod_barra % 11)) == 1 || (11 - ($valor_cod_barra % 11)) == 10 || (11 - ($valor_cod_barra % 11)) == 11){
					
				$digito = 1;	
				
				}else{
				
				$digito = (11 - ($valor_cod_barra % 11));
		
				}
				
				//if ($_POST['valor_apagar'] == $valor_apagar){
				
				    $cod_barra = substr($str, 0, 4) . $digito .  substr($str, 5, 39) ;
				
				//}else{
					
				//	$cod_barra = 0;
					
				//}
					
			}
			//=============================================================================
			
			If ($concessionaria == 0 && $tamanho_str == 47){ // POR DIGITAÇÃO MANUAL DE CÓDIGO DE BARRA - TAMANHO 47 - boleto
				
				$campo1 = substr($str, 0, 9);
			
			    $campo2 = substr($str, 10, 10);
				
				$campo3 = substr($str, 21, 10);
			
			    $campo4 = substr($str, 32, 1);
				
				$campo5 = substr($str, 33, 14);
				
				$valor_apagar = substr($str, 37, 8) . '.' . substr($str, 45, 2);
				
				$valor_apagar = Util::decimal_br($valor_apagar,2);

				$array_multiplicador1 = array(2,1,2,1,2,1,2,1,2);
				$array_multiplicador2 = array(1,2,1,2,1,2,1,2,1,2);
				$array_multiplicador3 = array(1,2,1,2,1,2,1,2,1,2);
				
				$array_campo1 = str_split($campo1);
				$array_campo2 = str_split($campo2);
				$array_campo3 = str_split($campo3);
				$array_campo4 = str_split($campo4);
			
				$valor_cod_barra = 0;
				
				for($i=1; $i<=11; $i++){
					$valor_campo1 .= $array_campo1[$i-1] * $array_multiplicador1[$i-1];
					$valor_campo2 .= $array_campo2[$i-1] * $array_multiplicador2[$i-1];
					$valor_campo3 .= $array_campo3[$i-1] * $array_multiplicador3[$i-1];
				
				}
				//=== digito1 
				$array_valor_campo1 = str_split($valor_campo1);
				$tamanho_array_valor_campo1 = count($array_valor_campo1);

				for($i=1; $i<=$tamanho_array_valor_campo1; $i++){
					$soma_valor_campo1 += $array_valor_campo1[$i-1] ;
				}

				$digito1 = ($soma_valor_campo1 % 10) != 10 && ($soma_valor_campo1 % 10)?  10 - ($soma_valor_campo1 % 10) : 0;
					
				//=== digito2 
				$array_valor_campo2 = str_split($valor_campo2);
				$tamanho_array_valor_campo2 = count($array_valor_campo2);

				for($i=1; $i<=$tamanho_array_valor_campo2; $i++){
					$soma_valor_campo2 += $array_valor_campo2[$i-1] ;
				}

				$digito2 = ($soma_valor_campo2 % 10) != 10 && ($soma_valor_campo2 % 10) != 0?  10 - ($soma_valor_campo2 % 10) : 0;
				
				//=== digito3 
				$array_valor_campo3 = str_split($valor_campo3);
				$tamanho_array_valor_campo3 = count($array_valor_campo3);

				for($i=1; $i<=$tamanho_array_valor_campo3; $i++){
					$soma_valor_campo3 += $array_valor_campo3[$i-1] ;
				}

				$digito3 = ($soma_valor_campo3 % 10) != 10 && ($soma_valor_campo3 % 10) != 0 ?  10 - ($soma_valor_campo3 % 10) : 0;


                
				//if ($_POST['valor_apagar'] == $valor_apagar){

				$cod_barra = $campo1 . $digito1 . $campo2 . $digito2 . $campo3 . $digito3 . $campo4 . $campo5 ;	
						
				//}else{

				//$cod_barra = 0;	
		
				//}
		
			}
			
			return $str == $cod_barra? true : false;
			
		}
		
		
	}

	