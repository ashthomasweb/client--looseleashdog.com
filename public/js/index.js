// || homepage link box styles

function homeLinkStyle() {

    const cardLinks = Array.from(document.getElementsByClassName("card--home"));

    cardLinks.forEach(addHover);

    function addHover(card) {
        card.addEventListener("mouseover", functionA)
        card.addEventListener("mouseout", functionB)

        function functionA(card) {
            console.log(this);
            this.classList.add("card--home-hoverjs");
        }

        function functionB(card) {
            this.classList.remove("card--home-hoverjs");
        }
    }
}
homeLinkStyle();

// || curator carosel control buttons 

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

// || junior and rosie hover slideshow
function jrSlider() {
    let image = document.getElementById("junior-image");
    let imagesArray = ["./images/pluto.jpg", "./images/cincy.jpg", "./images/junior.jpg", "./images/rosie.jpg"];

    image.addEventListener("mouseover", hoverPhotoChange);
    image.addEventListener("mouseout", hoverOff);

    let i = 0;
    var timer;

    function photoChange() {
        i++;
        image.src = imagesArray[i];
        if (i < 3) {
            i++;
        } else {
            i = 0;
        };
    }

    function hoverPhotoChange() {
        image.src = imagesArray[i];
        timer = setInterval(photoChange, 3000);
    };

    function hoverOff() {
        clearInterval(timer);
        image.src = "./images/junior.jpg";
    }
}

jrSlider();

function rosieSlider() {
    let image = document.getElementById("rosie-image");
    let imagesArray = ["./images/pluto.jpg", "./images/cincy.jpg", "./images/junior.jpg", "./images/rosie.jpg"];

    image.addEventListener("mouseover", hoverPhotoChange);
    image.addEventListener("mouseout", hoverOff);

    let i = 0;
    var timer;

    function photoChange() {
        i++;
        image.src = imagesArray[i];
        if (i < 3) {
            i++;
        } else {
            i = 0;
        };
    }

    function hoverPhotoChange() {
        image.src = imagesArray[i];
        timer = setInterval(photoChange, 3000);
    };

    function hoverOff() {
        clearInterval(timer);
        image.src = "./images/rosie.jpg";
    }
}

rosieSlider();








// || new curator overlay - under construction
// function functionA() {
//     setTimeout(function(){ 
//         const array = Array.from(document.getElementsByClassName("crt-grid-post"));
//         array.forEach(functionB)
//         function functionB(post){
//             console.log(post.children[0].children[0].children[5].children[0].innerHTML);
//         }
//         console.log(array[0]);
//     }, 1000);
// }

// functionA();