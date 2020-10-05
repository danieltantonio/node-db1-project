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

server.post('/', (req,res) => {
    if(!req.body || !req.body.name || !req.body.budget) {
        return res.status(400).json({ message: 'Missing required field.' });
    }

    db('accounts')
    .insert(req.body, 'id')
    .then(account => {
        res.status(201).json(account);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

server.put('/:id', (req,res) => {
    db('accounts')
    .where('id', req.params.id)
    .update(req.body)
    .then(acc => {
        res.status(202).json(acc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

server.delete('/:id', (req,res) => {
    db('accounts')
    .where('id', req.params.id)
    .del()
    .then(acc => {
        res.status(202).json(acc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

module.exports = server;
