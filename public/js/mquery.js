// || JS Media Queries for "Looseleashdog"

// || Blog main description slice length
let collection = Array.from(document.getElementsByClassName("description"));

let arr = [];

collection.forEach(post => arr.push(post.innerText));

let elements = document.getElementsByClassName("description");

function adjustDescription(mid) {
    
    if (mid.matches) { 
        for (let i = 0; i < elements.length; i++ ) {
            elements[i].innerText = arr[i].slice(0, 170) + "...";
        } 
    } else {
        for (let i = 0; i < elements.length; i++ ) {
            elements[i].innerText = arr[i].slice(0, 230);
        } 
    }

}

let mid = window.matchMedia("(min-width: 769px) and (max-width: 875px)");

adjustDescription(mid);
mid.addListener(adjustDescription);


// || END of document 