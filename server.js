const express = require('express');
const cors = require('cors');
const empiresRouter = require('./api/empires-router');
const server = express();

server.use(cors());
server.use(express.json());

server.use('/empires', empiresRouter);

server.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the Empire.',
	});
});

server.use((err, res, req, next) => {
	console.log(err);
	res.status(500).json({
		message: 'Something went wrong!',
	});
});

module.exports = server;
