<?php

/**
 * BaseTabelaIndiceValor
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id
 * @property integer $id_tabela_classificacao_indices
 * @property integer $id_tabela_classificacao
 * @property decimal $indice
 * @property decimal $desconto
 * @property TabelaClassificacao $TabelaClassificacao
 * @property TabelaClassificacaoIndices $TabelaClassificacaoIndices
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6401 2009-09-24 16:12:04Z guilhermeblanco $
 */
abstract class BaseTabelaIndiceValor extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('tabela_indice_valor');
        $this->hasColumn('id', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'unsigned' => 0,
             'primary' => true,
             'autoincrement' => true,
             ));
        $this->hasColumn('id_tabela_classificacao_indices', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'unsigned' => 0,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             ));
        $this->hasColumn('id_tabela_classificacao', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'unsigned' => 0,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             ));
        $this->hasColumn('indice', 'decimal', 13, array(
             'type' => 'decimal',
             'length' => 13,
             'unsigned' => 0,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             'scale' => false,
             ));
        $this->hasColumn('desconto', 'decimal', 13, array(
             'type' => 'decimal',
             'length' => 13,
             'unsigned' => 0,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             'scale' => false,
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasOne('TabelaClassificacao', array(
             'local' => 'id_tabela_classificacao',
             'foreign' => 'id'));

        $this->hasOne('TabelaClassificacaoIndices', array(
             'local' => 'id_tabela_classificacao_indices',
             'foreign' => 'id'));
    }
}