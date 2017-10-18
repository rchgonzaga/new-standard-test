<?php
	
	class FromDb
	{
		
		static function string($str)
		{
			
			$str = html_entity_decode($str, ENT_QUOTES);
			
			$str = utf8_encode($str);
			
			return $str;
			
		}
		
		static function cnpj_cpf($str)
		{
			
			if ($str == 'EXTERIOR') {
				return $str;
			} else if (Validacao::cnpj($str)) {
				return Util::format(ToMysql::cnpj_cpf($str), '##.###.###/####-##');
			} else if (Validacao::cpf($str)) {
				return Util::format(ToMysql::cnpj_cpf($str), '###.###.###-##');
			} else {
				return $str;
			}
			
		}
		
		static function ie_rg($str)
		{
			
			if ($str == 'ISENTO') {
				return $str;
			} else {
				return Util::format(ToMysql::ie_rg($str), '#.###.###.###.###-#');
			}
			
		}
		
		static function im($str)
		{
			
			return Util::format(ToMysql::ie_rg($str), '##.###.###.###.###-#');
			
		}
		
		static function cnae($str)
		{
			
			return Util::format(ToMysql::cnae($str), '##.##-#-##');
			
		}
		
		static function pis_pasep($str)
		{
			
			return Util::format(ToMysql::pis_pasep($str), '###.#####.##.#');
			
		}
		
		static function cep($str)
		{
			
			return Util::format(ToMysql::cep($str), '#####-###');
			
		}
		
		static function telefone($str)
		{
			
			if (strlen($str) == 8) {
				return Util::format(ToMysql::telefone($str), '####-####');
			} else if (strlen($str) == 9) {
				return Util::format(ToMysql::telefone($str), '#-####-####');
			} else {
				return $str;
			}
			
		}
		
		static function email($str)
		{
			
			return utf8_encode($str);
			
		}
		
		static function dt($str){
			
			return ! empty($str) && $str != '' ? date('d/m/Y', strtotime($str)) : '';
			
		}
		
		static function decimal($valor, $casas = 2, $milhar = true) {
			
			if ($milhar) {
				$valor = str_replace(',', '', $valor);
				$valor = number_format($valor, $casas, ',', '.');
			} else {
				$valor = str_replace(',', '', $valor);
				$valor = number_format($valor, $casas, ',', '');
			}
			return $valor;
			
		}
		
		static function ncm($str)
		{
			
			return Util::format(ToMysql::ncm($str), '####.##.##');
			
		}
		
		static function cest($str)
		{
			
			return Util::format(ToMysql::cest($str), '##.###.##');
			
		}
		
	}