const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const characterRoutes = require('./routes/characters');
const eventRoutes = require('./routes/events');

const port = 3001;

//// Initialize helmet, a connect-style middleware that impliments a handful of http security middleware for you
app.use(helmet());
//// Set bodyParser as default body parsing, and default configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//// Set varius default header configurations
app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

//// Here, we would set various pre-flight requests
// app.options('*', function(req, res) {
// 	res.send(200);
// });

//// Here, we initialize Node-side route handling
app.use(characterRoutes);

app.use(eventRoutes);

//// Here, we configure the server to listen on port 3001 for incoming requests
server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log('Listening on Port: ' + port);
});

module.exports = server;