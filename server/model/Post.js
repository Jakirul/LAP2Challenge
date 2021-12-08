const db = require('../db/init')

class Post {
    constructor(data) {
        this.post_id = data.post_id,
        this.title = data.title,
        this.pseudonym = data.pseudonym,
        this.body = data.body
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await db.query("SELECT * FROM posts");
                const posts = post.rows.map(a => ({ post_id: a.post_id, title: a.title, pseudonym: a.pseudonym, body: a.body  }))
                resolve(posts)

            } catch (err) {
                reject("Could not retrieve any posts!")
            }
        })
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query('SELECT * FROM posts WHERE post_id = $1;', [ id ]);
                let post = new Post(postData.rows[0]);
                resolve(post);
            } catch (err) {
                reject('Post not found!');
            };
        });
    };

    static create(postData1){
        return new Promise (async (resolve, reject) => {
            try {
                const {title, pseudonym, body} = postData1
                let postData = await db.query('INSERT INTO posts (title, pseudonym, body) VALUES ($1, $2, $3) RETURNING *;', [ title, pseudonym, body ]);
                let post = await new Post(postData.rows[0]);
                resolve (post);
            } catch (err) {
                reject('Post could not be created');
            };
        });
    };


}

module.exports = Post