var app = require('express')();
var express = require('express');
var cfenv = require('cfenv');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());



var hod = require('havenondemand');
var request=require('request');
var apikey='f3129194-4f03-4419-80c2-f3aa041baf9a';
var client = new hod.HODClient('http://api.idolondemand.com', apikey);
var fs=require("fs");
var fpp = require('face-plus-plus');
fpp.setApiKey('b5e783aaf612ece56decaf2ae5e6f8c8');
fpp.setApiSecret('lI2k8MecfCg9jExmgTz4JcapfOj1MSP1');
var jobId;

app.listen(1337, '127.0.0.1', function() {
    console.log("server starting on " + 1337);
});


app.get('/fppCheck',function(reqst,respns){
	var parameters = {
		attribute: 'gender,age',
		img : {
			value: fs.readFileSync('./family.jpg')
			, meta: {filename:'family.jpg'}
		}
	};
	fpp.post('detection/detect', parameters, function(err, res) {
		respns.send(res);
		respns.end();
	});
});



app.get('/facedetectCheck',function(reqst,respns){

	data={'file':'./family.jpg',
	'additional':'true'}

	client.call('detectfaces', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data)
});


app.get('/analyzeSentiment',function(reqst,respns){
	var data = {'text' : 'I like cats'}
	client.call('analyzesentiment', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data);
});




app.get('/ocrCheck',function(reqst,respns){
	data={'file':'./bowers.jpg'}
	client.call('ocrdocument', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data)

});


app.get('/analyzeSpeech',function(reqst,respns){
	data={'file':'./hpnext.mp4'};
	client.call('recognizespeech', function(err,resp,body){
		console.log(body);
		jobId=body.data.jobID;
		respns.send(body);
		respns.end();
	}, data,true)
});


app.get('/checkStatus',function(reqst,respns){
	request('http://api.idolondemand.com/1/job/status/'+jobId+'?apikey=f3129194-4f03-4419-80c2-f3aa041baf9a',function(err,res,body){
		respns.send(body);
		respns.end();
	});
});