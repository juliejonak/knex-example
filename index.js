const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = process.env.PORT || 3300;

server.use(express.json());


server.post('/crayons', (req, res) => {
    const crayon = req.body;
    db('crayons').insert(crayon)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Unable to add crayon."
            })
        })
});

server.get('/crayons', (req, res) => {
    db('crayons')
        .then(rows => res.json(rows))
        .catch(err => {res.status(500).json({message: 'Unable to find crayons'})})
});

server.get('/crayons/:id', (req, res) => {
    const {id} = req.params;
    db('crayons').where('id', id)
        .then(crayon => res.json(crayon))
        .catch(err => res.status(500).json({ message: "Failed to fetch that crayon" }))
});

server.put('/crayons/:id', (req, res) => {
    const {id} = req.params;
    const crayon = req.body;
    db('crayons').where('id', id).update(crayon)
        .then(rowCount => {
            res.json(rowCount)
        })
        .catch(err => {res.status(500).json({ message: "Unable to update crayon" })})
});

server.delete('/crayons/:id', (req, res) =>{
    const {id} = req.params;
    db('crayons').where('id', id).del()
        .then(rowsDeleted => {res.status(201).json(rowsDeleted)})
        .catch(err => {res.status(500).json({ message: "Unable to delete this crayon" })})
});

server.listen(PORT, () => {
    console.log('it is aliiiiiive')
});