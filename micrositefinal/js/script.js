function media(x) {
    if (x.matches) { // If media query matches
        $('.main-image').attr('src', 'images/eteladnan.png');
    } else {
        $('.main-image').attr('src', 'images/untitled2014/painting.png');
    }
}

var x = window.matchMedia("(max-width: 768px)")
media(x) // Call listener function at run time
x.addListener(media) // Attach listener function on state ch