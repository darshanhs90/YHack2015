var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
    $scope.uploadResume=function(){
        $http.get('http://localhost:1337/extracttext')
            .success(function(res){
                console.log(res);
                //alert('upload completed');
            });
    }

    $scope.getScore=function(){
        $http.get('http://localhost:1337/resscore')
            .success(function(res){
                console.log(res.rezscore.score[0]);
                $scope.grade = res.rezscore.score[0]["impact_score"].toString();
                //alert('upload completed');
            });
    }

     $scope.take_snapshot = function() {
            // take snapshot and get image data
            Webcam.snap(function() {
                // display results in page
                <!-- document.getElementById('results').innerHTML =  -->
                <!-- '<h2>Here is your image:</h2>' +  -->
                <!-- '<canvas src="'+data_uri+'"/>'; -->
            }, myCanvas);
            var canvas = document.getElementById("myCanvas");
            // draw to canvas...
            canvas.toBlob(function(blob) {
                saveAs(blob, "test.png");
            });
        }

});