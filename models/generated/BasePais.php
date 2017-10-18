<?php

/**
 * BasePais
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id
 * @property string $descr
 * @property string $abreviacao
 * @property Doctrine_Collection $Estado
 * 
 * @package    ##PACKAGE##
 * @subpackage ##SUBPACKAGE##
 * @author     ##NAME## <##EMAIL##>
 * @version    SVN: $Id: Builder.php 6401 2009-09-24 16:12:04Z guilhermeblanco $
 */
abstract class BasePais extends Doctrine_Record
{
    public function setTableDefinition()
    {
        $this->setTableName('pais');
        $this->hasColumn('id', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             'unsigned' => 0,
             'primary' => true,
             'autoincrement' => true,
             ));
        $this->hasColumn('descr', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             ));
        $this->hasColumn('abreviacao', 'string', 45, array(
             'type' => 'string',
             'length' => 45,
             'fixed' => false,
             'primary' => false,
             'notnull' => true,
             'autoincrement' => false,
             ));
    }

    public function setUp()
    {
        parent::setUp();
    $this->hasMany('Estado', array(
             'local' => 'id',
             'foreign' => 'id_pais'));
    }
}