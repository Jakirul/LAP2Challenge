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