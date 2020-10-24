// || navbar active link styling

function currentPage() {

    const links = Array.from(document.getElementsByClassName("nav-link"));

    links.forEach(checkActive);

    function checkActive(link) {
        let currentPage = window.location.href;
        if (currentPage == link.firstChild.parentNode.parentNode.href) {
            link.style.paddingBottom = "4px";
            link.style.borderBottom = "5px solid var(--theme-yellow)";
            link.style.color = "var(--theme-yellow)";
        }
    }
}
currentPage();

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

function juicerFeed() {

    setTimeout(function () {
      
        // || Text post error hide
        let x = document.getElementsByClassName("j-stack");
        // console.log(x[0].children);
        const posts1 = Array.from(x[0].children);
        const posts2 = Array.from(x[1].children);
        const posts = posts1.concat(posts2);

        // || Hashtag linking 
        posts.forEach(createHashLink);
        function createHashLink(post) {
            let postString = post.innerHTML;
            let splitString = postString.split("#");
            let tail = splitString[splitString.length - 1];
            let tailSplit = tail.split("</p>");
            tailSplit = "<a href='https://www.instagram.com/explore/tags/" + tailSplit[0] + "' target='__blank'>#" + tailSplit[0] + "</a></p>" + tailSplit[1];
            splitString[splitString.length - 1] = tailSplit;
            for (let i = 1; i < splitString.length - 1; i++) {
                let link = splitString[i];
                splitString[i] = "<a href='https://www.instagram.com/explore/tags/" + link + "' target='__blank'>#" + link + "</a>";
            }
            let replaceTemp = splitString.join();
            let replacementString = replaceTemp.replace(/,/g, "");
            post.innerHTML = replacementString;
            // overlay listener
            post.addEventListener("click", overlay);
        }

        // || Instagram link overlay pane
        function overlay(e) {
            // console.log(this); // grabs modified html element from juicer-generated content
            // console.log(this.children[0].children[0].currentSrc); // post img url
            // console.log(this.children[1].children[1].children[0].innerHTML); // post html with links added
            // console.log(this.children[0].attributes.href.value); // link to instagram post
            // console.log(document.getElementById("instaBtn").attributes[3].value); // button link

            let originalText = this.children[1].children[1].children[0].innerHTML;
            let splitText = originalText.split("<br>");
            // dynamic content objects
            let postText = splitText[0];
            let hashtags = splitText[splitText.length - 1];
            let url = this.children[0].attributes.href.value;
            let imgSrc = this.children[0].children[0].currentSrc;
            // insert content
            document.getElementById("photo-overlay").style.display = "block";
            document.getElementById("photo-overlay-img").src = imgSrc;
            document.getElementById("photo-overlay-text").innerText = postText;
            document.getElementById("photo-overlay-links").innerHTML = hashtags;
            document.getElementById("instaBtn").attributes[3].value = "location.href='" + url + "'";

        }


        // //stack length equalizer
        // console.log(document.getElementsByClassName("j-stack")[0].children)
        // function stackLength() {
        //     let stack = Array.from(document.getElementsByClassName("j-stack"));
        //     console.log(stack);
        //     stack2.forEach(functionA);
        //     function functionA(item){
        //         console.log(item.style);

        //     }


        // }
        // stackLength();




    }, 800);
}



function closeOverlay() {
    document.getElementById("photo-overlay").style.display = "none";
}

function curatorLeft() {
    document.getElementById("curator-slider").scrollBy(-300, 0);
}

function curatorRight() {
    document.getElementById("curator-slider").scrollBy(300, 0);
}










// // || Arrow icon and slider width
// let count = 0;
// const arrows = Array.from(document.getElementsByClassName("slick-arrow"));

// arrows.forEach(addListener);
// arrows[0].style.display = "none";
// function addListener(item) {
//     item.addEventListener("click", arrowCounter);
// }

// function arrowCounter(e) {
//     if (e.srcElement.ariaLabel == "Previous" && count > 0) {
//         count = count - 1;
//     }
//     if (e.srcElement.ariaLabel == "Next" && count < 4) {
//         count = count + 1;
//     }
//     if (count > 0) {
//         arrows[0].style.display = "inline-block";
//     } else {
//         arrows[0].style.display = "none";
//     }
//     if (count > 3) {
//         arrows[1].style.display = "none";
//     } else {
//         arrows[1].style.display = "inline-block";
//     }
// }


// clickPositionUp = e.pageX;
// if (Math.abs(clickPositionUp - clickPosition) < 15) {     



// || Mouse drag listener prevents overlay
// let clickPosition = 0;
// let clickPositionUp = 0;
// // let slickPosition = "";
// // let item;

// function trigger(e) {
//     clickPosition = e.pageX;
//     console.log("hi")
//     // console.log(e.path[4].children[0].style.cssText);

//     // slickPosition = e.path[4].children[0].style.left;
//     // console.log(slickPosition);


//     // e.path[4].children[0].style.left = slickPosition + "!important";
//     // e.path[4].children[0].style.cssText = slickPosition + "!important";

// }