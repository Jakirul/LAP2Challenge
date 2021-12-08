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

module.exports = router;