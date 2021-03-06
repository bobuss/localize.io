Localize.io
===========

Ultra simple geoip service


Installation
------------

- Install [node.js](http://nodejs.org/) and [npm](http://npmjs.org/).
- Clone the repository: `git clone git://github.com/bobuss/localize.io.git && cd localize.io`
- Install the geoIP library: `brew install geoip`
- Install dependancies: `npm install`
- Install the MaxMind-s GeoIP database

		$ cd data && wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
		$ gunzip GeoLiteCity.dat.gz && cd ..

- Optionaly adapt the configuration by editing `config/default.yaml`
- Start the server: `node server.js`

Try it
------

You can test it with a browser or with curl

	$ curl -i http://localhost:8130/74.125.230.223

The server will response a 200 with a json

	HTTP/1.1 200 OK
	Content-Type: application/json
	Connection: keep-alive
	Transfer-Encoding: chunked

	{
		"country_code":"US",
		"country_code3":"USA",
		"country_name":"United States",
		"region":"CA",
		"city":"Mountain View",
		"postal_code":"94043",
		"latitude":37.4192008972168,
		"longitude":-122.05740356445312,
		"metro_code":807,
		"dma_code":807,
		"area_code":650,
		"continent_code":"NA"
	}

In case the given IP does not find a localization, the server will response a 404

	$ curl -i http://localhost:8130/127.0.0.1

	HTTP/1.1 404 Not Found
	Content-Type: application/json
	Connection: keep-alive
	Transfer-Encoding: chunked

	{"message":"No localization found."}

Finaly, a last case is provided if you mispealed the IP in the URI, by send us a 400

	$ curl -i  http://localhost:8130/127.0.0

	HTTP/1.1 400 Bad Request
	Content-Type: application/json
	Connection: keep-alive
	Transfer-Encoding: chunked

	{"message":"No IP address found in the URI."}

License
-------

(The MIT License)

Copyright (c) 2012 Bertrand Tornil <bertrand.tornil@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

This product includes GeoLite data created by MaxMind, available from http://maxmind.com/