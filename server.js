const express = require('express');
const server = express();
const projectsRouter = require('./routers/projectRouter/projectRouter.js');
const globalMiddleware = require('./globalMiddleware.js');

// middleware
server.use(express.json());
server.use(globalMiddleware.logger);

server.use('/api/projects', projectsRouter);
server.use('/', (req, res) => {
	res.send(`<h2>let's get started</h2>`);
});

module.exports = server;
