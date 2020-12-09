// JavaScript for "Looseleashdog"

// || Curator carousel control buttons 

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

// || Contact form field button color 

function formFieldCheck() {
    let name = document.forms["contact"]["user_name"].value;
    let email = document.forms["contact"]["user_email"].value;
    let message = document.forms["contact"]["message"].value;
    let elem = document.getElementById("contact-button");

    if (name == "" || email == "" || message == "") {
        elem.style.backgroundColor = "var(--theme-lightgreen)";
        elem.style.pointerEvents = "none";
    } else {
        elem.style.backgroundColor = "var(--theme-blue)";
        elem.style.pointerEvents = "auto";
    }
}

// || Hamburger Menu for "Looseleashdog"
// Would be best written with CSS animations or transitions.
// I used pure JS as an exercise.

function hamburger() {
    let bar1 = document.getElementById("h-bar1");
    let bar2 = document.getElementById("h-bar2");
    let bar3 = document.getElementById("h-bar3");
    let menu = document.getElementById("h-menu");

    function menuOpen() {

        let barsPos = 0;
        let barsRot = 0;
        let bar2Vis = 1;
        let menuPos = 20;

        let animA = setInterval(barMid, 8);
        function barMid() {
            if (bar2Vis < 0.1) {
                // normally clearInterval would be executed when value reaches 0, but due to bit arithmetic 0.1 - 0.1 is displayed in extended notation. 
                clearInterval(animA);
                // reset opacity to typical value for consistency
                bar2Vis = 0;
                bar2.style.opacity = bar2Vis;
            } else {
                bar2Vis = bar2Vis - 0.1;
                bar2.style.opacity = bar2Vis;
            }
        }

        setTimeout(function () {

            let animB = setInterval(barMove, 30);
            function barMove() {
                if (barsPos == 8) {
                    clearInterval(animB);
                } else {
                    barsPos++;
                    bar1.style.top = barsPos + "px";
                    bar3.style.bottom = barsPos + "px";
                }
            }

            setTimeout(function () {
                let animC = setInterval(barRotation, 2);
                function barRotation() {
                    if (barsRot == 45) {
                        clearInterval(animC);
                    } else {
                        barsRot++;
                        bar1.style.transform = "rotate(" + barsRot + "deg)";
                        bar3.style.transform = "rotate(-" + barsRot + "deg)";
                    }
                }
            }, 70);

        }, 50);

        let animD = setInterval(menuAppear, 1);
        function menuAppear() {
            if (menuPos == 65) {
                clearInterval(animD);
            } else {
                menuPos++;
                menu.style.top = menuPos + "px";
            }
        }

    }

    function menuClose() {

        let barsPos = 8;
        let barsRot = 45;
        let bar2Vis = 0;
        let menuPos = 65;

        setTimeout(function () {
            let animA = setInterval(barMid, 8);
            function barMid() {
                if (bar2Vis > 0.9) {
                    clearInterval(animA);
                } else {
                    bar2Vis = bar2Vis + 0.1;
                    bar2.style.opacity = bar2Vis;
                }
            }
        }, 150);
        
        let animB = setInterval(barMove, 30);
        function barMove() {
            if (barsPos == 0) {
                clearInterval(animB);
            } else {
                barsPos--;
                bar1.style.top = barsPos + "px";
                bar3.style.bottom = barsPos + "px";
            }
        }

        setTimeout(function () {
            let animC = setInterval(barRotation, 2);
            function barRotation() {
                if (barsRot == 0) {
                    clearInterval(animC);
                } else {
                    barsRot--;
                    bar1.style.transform = "rotate(" + barsRot + "deg)";
                    bar3.style.transform = "rotate(-" + barsRot + "deg)";
                }
            }
        }, 10);

        let animD = setInterval(menuAppear, 1);
        function menuAppear() {
            if (menuPos == 20) {
                clearInterval(animD);
            } else {
                menuPos--;
                menu.style.top = menuPos + "px";
            }
        }

    }

    if (document.getElementById("h-menu-input").checked == true) {
        menuOpen();
        document.getElementById("h-box").style.backgroundColor = "var(--theme-yellow)";
    } else {
        menuClose();
        document.getElementById("h-box").style.backgroundColor = "var(--theme-lightblue)";
    }
}

/* || END of document  */