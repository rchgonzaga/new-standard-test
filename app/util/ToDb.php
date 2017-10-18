<?php
	
	class ToDb
	{
		
		static function string($str)
		{
			
			$str = str_replace(array(chr(194), chr(160)), '', $str);
			
			$str = utf8_decode($str);
			
			$str = str_replace(array('Â', 'â', 'À', 'à', 'Á', 'á', 'Ä', 'ä', 'Ã', 'ã'), 'A', $str);
			$str = str_replace(array('Ê', 'ê', 'È', 'è', 'É', 'é', 'Ë', 'ë'), 'E', $str);
			$str = str_replace(array('Î', 'î', 'Í', 'í', 'Ì', 'ì', 'Ï', 'ï'), 'I', $str);
			$str = str_replace(array('Ô', 'ô', 'Õ', 'õ', 'Ò', 'ò', 'Ó', 'ó', 'Ö', 'ö'), 'O', $str);
			$str = str_replace(array('Û', 'û', 'Ù', 'ù', 'Ú', 'ú', 'Ü', 'ü'), 'U', $str);
			$str = str_replace(array('ç','Ç'), 'C', $str);
			
			$str = strtoupper($str);
			
			$str = str_replace('º', 'o', $str);
			$str = str_replace('ª', 'a', $str);
			
			$str = trim($str);
			
			$str = htmlspecialchars($str, ENT_QUOTES);
			
			return $str;
			
		}
		
		static function cnpj_cpf($str)
		{
			
			return str_replace(array('.', '/', '-'), '', $str);
			
		}
		
		static function ie_rg($str)
		{
			
			return str_replace(array('.', '/', '-'), '', self::string($str));
			
		}
		
		static function im($str)
		{
			
			return str_replace(array('.', '/', '-'), '', $str);
			
		}
		
		static function cnae($str)
		{
			
			return str_replace(array('.', '/', '-'), '', $str);
			
		}
		
		static function pis_pasep($str)
		{
			
			return str_replace(array('.', '/', '-'), '', $str);
			
		}
		
		static function cep($str)
		{
			
			return str_replace(array('.', '/', '-'), '', $str);
			
		}
		
		static function telefone($str)
		{
			
			return str_replace(array('.', '/', '-'), '', $str);
			
		}
		
		static function email($str)
		{
			
			$str = explode(';', $str);
			
			foreach ($str as $key => $value) {
				$str[$key] = trim($value);
			}
			
			$str = implode('; ', $str);
			
			return $str;
			
		}
		
		static function dt($str){
			
			return date('Y-m-d', strtotime(implode('-', array_reverse(explode('/', $str)))));
			
		}
		
		static function decimal($valor){
			
			$valor = str_replace('.', '', $valor);
			$valor = str_replace(',', '.', $valor);
			
			return $valor;
			
		}
		
		static function ncm($str)
		{
			
			return str_replace(array('.', '/', '-'), '', $str);
			
		}
		
		static function cest($str)
		{
			
			return str_replace(array('.', '/', '-'), '', $str);
			
		}
		
	}