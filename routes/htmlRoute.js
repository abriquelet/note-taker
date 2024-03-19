//packages and routing
const express = require('express');
const htmlRoute = express.Router();
const fs = require('fs');
const path = require('path');

//get reqs

htmlRoute.get('/index', function (req,res){
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

htmlRoute.get('/notes', function (req,res){
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


htmlRoute.get('/', function (req,res){
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


htmlRoute.get('*', function (req,res){
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

module.exports = htmlRoute;

