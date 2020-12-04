

// || curator carousel control buttons 

function curatorLeft() {
    document.getElementById("curator-slider").scrollBy(-310, 0);
}

function curatorRight() {
    document.getElementById("curator-slider").scrollBy(310, 0);
}

document.getElementById("curator-hover").addEventListener("mouseover", function () {
    document.getElementById("left-button").style.opacity = "1";
    document.getElementById("right-button").style.opacity = "1";
});

document.getElementById("curator-hover").addEventListener("mouseout", function () {
    document.getElementById("left-button").style.opacity = "0.2";
    document.getElementById("right-button").style.opacity = "0.2";
});



function formFieldCheck() {
    let name = document.forms["contact"]["user_name"].value;
    let email = document.forms["contact"]["user_email"].value;
    let message = document.forms["contact"]["message"].value;
    let elem = document.getElementById("contact-button");
    
    if (name == "" || email == "" || message == "") {
        elem.style.backgroundColor = "var(--theme-lightgreen-alt)";
        elem.style.pointerEvents = "none";
    } else {
        elem.style.backgroundColor = "var(--theme-green)";
        elem.style.pointerEvents = "auto";
    }
}
