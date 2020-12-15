// || JS Media Queries for "Looseleashdog"

// || Blog main description slice length
let collection = Array.from(document.getElementsByClassName("description"));

let arr = [];

collection.forEach(post => arr.push(post.innerText));

let elements = document.getElementsByClassName("description");

function adjustDescriptionMid(size) {
    
    if (size.matches) { // If media query matches
        for (let i = 0; i < elements.length; i++ ) {
            elements[i].innerText = arr[i].slice(0, 10);
        } 
    
    } else {
        for (let i = 0; i < elements.length; i++ ) {
            elements[i].innerText = arr[i].slice(0, 250);
        } 
    }

}

var size = window.matchMedia("(max-width: 600px)");
adjustDescriptionMid(size) // Call listener function at run time
size.addListener(adjustDescriptionMid) // Attach listener function on state changes



















// function adjustDescriptionLarge(large) {
  
//     if (large.matches) {
//         for (let i = 0; i < collection.length; i++ ) {
//             element[i].innerText = collection[i].innerText.slice(0, 200);
//         }    
//     }
// }

// var large = window.matchMedia("(max-width: 800px)");
// adjustDescriptionLarge(large) // Call listener function at run time

// large.addListener(adjustDescriptionLarge) // Attach listener function on state changes