const {getAll, getItem, post} = require('./requests');

window.addEventListener('hashchange', updateContent);
window.addEventListener('load', updateContent);

const form = document.querySelector("#form");
const postCont = document.querySelector("#post");

document.querySelector("#input-form").addEventListener('submit',submitForm)

function submitForm(e) {
    post(e);
}

async function updateContent(){
    let hash = window.location.hash.substring(1);
    if (hash) {
        let data = await getItem(hash);
        console.log(data)
        showPost(data);
    } else {
        document.querySelector("#post-title").textContent = "";
        document.querySelector("#post-name").textContent = "";
        document.querySelector("#post-body").textContent = "";
        form.classList.remove("hidden");
        postCont.classList.add("hidden");
    }      
}

function showPost(data) {
    form.classList.add("hidden");
    document.querySelector("#post-title").textContent = data.title;
    document.querySelector("#post-name").textContent = data.pseudonym;
    document.querySelector("#post-body").textContent = data.body;
    postCont.classList.remove("hidden");
}