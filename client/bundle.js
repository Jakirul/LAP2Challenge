(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {getAll, getItem, post} = require('./requests');

window.addEventListener('hashchange', updateContent);
window.addEventListener('load', updateContent);

const form = document.querySelector("#form");
const postCont = document.querySelector("#post");

document.querySelector("#input-form").addEventListener('submit', post)

document.querySelector("#title").addEventListener('input', labelUpdate)
document.querySelector("#pseudonym").addEventListener('input', labelUpdate)

// Resets the hash to redirect to the home page
document.querySelector(".goBack").addEventListener('click', () => {
    window.location.hash = ''
});

// A function that hides or shows different elements of the page depending
// on whether there is a hash in the url or not
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

// A function that hides the form, shows the post, and in the case
// where the retrieved data is not defined due to error, it displays an error message
function showPost(data) {
    form.classList.add("hidden");
    postCont.classList.remove("hidden");
    if(typeof data !== 'undefined'){
        document.querySelector("#post-title").textContent = data.title;
        let dob = new Date(data.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let dobArr = dob.toLocaleDateString('en-GB', options)
        date1 = dobArr.split("T")
        document.querySelector("#post-name").textContent = `${data.pseudonym} • ${date1[0]}`;
        document.querySelector("#post-body").textContent = data.body;
    } else {
        document.querySelector("#post-title").textContent = 'There is no post in this path';
    }
}

// A function that makes sure the input to the function is in the correct format
function labelUpdate(e) {
    contentChecker(e.target)
}

// A function dealing with the fade in animation of the labels
function contentChecker(input) {
    let label = document.querySelector(`.label-${input.id}`);
    if(!input.value){
        label.classList.remove('fade');
        label.classList.add('fade-hide');
    } else {
        label.classList.remove('fade-hide');
        label.classList.add('fade');
    }
}
},{"./requests":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
