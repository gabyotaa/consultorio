<?php

header('Content-Type: text/html;charset=utf-8');
require_once 'medicamento.php';


class consulta_med{
	public $id;
	public $fecha;
	public $peso;
	public $altura;
	public $presion_sys;
	public $presion_dias;
	public $diagnostico;
	public $paciente_id;
	public $medico_id;
	public $medicamentos;

	function __construct(){
		$this->id=null;
		$this->fecha=null;
		$this->peso=null;
		$this->altura=null;
		$this->presion_sys=null;
		$this->presion_dias=null;
		$this->diagnostico=null;
		$this->paciente_id=null;
		$this->medico_id=null;
		$this->medicamentos=null;
	}

	public function guardar_consulta($request){
		$query= "INSERT INTO consulta_med (fecha, peso, altura, presion_sys, presion_dias, diagnostico, paciente_id, medico_id ) ".
				" VALUES ('".
			   $request->fecha."', ".
			   $request->peso." , ".
			   $request->altura." , ".
			   $request->presion_sys." , ".
			   $request->presion_dias.", '".
			   $request->diagnostico."' , ".
			   $request->paciente_id." , ".
			   $request->medico_id.") ";
		$bd=new db_informix();
		//return $query;
    	$result=$bd->insertar($query);
    	if($result!=0){
    		$this->id=$result;
    		$this->fecha=$request->fecha;
    		$this->peso=$request->peso;
    		$this->altura=$request->altura;
    		$this->presion_sys=$request->presion_sys;
    		$this->presion_dias=$request->presion_dias;
    		$this->diagnostico=$request->diagnostico;
    		$this->paciente_id=$request->paciente_id;
    		$this->medico_id=$request->medico_id;
    		foreach ($request->medicamentos as $med) {
    			if($med->nombre!=''){
    				$aux=new medicamento($med->nombre, $med->dosis, $med->unidad_dosis, $med->frecuencia, $this->id);
	    			if($aux!=null){
	    				$this->medicamentos[]=$aux;
	    			}
    			}
    			
    		}
    		return true;
    	}
    	return false;
    	
    }
}
?>