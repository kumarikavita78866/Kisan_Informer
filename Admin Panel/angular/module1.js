var app = angular.module("myMod",['ngRoute']);
app.config(["$routeProvider",function($routeProvider){

	$routeProvider.
	when("/teacher",{
		templateUrl:'views/teachers.html',
		controller:'teacher_ctr'
	}).
	when("/student",{
		templateUrl:'views/students.html',
		controller:'student_ctr'
	}).
	when("/course",{
		templateUrl:'views/courses.html',
		controller:'course_ctr'
	}).
	when("/gallery",{
		templateUrl:'views/gallery.html',
		controller:'gallery_ctr'
	}).
	otherwise({
		redirectTo:'index.html'
	});

}]);

app.service('angularService',function($http){


	this.getUserList = function()
	{ 
		return $http.get('http://localhost:5200/api/user/get');
	}
	this.deleteuser=function(userid){
		return $http.get('http://localhost:5200/api/user/delete/'+userid);
		

	}
	

});



app.controller("teacher_ctr",function($scope,angularService){

	

	$scope.GetEmpList = function()
	{
			angularService.getUserList()
			.then(function(response){
				if(response.data.Message =="Success"){
					$scope.UserList = response.data.UserList;
				}else{
					console.log(response.data.Message);
				}
			})
			
	}
	$scope.GetEmpList();

	$scope.deleteUser=function(id){
		angularService.deleteuser(id).then(function(response){
			if(response.data.Message=="Success"){
				
			}
			
		})
	}
$scope.deleteUser();


});

app.controller("student_ctr",function($scope){

	$scope.students = ["Ali","Usman","Osama","Zain","Dua","Zoha","Imran","Atif","Noman","Nasir"];

});

app.controller("course_ctr",function($scope){

	$scope.courses = ["Web Desigining","Web Development","Php","Asp.Net","Sql Server","Mysql","JQuery","Javascript","Android Development"];

});

app.controller("gallery_ctr",function($scope){

	$scope.pic1 = "images/Koala.jpg";
	$scope.pic2 = "images/Penguins.jpg";
	$scope.pic3 = "images/Tulips.jpg";

});
