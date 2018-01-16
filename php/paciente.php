<?php
header('Content-Type: text/html;charset=utf-8');
//require_once 'db_informix.php';
class paciente{
	public static function buscar_paciente($request){

    	if(isset($request->texto)){
    		$texto=strtoupper($request->texto);
    	}else{
    		$texto="";
    	}
    	

    	$query = "SELECT id, nombre, ape_p, ape_m, fecha_nac, telefono, UPPER(nombre||' '||ape_p||' '||ape_m) as nombre_completo FROM paciente WHERE UPPER(nombre||' '||ape_p||' '||ape_m) like '%$texto%' ";
    	//return $query;
    	$bd=new db_informix();

    	$result=$bd->consulta($query);

    	return json_encode($result);
    }
}
?>