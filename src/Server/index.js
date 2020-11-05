const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

const characterRoutes = require('./routes/characters');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users')

const mongoConnect = require('../Helper/database').mongoConnect;

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

app.use(userRoutes);

//// Here, we establish a connection with our MongoDb server and configure the server 
//// to listen on port 3001 for incoming requests
mongoConnect(() => {
	app.listen(port);
})
