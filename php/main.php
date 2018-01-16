<?php
	header('Content-Type: text/html;charset=utf-8');
	require_once 'db_informix.php';
    require_once 'paciente.php';
    require_once 'consulta_med.php';

	
consultorio::main();

class consultorio{
    public static function main(){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        /*@$email = $request->email;
        @$pass = $request->pass;
        echo $email;*/
        $metodo = $request->metodo;
        switch($metodo){
            case 'login':echo consultorio::login($request);break;
            case 'buscar_paciente':echo paciente::buscar_paciente($request);break;
            case 'guardar_consulta':{
                $cons=new consulta_med();
                echo $cons->guardar_consulta($request);
            }break;           
            //echo buscar_paciente($request);break;

        } 
    }

    public static function login($request){
        $email=$request->email;
        $pass=$request->password;
        $query = "SELECT id, nombre, ape_p, ape_m, email FROM medico WHERE email='".$email."' AND password='".md5($pass)."' ";
        //$query="SELECT idusuario as id,nombre,'' as ape_p , '' as ape_m, email FROM CONS_USUA WHERE idusuario=7";
        $bd=new db_informix();
        $result=$bd->consulta($query);
        //$result = utf8_converter($result);
        if($result!=0){
            return json_encode($result[0]);
            //var_dump($result);
        }else{
            return 0;
        }
    }

    function utf8_converter($array)
    {
        array_walk_recursive($array, function(&$item, $key){
            if(!mb_detect_encoding($item, 'utf-8', true)){
                    $item = utf8_encode($item);
            }
        });
     
        return $array;
    }
}
    

   

    
?>