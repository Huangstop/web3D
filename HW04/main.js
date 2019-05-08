var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/HW04.html');
});

app.get ('/api', function (req, res) {

	var minX = req.query.minX;
	var minY = req.query.minY;
	var maxX = req.query.maxX;
	var maxY = req.query.maxY;
	var Cx = req.query.Cx;
	var Cy = req.query.Cy;
	var radius = req.query.radius;
		
	shelljs.exec('circleRect.exe ' + minX + ' ' + minY + ' ' + maxX + ' ' + maxY + ' ' + Cx + ' ' + Cy + ' ' + radius, function(status, output) {
	  console.log('Exit status:', status);
	  console.log('Program output:', output);

      var output = {
        status: status,
        output: output
      };

		
      /*
        The response header for supporting CORS:
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      */

	  res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });
	
	  res.write( JSON.stringify(output) );
	  res.end();

	});

});


// or simply
// app.listen (1337); 
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});
