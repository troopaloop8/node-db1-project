const express = require('express');
const router = express.Router();
const db = require('./data/dbConfig.js');


//CRUD STUFF
//GET

router.get('/', (req, res) => {
    db('accounts')
    .then(post => {
        if (post.length === 0){
            res.status(404).json({message: "no accounts exist..."})
        } else {
        res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong... ${err}`})
    })
})


//GET BY ID

router.get('/:id', ({params: {id}}, res) => {
    db('accounts').where({id})
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({message: "invalid id"})
        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong... ${err}`})
    })
})


//POST

router.post('/', (req, res) => {
    db('accounts').insert(req.body)
    .then(post => {
        res.status(201).json({message: `successfully added account`, post})
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong... ${err}`})
    })
})



//PUT

router.put('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts').where({id}).update(req.body)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({message: `invalid id`})
        } else {
            res.status(204).json({message: `successfully updated`, post})
        }
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong... ${err}`})
    })
})


//DELETE

router.delete('/:id', ({params: {id}}, res) => {
    db('accounts').where({id}).del()
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({message: `invalid id`})
        } else {
            res.status(200).json({message: `successfully deleted`, post})
        }
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong... ${err}`})
    })
})



//EXPORTS 

module.exports = router;