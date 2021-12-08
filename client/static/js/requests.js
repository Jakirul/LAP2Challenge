async function getAll(){
    try {
        const response = await fetch(`http://localhost:3000/`);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getItem(id) {
    try {
        const response = await fetch(`http://localhost:3000/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

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