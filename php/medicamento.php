<?php

header('Content-Type: text/html;charset=utf-8');

class medicamento{
	public $id;
	public $nombre;
	public $dosis;
	public $unidad_dosis;
	public $frecuencia;
	public $consu_id;

	function __construct($nombre, $dosis, $unidad_dosis, $frecuencia, $consu_id){
		$query= "INSERT INTO medicamento (nombre, dosis, unidad_dosis,frecuencia, consu_id) ".
				" VALUES ('".
				$nombre."', ".
				$dosis." , '".
				$unidad_dosis."', '".
				$frecuencia."' , ".
				$consu_id.")";
		$bd=new db_informix();
		//echo $query;
		$result=$bd->insertar($query);
		if ($result!=0){
				$this->id=$result;
				$this->nombre=$nombre;
				$this->dosis=$dosis;
				$this->unidad_dosis=$unidad_dosis;
				$this->frecuencia=$frecuencia;
				$this->consu_id=$consu_id;
		}
		
	}

	
}
?>