{
    let scrollCount = 0;

    function scrollWinRight() {
        if (scrollCount < 2100) {
            document.getElementById("scroll-pane").scrollTo((scrollCount + 300), 0);
            scrollCount = scrollCount + 300;
        } else {
        }
    }

    function scrollWinLeft() {
        if (scrollCount > 0) {

            document.getElementById("scroll-pane").scrollTo((scrollCount - 300), 0);
            scrollCount = scrollCount - 300;
        }
    }
}