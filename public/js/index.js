// || curator carosel buttons

{
    let scrollCount = 0;

    function scrollWinRight() {
        if (scrollCount < 2100) {
            document.getElementById("scroll-pane").scrollTo((scrollCount + 300), 0);
            scrollCount = scrollCount + 300;
        } else {}
    }

    function scrollWinLeft() {
        if (scrollCount > 0) {

            document.getElementById("scroll-pane").scrollTo((scrollCount - 300), 0);
            scrollCount = scrollCount - 300;
        }
    }
}

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
    // console.log(window.location.href);
    // console.log(links);
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
                        
            // card.relatedTarget.children[0].h2.style.color = "red";
            // card.fromElement.childNodes[1].style.borderBottom = "2px solid var(--theme-borders)";

        }

        function functionB(card) {
            // console.log(card.srcElement.childNodes[1]);
            // setTimeout(function(card){ 
            // }, 1000);
            this.classList.remove("card--home-hoverjs");

            // card.fromElement.childNodes[1].style.borderBottom = "2px solid var(--theme-lightblue)";
     

        }
    }
}

homeLinkStyle();