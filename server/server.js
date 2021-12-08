const express = require('express');
const app = express();
const cors = require('cors');
const postController = require('./controllers/post')

app.use(cors())
app.use('/', postController)

app.get('/', (req, res) => {
    res.send("Hello world!")
})

module.exports = app;