const Post = require('../model/Post')
const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/', async(req, res) => {
    try {
        const post = await Post.all;
        res.status(200).send(post)

    } catch (err) {
        res.status(500).send(err)
    }
}) 

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id);
        res.status(200).send(post)

    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/', async(req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).send(post)

    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router;