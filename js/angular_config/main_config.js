
main_app.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            /*when('/', {
                templateUrl: 'main.html'
            }).*/
            when('/altas', {
                templateUrl: '../altas/altas.html',
                controller: 'altas'
            });/*.
            otherwise({
                redirectTo: 'main.html'
            });*/
    }
]);