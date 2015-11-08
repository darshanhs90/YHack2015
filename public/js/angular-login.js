var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
	$scope.uploadResume=function(){
		$http.get('http://localhost:1337/extracttext')
			.success(function(res){
				console.log(res);
				alert('upload completed');
			});
	}



});