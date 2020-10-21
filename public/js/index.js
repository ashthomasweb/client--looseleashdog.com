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
        let x = document.getElementsByClassName("slick-track");
        const posts = Array.from(x[0].children);
        posts.forEach(imageCheck);

        function imageCheck(post) {
            if (post.firstChild.className == "j-text") {
                post.style.display = "none";
            }
        }
        // || END Text post error hide 

        // || Hashtag linking in-carosel, 

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
            post.addEventListener("click", overlay);
        }

        // || END Hashtag linking in-post and overlay 

        // || Instagram link overlay pane

        function overlay(e) {
            // console.log(this); // grabs html element from juicer-generated content
            // console.log(this.children[0].children[0].currentSrc); // post img url
            // console.log(this.children[1].children[1].children[0].innerHTML); // post html with links added
            // console.log(this.children[0].attributes.href.value); // link to instagram post
            // console.log(document.getElementById("instaBtn").attributes[3].value); // button link
          
            let originalCopy = this.children[1].children[1].children[0].innerHTML;
            let copy = originalCopy.split("<br>");
            console.log(copy[0]); // post copy
            console.log(copy[copy.length-1]); // post hashtags

            let postText = copy[0];
            let hashtags = copy[copy.length-1];
            let url = this.children[0].attributes.href.value;
            let imgSrc = this.children[0].children[0].currentSrc;

            document.getElementById("photo-overlay").style.display = "block";

            document.getElementById("photo-overlay-img").src = imgSrc;
            document.getElementById("photo-overlay-text").innerText = postText;
            document.getElementById("photo-overlay-links").innerHTML = hashtags;
            document.getElementById("instaBtn").attributes[3].value = "location.href='" + url + "'";
        }

        // || END Instagram link overlay pane 

        // || Arrow icon and slider width
        const arrows = Array.from(document.getElementsByClassName("slick-arrow"));
        arrows.forEach(addListener);

        function addListener(item) {
            item.addEventListener("click", arrowCounter);
        }
        let count = 0;
        arrows[0].style.display = "none";

        function arrowCounter(e) {
            if (e.srcElement.ariaLabel == "Previous" && count > 0) {
                count = count - 1;
            }
            if (e.srcElement.ariaLabel == "Next" && count < 4) {
                count = count + 1;
            }
            if (count > 0) {
                arrows[0].style.display = "inline-block";
            } else {
                arrows[0].style.display = "none";
            }
            if (count > 3) {
                arrows[1].style.display = "none";
            } else {
                arrows[1].style.display = "inline-block";
            }
        }
        // || Arrow icon and slider width END


    }, 1000);
}

juicerFeed();

function closeOverlay() {
    document.getElementById("photo-overlay").style.display = "none";
}
