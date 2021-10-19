// || Photo Page JS for "Looseleashdog"

// || Curator carousel control buttons 

function curatorLeft() {
    document.getElementById("curator-slider").scrollBy(-310.5, 0);
}

function curatorRight() {
    document.getElementById("curator-slider").scrollBy(310.5, 0);
}

document.getElementById("curator-hover").addEventListener("mouseover", function () {
    document.getElementById("left-button").style.opacity = "1";
    document.getElementById("right-button").style.opacity = "1";
});

document.getElementById("curator-hover").addEventListener("mouseout", function () {
    document.getElementById("left-button").style.opacity = "0.2";
    document.getElementById("right-button").style.opacity = "0.2";
});

// || END of document 
