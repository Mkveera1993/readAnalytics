'use strict';

var app=angular.module('readAnalytics');
app.service('User',function($http,$q){
    this.baseUrl="/api/users/";  
    var _user = {};
    var _ready = $q.defer();

    if (sessionStorage.getItem('token') && sessionStorage.getItem('id')) {
      $http.get('/api/users/'+sessionStorage.getItem('id'))
        .then(function (res) {
          _user = res.data;
        })
        .finally(function () {
          _ready.resolve();
        });
    } else {
      _ready.resolve();
    }


    this.login=function(user){
        var deferred = $q.defer();
        $http.post(this.baseUrl+'login',user).then((res)=>{
            _user = res.data.user;
            sessionStorage.setItem('token', res.data.token);
            sessionStorage.setItem('id', res.data.user.id);
          deferred.resolve();
        }).catch((err)=>{
            deferred.reject(err.data);
        })
        return deferred.promise;
    }

    this.getAllUsers=function(query){
        return $http.get(this.baseUrl,{params:query})
    }

    this.isLogged = function () {
        return _user.hasOwnProperty('_id');
    };

    this.logout = function () {
      sessionStorage.removeItem('token');
        _user = {};
        return true;
    };


    this.getUser = function () {
      var deferred = $q.defer();
        if(Object.keys(_user).length>0){
          deferred.resolve(_user);
        }else{
          if (sessionStorage.getItem('token') && sessionStorage.getItem('id')) {
            $http.get('/api/users/'+sessionStorage.getItem('id')).then((user)=>{
              _user=user.data;
              deferred.resolve(user.data);
            }).catch((err)=>{
              deferred.reject(err.data);
            })              
          }
        }
        return deferred.promise;
    };
})