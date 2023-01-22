
var app=angular.module('User_Module',[]);
app.service('userService',function($http){
    this.saveUser=function(data){
        return $http.post('http://localhost:5200/api/user/save', JSON.stringify(data))

        
    }
    this.saveEmployee=function(data){
        return $http.post('http://localhost:4800/api/employee/insert',JSON.stringify(data))
    }
    this.LoginUserByEmailandPass=function(email,pass){
        return $http.get('http://localhost:5200/api/user/loginuser/email/'+email+'/pass/'+pass)
    }
    this.saveImage=function(data){
        return $http.post('http://localhost:5200/api/user/saveImage', JSON.stringify(data));
    }
    this.saveprofileImage=function(id,data){
        return $http.put('http://localhost:5200/api/user/updateuser/'+id,JSON.stringify(data));
    }
})

app.controller('Register_ctr',function($scope,userService,storageService,$window){
    



      $scope.RegisterUser=function(){
        {
            if($scope.pass!=$scope.passCon){
                alert('')
            }
            else{
                var user={
                         FULL_NAME:$scope.full_name,
                         E_MAIL:$scope.e_mail,
                         PHONE_NUMBER:$scope.phone_number,
                         PASSWORD:$scope.password,
                         CONFIRM_PASSWORD:$scope.confirm_password,
                         PHOTO:$scope.upload_image,
                }
            }
            userService.saveUser(user).then(function(response){
                if(response.data.Message=="SUCCESS"){
                    alert('REGISTRATION SUCCESSFULLY')
                    $scope.full_name="";
                    $scope.e_mail="";
                    $scope.phone_number="";
                    $scope.password="";
                    $scope.confirm_password="";
                    $scope.upload_image="";
                }
                else{
                    alert('REGISTRATION UNSUCCESSFULLY')
                }
            })
        }
       
      }

$scope.RegisterDoctor=function(){
    if($scope.pass!=$scope.passCon)
    {
        alert('Book Successfully')
    }
    else{
        var doctor={
            Name:$scope.name,
            Email:$scope.email,
            Number:$scope.number,
            Gender:$scope.gender,
            Age:$scope.age,
            Address:$scope.address,
            City:$scope.city,
            State:$scope.state,
            Date:$scope.date,
            Time:$scope.time,
        }
    }
userService.saveEmployee(doctor).then(function(response){
if(response.data.Message=="save data"){
    alert(' Book Appointment SuccessFully')
    $scope.name="";
    $scope.email="";
    $scope.number="";
    $scope.gender="";
    $scope.age="";
    $scope.address="";
    $scope.city="";
    $scope.state="";
    $scope.date="";
    $scope.time="";
}else{
    alert(' Book Not Appointment Successfully')
}
})
}
 })
app.factory('storageService',['$rootScope',function($rootScope){
    return {
        get:function(key){
            return sessionStorage.getItem(key);
        },
        save:function(key,data){
            return sessionStorage.setItem(key,data);
        }
    }
}])


app.controller('login_ctr',function($scope,userService,storageService,$window){
    $scope.LoginUser=function(){
        var email_id=$scope.loginemail;
        var pass=$scope.loginpassword;
        userService.LoginUserByEmailandPass(email_id,pass).then(function(response){
            if(response.data.Message=="Success"){
                $scope.emailid=response.data.LoginResponse[0].E_MAIL;
                $scope.uid=response.data.LoginResponse[0].ID;
                storageService.save("email_id",$scope.emailid);
                storageService.save('user-id',$scope.uid);
                alert("Login Successfully");
                $window.location.href="./index.html";
            }else{
                alert("Login Unsuccessfull");
            }
        })
    }
})

app.controller('Main_ctr',function($scope,storageService,$window){
    $scope.IsLoginOrNot=function(){
        var log=storageService.get("email_id");
        if(log==null || log==""){
            $scope.loginbtn=false;
            $scope.profilebtn=true;
        }else{
            $scope.loginbtn=true;
            $scope.profilebtn=false;
        }
    }
    $scope.IsLoginOrNot();
    $scope.LogoutFun=function(){
        storageService.save("email_id","");
        $window.location.href="./index.html";
    }
})
app.controller('index_ctr',function($scope,storageService,$window,userService){
    $scope.id=storageService.get('user-id');
        //uploadFile
        $scope.photo;
        $scope.uploadFile = function(e)
        {
    
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.PreviewImage = e.target.result;
           //  $scope.photo =    e.target.result.replace("data:", "").replace(/^.+,/, "");
    
                $scope.$apply();
            };
    
            reader.readAsDataURL(e.target.files[0]);
    
        }
    
    
        $scope.ImagePath = "";
        $scope.uploadImage=function(){
          if($scope.PreviewImage!=undefined){
          var d = {
            img:$scope.PreviewImage
        }
        userService.saveImage(d).then(function(response){
            if(response.data.Message=="Success"){
              $scope.ImagePath=response.data.path;
              var data={
                PHOTO:$scope.ImagePath
              }
              userService.saveprofileImage($scope.id,data).then(function(response){
                if(response.data.Message=="Success"){
                    alert("Upload Success");
                }else{
                    alert("Invalid data");
                }
              })
            }else{
                alert("Data Not Found");
            }
        })
    }
    }
})