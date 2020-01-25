const express = require('express');
const server = express();
// middleware
server.use(express.json());

server.use('/', (req, res) => {
	res.send(`<h2>let's get started</h2>`);
});

module.exports = server;
