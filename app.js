var connect = require('connect')
  , geoip = require('geoip')
  , config = require('config');

var city = new geoip.City('./data/GeoLiteCity.dat');
var ip = '';

//
// Creating HTTP Server
//
var server = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(function(req, res){

  	// sanitize
  	ip = req.url.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g);

  	// then geoip
  	if (null != ip) {
  	
	  	city.lookup(ip, function(err, d) {
	    	if (null != d) {
	    		res.writeHead(200, {
	  	  		'Content-Type': 'text/plain'
	  	  	});
	        res.end(JSON.stringify(d));
				} else {
					res.writeHead(404, {
	  	  		'Content-Type': 'text/plain'
	  	  	});
	  	  	res.end('No localization found.');
				}
	    });

	   } else {

	   	// bad request : no ip found in the URI
	   	res.writeHead(400, {
	  	 	'Content-Type': 'text/plain'
	  	});
	  	res.end('No IP address found in the URI.');

	   }

  })
  .listen(config.http_port);

console.log('Server running on port : ' + config.http_port);