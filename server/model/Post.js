const db = require('../db/init')

class Post {
    constructor(data) {
        this.post_id = data.post_id,
        this.title = data.title,
        this.pseudonym = data.pseudonym,
        this.body = data.body
    }
}

module.exports = Post