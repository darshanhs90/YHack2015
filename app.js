var hod = require('havenondemand');
var request=require('request');
var apikey='f3129194-4f03-4419-80c2-f3aa041baf9a';
var client = new hod.HODClient('http://api.idolondemand.com', apikey);
var fs=require("fs");
var fpp = require('face-plus-plus');
fpp.setApiKey('b5e783aaf612ece56decaf2ae5e6f8c8');
fpp.setApiSecret('lI2k8MecfCg9jExmgTz4JcapfOj1MSP1');
var parameters = {
	attribute: 'gender,age',
	img : {
		value: fs.readFileSync('./family.jpg')
		, meta: {filename:'family.jpg'}
	}
};
fpp.post('detection/detect', parameters, function(err, res) {
	console.log(res);
});




/*var data = {'text' : 'I like cats'}
client.call('analyzesentiment', function(err,resp,body){
	console.log(body);
}, data);



data={'file':'./family.jpg',
'additional':'true'}


client.call('detectfaces', function(err,resp,body){
	console.log(body);
}, data)*/
/*var moveFrom = "./";
fs.readdir( moveFrom, function( err, files ) {
	if( err ) {
		console.error( "Could not list the directory.", err );
		process.exit( 1 );
	} 

	files.forEach( function( file, index ) {
                // Make one pass and make the fil
     console.log(file);

            });
});*/
/*request('https://api.idolondemand.com/1/api/sync/detectfaces/v1?url=https://www.havenondemand.com/sample-content/images/family.jpg&additional=true&apikey='+apikey,function (error, response, body){
		console.log(body);
	});
*/


