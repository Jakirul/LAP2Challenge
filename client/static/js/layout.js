const {getAll, getItem, post} = require('./requests');

window.addEventListener('hashchange', updateContent);
window.addEventListener('load', updateContent);

const form = document.querySelector("#form");
const postCont = document.querySelector("#post");

document.querySelector("#input-form").addEventListener('submit',submitForm)

document.querySelector("#title").addEventListener('input', labelUpdate)
document.querySelector("#pseudonym").addEventListener('input', labelUpdate)

function submitForm(e) {
    post(e);
}

async function updateContent(){
    let hash = window.location.hash.substring(1);
    if (hash) {
        let data = await getItem(hash);
        showPost(data);
    } else {
        document.querySelector("#post-title").textContent = "";
        document.querySelector("#post-name").textContent = "";
        document.querySelector("#post-body").textContent = "";
        form.classList.remove("hidden");
        postCont.classList.add("hidden");
        contentChecker(document.querySelector('#title'))
        contentChecker(document.querySelector('#pseudonym'))
    }      
}

function showPost(data) {
    form.classList.add("hidden");
    document.querySelector("#post-title").textContent = data.title;
    date1 = data.date.split("T")
    document.querySelector("#post-name").textContent = `${data.pseudonym} • ${date1[0]}`;
    document.querySelector("#post-body").textContent = data.body;
    

    const btn = document.createElement("button");
    btn.textContent = "Go back"
    btn.addEventListener('click', () => {
        window.location.href = "index.html"
    })
    document.body.append(btn)
    postCont.classList.remove("hidden");
}

function labelUpdate(e) {
    contentChecker(e.target)
}

function contentChecker(input) {
    let label = document.querySelector(`.label-${input.id}`);
    if(!input.value){
        label.style.visibility = 'hidden';
    } else {
        label.style.visibility = 'visible';
    }
}