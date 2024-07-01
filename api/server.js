const express = require('express');
const projectsRouter = require('../api/projects/projects-router');
const actionsRouter = require('../api/actions/actions-router');

const server = express();

server.use(express.json());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is up and running!' });
});

module.exports = server;
