// function to retrieve all the posts for potential future use
async function getAll(){
    try {
        const response = await fetch(`http://localhost:3000/`);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}

// function to retrieve a specific post by its ID
async function getItem(id) {
    try {
        const response = await fetch(`http://localhost:3000/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

// function that send the post details to the server and redirects to the post's route
async function post(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title: e.target.title.value, pseudonym: e.target.pseudonym.value, body: e.target.body.value})
        }
        
        const response = await fetch('http://localhost:3000/', options);
        const post = await response.json();
        window.location.hash = `#${post.id}`
    } catch (err) {
        console.warn(err);
    }
}

module.exports = {getAll, getItem, post}