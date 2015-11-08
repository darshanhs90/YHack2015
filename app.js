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
			value: fs.readFileSync('../../../EHARIHS/Downloads/test.jpg')
			, meta: {filename:'test.jpg'}
		}
	};
	fpp.post('detection/detect', parameters, function(err, res) {
		console.log(res);
		respns.send(res);
		fs.unlinkSync('../../../EHARIHS/Downloads/test.jpg');
		respns.end();
	});
});



app.get('/facedetectCheck',function(reqst,respns){

	data={'file':'../../../EHARIHS/Downloads/test.jpg',
	'additional':'true'}

	client.call('detectfaces', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data)
});

var sentimentText='';
app.get('/analyzeSentiment',function(reqst,respns){
	var data = {'text' : sentimentText};
	console.log(sentimentText);
	client.call('analyzesentiment', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data);
});



var text='';
app.get('/extracttext',function(reqst,respns){
	data={'file':'./res.pdf'}
	client.call('extracttext', function(err,resp,body){
		respns.send(body);
		text=body.document[0].content;
		respns.end();
	}, data)

});


app.get('/analyzeSpeech',function(reqst,respns){
	data={'file':'./test.wav'};
	client.call('recognizespeech', function(err,resp,body){
		console.log(body);
		jobId=body.data.jobID;
		respns.send(body);
		fs.unlinkSync('./test.wav');
		respns.end();
	}, data,true)
});


app.get('/checkStatus',function(reqst,respns){
	request('http://api.idolondemand.com/1/job/status/'+jobId+'?apikey=f3129194-4f03-4419-80c2-f3aa041baf9a',function(err,res,body){
		console.log(JSON.parse(body).actions);
		respns.send(JSON.parse(body));
		sentimentText=JSON.parse(body).actions[0].result.document[0].content;
		respns.end();
	});
});

app.get('/conceptExtraction',function(reqst,respns){
	data={'text':text}
	client.call('extractconcepts', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data)

});

app.get('/extractentities',function(reqst,respns){
	data={'text':text,'entity_type':['companies_eng','organizations','places_eng','professions','universities','person_fullname_eng','number_phone_us','internet','internet_email']}
	client.call('extractentities', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data)

});