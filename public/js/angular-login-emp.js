var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {
    $scope.intscore=0;
    $scope.kTerms='';
    $scope.getKeyTerms=function(){
        $http.get('http://localhost:1337/conceptExtraction')
        .success(function(res){
            console.log(res);
            $scope.kTerms='Key Concepts in the Resume are ';
            for (var i = 0; i < 11; i++) {
                $scope.kTerms+=res.concepts[i].concept+',';
                i++;
            };
        });
    }

    $scope.getIntScore=function(){
        $http.get('http://localhost:1337/analyzeSentiment')
        .success(function(res){
            $scope.showInt=true;
            $scope.intscore=res.aggregate.score;
        });
    }
    $scope.showVal=0;
    $scope.getResumeInsights=function(){
        $http.get('http://localhost:1337/extractentities')
        .success(function(res){
            $('#myModal').modal('show')
            console.log(res);
            $scope.mod_title="Resume Insights";
            $scope.showVal=1;
            $scope.val=res.entities;
        });
    }

    $scope.getPersonalityInsights=function(){
        $http.get('http://localhost:1337/fppCheck')
        .success(function(res){
            $('#myModal').modal('show')
            console.log(res);
            $scope.mod_title="Personality Insights";
            $scope.val=res.face[0].attribute;
            $scope.showVal=2;
        });
    }

    $scope.getInterviewInsights=function(){
        $http.get('http://localhost:1337/checkStatus')
        .success(function(res){
            $('#myModal').modal('show')
            console.log(res);
            $scope.mod_title="Interview Insights";
            $scope.showVal=3;
        });
    }

    $scope.getInterviewValidity=function(){
        $http.get('http://localhost:1337/facedetectCheck')
        .success(function(res){
            $('#myModal').modal('show')
            console.log(res);
            $scope.mod_title="Interview Validity";
            if(res.face.length>1)
                $scope.val='Looks like the Interviewee cheated in the video Interview';
            else
                $scope.val='Interview was Legitimate';
            $scope.showVal=4;
        });
    }



});