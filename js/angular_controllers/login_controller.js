

login_app.controller('login', function ($scope, $http, $cookies) {

	$scope.login = function () {
		var request = $http({
		    method: "post",
		    url: window.location.href + "php/main.php",
		    data: {
		    	metodo: 'login',
		        email: $scope.email,
		        password: $scope.password
		    },
		    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});


		request.success(function (data) {
    		/*document.getElementById("message").textContent = "You have login successfully with email "+data;*/
    		if(data!=0){
    			//alert(data.EMAIL+" "+data.ID);
    			$cookies.put('medico_nom',data.NOMBRE);
    			$cookies.put('medico_ape_p',data.APE_P);
    			$cookies.put('medico_ape_m',data.APE_M);
    			$cookies.put('medico_email',data.EMAIL);
    			$cookies.put('medico_id',data.ID);

    			window.location.href="pages/marco/main.html";
    		}else{
    			document.getElementById("mensaje").textContent="email o password incorrectos";
    		}
		});
	}
});