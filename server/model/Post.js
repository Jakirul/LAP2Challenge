const db = require('../db/init')

class Post {
    constructor(data) {
        this.id = data.id,
        this.title = data.title,
        this.pseudonym = data.pseudonym,
        this.body = data.body,
        this.date = data.date
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const post = await db.query("SELECT * FROM posts");
                const posts = post.rows.map(a => ({ id: a.id, title: a.title, pseudonym: a.pseudonym, body: a.body, date: a.date  }))
                resolve(posts)

            } catch (err) {
                reject("Could not retrieve any posts!")
            }
        })
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query('SELECT * FROM posts WHERE id = $1;', [ id ]);
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
                // date(now())
                let postData = await db.query('INSERT INTO posts (title, pseudonym, body, date) VALUES ($1, $2, $3, date(now())) RETURNING *;', [ title, pseudonym, body]);
                let post = await new Post(postData.rows[0]);
                
                resolve (post);
            } catch (err) {
                reject('Post could not be created');
            };
        });
    };


}

module.exports = Post