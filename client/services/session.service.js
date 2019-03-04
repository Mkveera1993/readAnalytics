'use strict';

var app=angular.module('readAnalytics')
app.factory('Session',function($http){
    var baseUrl="/api/sessions/"
    return {         
        getSessions:function(query){
            return $http.get(baseUrl,query)
        },
        getSession:function(id){
            return $http.get(baseUrl+id)
        },
        createSession:function(data){
            return $http.get(baseUrl,data)
        },
        updateSession:function(data){
            return $http.put(baseUrl+data._id,data)
        },
        getSessionReport:function(query){
            return $http.post(baseUrl+'getSessionReport',query)
        }

    }
})