const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    db
    .select('*')
    .from('accounts')
    .then(accounts => {
        res.status(400).json(accounts)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

server.get('/:id', (req,res) => {
    db
    .select('*')
    .from('accounts')
    .where('id', req.params.id)
    .then(acc => {
        res.status(200).json(acc)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

module.exports = server;
