'use strict';

var app  = require( 'express' )();
var http = require( 'http' ).Server( app );
var io   = require( 'socket.io' )( http );

var clients = [];

io.on( 'connection', function ( client ) {

	clients.push( client );
	client.emit( 'message', { message : 'Connected to server..' } );

	client.on( 'message', function ( data ) {

		clients.forEach( function ( client ) {

			client.emit( 'message', data );

		} );

	} );

} );

app.get( '/', function( req, res ) {
	res.sendfile( './index.html' );
} );

http.listen( 3000, function () {
	console.log( 'app running on port 3000' );
} );
