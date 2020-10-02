let x = 0;

function scrollWinRight() {
    document.getElementById("scroll-pane").scrollTo((x + 300), 0);
    x = x + 300;

}

function scrollWinLeft() {

    document.getElementById("scroll-pane").scrollTo((x - 300), 0);
    x = x - 300;
}




// Add active class to the current button (highlight it)

// console.log(window.location.pathname);

// if ( window.location.pathname === "/photos" ) {
//     console.log("hi");
//     window.document.getElementById("photos").addClass("active");
// }

// var header = document.getElementById("navbar");
// var btns = header.getElementsByTagName("li");
// for (var i = 0; i < btns.length; i++) {
//     btns[i].addEventListener("click", function () {
//         var current = document.getElementsByClassName("active");
//         current[0].className = current[0].className.replace(" active", "");
//         this.className += " active";
//     });
// }