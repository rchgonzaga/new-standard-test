<?php

/**
 * BaseMaodeobra
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id
 * @property integer $id_fazenda
 * @property string $nome
 * @property string $cargo
 * @property string $email
 * @property string $telefone
 * @property string $senha
 * @property string $status
 * @property string $gerente
 * @property string $operacional
 * @property decimal $custo_hora
 * @property Fazenda $Fazenda
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6401 2009-09-24 16:12:04Z guilhermeblanco $
 */
abstract class BaseMaodeobra extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('maodeobra');
        $this->hasColumn('id', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'unsigned' => 0,
             'primary' => true,
             'autoincrement' => true,
             ));
        $this->hasColumn('id_fazenda', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'unsigned' => 0,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             ));
        $this->hasColumn('nome', 'string', 145, array(
             'type' => 'string',
             'length' => 145,
             'fixed' => false,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             ));
        $this->hasColumn('cargo', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => false,
             'autoincrement' => false,
             ));
        $this->hasColumn('email', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             ));
        $this->hasColumn('telefone', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => false,
             'autoincrement' => false,
             ));
        $this->hasColumn('senha', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => false,
             'autoincrement' => false,
             ));
        $this->hasColumn('status', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => false,
             'autoincrement' => false,
             ));
        $this->hasColumn('gerente', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => false,
             'autoincrement' => false,
             ));
        $this->hasColumn('operacional', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => false,
             'autoincrement' => false,
             ));
        $this->hasColumn('custo_hora', 'decimal', 13, array(
             'type' => 'decimal',
             'length' => 13,
             'unsigned' => 0,
             'primary' => false,
             'notnull' => false,
             'autoincrement' => false,
             'scale' => false,
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasOne('Fazenda', array(
             'local' => 'id_fazenda',
             'foreign' => 'id'));
    }
}