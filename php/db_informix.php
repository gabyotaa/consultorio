<?php
header('Content-Type: text/html;charset=utf-8');
class db_informix{
	private $dbhost="192.168.1.24";
	private $dbservice="1526";
	private $dbname="bdfrio";
	private $dbserver="frio_des";
	private $dbprotocol="onsoctcp";
	private $dbuser="sfrio2";
	private $dbpass="frio93";
	public  $conn;

	function __construct(){
		try{
			$this->conn = $pdo = new PDO("informix:host=".$this->dbhost."; service=".$this->dbservice.";database=".$this->dbname."; server=".$this->dbserver."; protocol=".$this->dbprotocol."; EnableScrollableCursors=1; client_locale=en_us.utf8;db_locale=en_us.819;",$this->dbuser,$this->dbpass);	
			$this->conn->exec("set names utf8");
			$this->conn->query("SET CHARACTER SET utf8");
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}catch(PDOException $e){
			echo $e->getMessage();
		}
	}

	public function consulta($query){
		$stmt = $this->conn->query($query);
		$array=$stmt->fetchAll(PDO::FETCH_BOTH);
		if(count($array)>0){
			return $array;
		}else{
			return 0;
		}
	}

	public function insertar($query){
		$result = $this->conn->exec($query);
		$insertId = $this->conn->lastInsertId();
		if($result>0){
			return $insertId;
		}else{
			return 0;
		}
	}

	public function consulta_utf8($query){

		/*$stmt = $this->conn->query($query);
		$array=$stmt->fetchAll(PDO::FETCH_BOTH);
		if(count($array)>0){
			return $array;
		}else{
			return 0;
		}*/
		$result=[];
		foreach ($this->conn->query($query) as $key_r => $row) {
			$result[$key_r]=[];
        	foreach ($row as $key =>$value) {
        		$result[$key_r][$key]=utf8_encode(trim($value));
        	}
    	}
    	return $result;
	}
}

?>