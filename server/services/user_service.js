'use strict';

var User=require('../models/user_model');
var mongoose=require('mongoose');

var userService={
    getUsers:getUsers,
    getUser:getUser,
    login:login,
    logout:logout
}

function getUsers(query,callback){
    User.find(query,{salt:0,passwordHash:0},function(err,users){
        if(err){
            callback(err)
        }else{
            callback(null,users)
        }
    })
}

function getUser(id,callback){
    var id = mongoose.Types.ObjectId(id);
    User.findById(id,{salt:0,passwordHash:0},function(err,user){
        if(err){
            callback(err)
        }else{
            callback(null,user)
        }
    })
}

function login(user){

}

function logout(){
    
}

module.exports=userService;