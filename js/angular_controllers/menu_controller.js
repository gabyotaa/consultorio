main_app.controller('menu', function ($scope, $cookies, $cookieStore) {
	
	$scope.check_session = function () {
		if(!($cookies.get('medico_id'))){
			window.location.href="../../";
		}
		if($cookies.get('medico_nom')!='null'&&$cookies.get('medico_nom')!=null){
			$scope.medico=$cookies.get('medico_nom');
			$scope.ape_p=$cookies.get('medico_ape_p');
		}else{
			$scope.medico="Usuario";
			$scope.ape_p="";
		}
		
	};
	$scope.log_out=function(){
		var cookies = $cookies.getAll();
		angular.forEach(cookies, function(value, key) {
  			$cookies.remove(key, { path: '/consultorio' });

		});
		window.location.href="../../";
	};
	//$scope.check_session();*/
});