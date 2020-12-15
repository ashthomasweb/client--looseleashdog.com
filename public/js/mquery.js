// || JS Media Queries for "Looseleashdog"

// || Blog main description slice length
let collection = document.getElementsByClassName("description");

let arr = Array.from(collection.forEach(element => element.innerText));
console.log(arr);
let element = document.getElementsByClassName("description");

function adjustDescriptionMid(size) {
    
    if (size.matches) { // If media query matches
        for (let i = 0; i < collection.length; i++ ) {
            element[i].innerText = element[i].innerText.slice(0, 10);
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