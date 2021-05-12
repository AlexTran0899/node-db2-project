const express = require('express')

const carRouter = require('./cars/cars-router');

const server = express()

server.use(express.json());

server.use('/api/cars', carRouter);

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        note: 'server dont know how to handle this error, try something else',
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;
