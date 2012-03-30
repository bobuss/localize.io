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

      city.lookup(ip, function(err, data) {

        if (null != data) {

          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.end(JSON.stringify(data));

        } else {

          res.writeHead(404, {
            'Content-Type': 'text/plain'
          });
          res.end(JSON.stringify({
            status: 404,
            message: 'No localization found.'
          }));

        }
      });

     } else {

      // bad request : no ip found in the URI
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.end(JSON.stringify({
        status: 400,
        message: 'No IP address found in the URI.'
      }));

    }

  });

if (!module.parent) {
  // this is the main module
  server.listen(config.http_port);
  console.log('Server running on port : ' + config.http_port);
} else {
  module.exports = server;
}


