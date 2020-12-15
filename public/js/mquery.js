// || JS Media Queries for "Looseleashdog"

// || Blog main description slice length

function adjustDescriptionMid(size) {
    let collection = document.getElementsByClassName("description");
    let element = document.getElementsByClassName("description");
    
    if (size.matches) { // If media query matches
        for (let i = 0; i < collection.length; i++ ) {
            element[i].innerText = collection[i].innerText.slice(0, 10);
        }
    } 

}

function adjustDescriptionLarge(large) {
    let collection = document.getElementsByClassName("description");
    let element = document.getElementsByClassName("description");
    
    if (large.matches) {
        for (let i = 0; i < collection.length; i++ ) {
            element[i].innerText = collection[i].innerText.slice(0, 200);
        }    
    }
}

var large = window.matchMedia("(max-width: 800px)");
var size = window.matchMedia("(max-width: 600px)");
adjustDescriptionMid(size) // Call listener function at run time
adjustDescriptionLarge(large) // Call listener function at run time

size.addListener(adjustDescriptionMid) // Attach listener function on state changes
large.addListener(adjustDescriptionLarge) // Attach listener function on state changes
