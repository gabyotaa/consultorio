main_app.controller('altas', function ($scope, $http, $cookies, $filter) {
	//alert("altas");
	$scope.fecha=$filter('date')(new Date(), 'MM/dd/yyyy');
	$scope.datos_generales_mostrar=false;
	$scope.lista=[];

	
	$scope.getMatches = function () {

		var request = $http({
		    method: "post",
		    url: "../../php/main.php",
		    data: {
		    	metodo: 'buscar_paciente',
		        texto: $scope.text_search
		    },
		    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});


		request.success(function (data) {
			
    		$scope.pacientes=data;
		});
		//console.log(document.querySelector("datalist[id='pacientes']").querySelector("option[value='"+$scope.text_search+"']"));
		if(document.querySelector("datalist[id='pacientes']").querySelector("option[value='"+$scope.text_search+"']")!=null){
			$scope.datos_paciente(document.querySelector("datalist[id='pacientes']").querySelector("option[value='"+$scope.text_search+"']"));
		}else{
			$scope.limpiar_datos_paciente();
		}
	};

	$scope.guardar_consulta= function () {
		var request = $http({
		    method: "post",
		    url: "../../php/main.php",
		    data: {
		    	metodo: 'guardar_consulta',
		    	paciente_id:$scope.paciente_id,
		    	medico_id:$cookies.get('medico_id'),
		    	fecha: $scope.fecha,
		    	peso: $scope.peso,
		    	altura: $scope.altura,
		    	presion_sys: $scope.sys,
		    	presion_dias: $scope.dyas,
		    	diagnostico:$scope.diagnostico,
		        medicamentos: $scope.lista
		    },
		    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});


		request.success(function (data) {
			if(data==1){
				var notify = {
					    type: 'success',
					    title: 'Operacion Correcta',
					    content: 'se han almacenado los datos correctamente',
					    timeout: 5000 //time in ms
				};
				$scope.limpiar_datos_paciente();
				$scope.limpiar_datos_consulta();
			}else{
				var notify = {
					    type: 'error',
					    title: 'Ocurrio un Error',
					    content: 'No se han almacenado los datos correctamente',
					    timeout: 5000 //time in ms
					};
					
			}
			$scope.$emit('notify', notify);
    		//$scope.pacientes=data;
		});
	};

	$scope.limpiar_datos_consulta= function(){
		$scope.text_search=null;
		$scope.fecha=null;
		$scope.peso=null;
		$scope.altura=null;
		$scope.sys=null;
		$scope.dyas=null;
		$scope.diagnostico=null;
		$scope.lista=null;
	};

	$scope.limpiar_datos_paciente= function(){
		$scope.datos_generales_mostrar=false;
		$scope.paciente_id=null;
		$scope.paciente_fecha_nac=null;
		$scope.paciente_telefono=null;
		$scope.paciente_nombre=null;
		$scope.paciente_ape_p=null;
		$scope.paciente_ape_m=null;

	};

	$scope.datos_paciente= function(option){

		$scope.paciente_id=option.getAttribute('data-id');
		$scope.paciente_fecha_nac=option.getAttribute('data-fecha_nac');
		$scope.paciente_telefono=option.getAttribute('data-telefono');
		$scope.paciente_nombre=option.getAttribute('data-nombre');
		$scope.paciente_ape_p=option.getAttribute('data-ape_p');
		$scope.paciente_ape_m=option.getAttribute('data-ape_m');
		$scope.datos_generales_mostrar=true;
		//alert(option.getAttribute('data-fecha_nac'));
	};
	$scope.eliminar_medicamento = function(row) {
	    if (confirm("¿Seguro que desea eliminar?")) {
	      $scope.lista.splice(row, 1);
	    }
  	};
  	$scope.agregar_medicamento= function() {
	    $scope.lista.push({
	      nombre: '',
	      dosis: '',
	      unidad_dosis: '',
	      frecuencia:''
	    })
	};
	$scope.recuperarValores = function() {
	    console.log($scope.lista);
	    console.log(JSON.stringify($scope.lista));
	   // $("#JSON").text(JSON.stringify($scope.lista));
	};
	//$scope.getMatches($scope.text_search);
	//$scope.titles = [ "Action Comics" , "Detective Comics" , "Superman" , "Fantastic Four" , "Amazing Spider-Man" ];
});

main_app.directive('editableTd', [function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.css("cursor", "pointer");
      element.attr('contenteditable', 'true');

      element.bind('blur keyup change', function() {
      	scope.lista[attrs.row][attrs.field] = element.text();
      	     	
      });
       element.bind('focusout', function() {
      	//scope.lista[attrs.row][attrs.field] = element.text();
      	element.text(element.text().trim());
      	//console.log(attrs.tipo);
      	switch(attrs.tipo){
      		case 'number':{
      			regex_number=/^((\d)+(.(\d)+)?)?$/
      			//console.log("number("+element.text()+")="+regex_number.test(element.text()));
      			if(!regex_number.test(element.text())){
      				//console.log('no es numero');
      				scope.lista[attrs.row][attrs.field]='';
      				
      				var notify = {
					    type: 'error',
					    title: 'Formato de campo incorrecto',
					    content: element.text()+' no es una cantidad numerica',
					    timeout: 5000 //time in ms
					};
					scope.$emit('notify', notify);
					element.text('');
      			}
      		}break;
      		case 'hours':{
      			regex_hours=/^(\d+(:\d\d){1})?$/;
      			//console.log("hours="+regex_hours.test(element.text()));
      			if(!regex_hours.test(element.text())){
      				scope.lista[attrs.row][attrs.field]='';
      				var notify = {
					    type: 'error',
					    title: 'Formato de campo incorrecto',
					    content: element.text()+' no es un rango de horas',
					    timeout: 5000 //time in ms
					};
					scope.$emit('notify', notify);
      				element.text('');
      				//console.log('no es hora');
      			}
      		}break;
      	}
      	
      });

      element.bind('click', function() {
        document.execCommand('selectAll', false, null)
      });
    }
  };
}]);