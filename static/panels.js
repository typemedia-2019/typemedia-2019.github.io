var sidebarPanel = document.getElementById("sidebar_panel");
var sidebarNav = document.getElementById("sidebar_nav");
var aboutButton = document.getElementById("sidebar_about");
var aboutPanel = document.getElementById("about_panel");
var dismissTarget = document.getElementById("about_fade");

var studentName = document.getElementById("student_name");
var studentNameInitial = "Type and Media 2019";
if (studentName) studentNameInitial = studentName.innerHTML;

var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var isNarrowDevice = deviceWidth < 640;
var isTouchMode = false;
if ("ontouchstart" in document.documentElement) isTouchMode = true;
var isIndexPage = sidebarNav.classList.contains('index');

window.onresize = updateWidthFlags;
isNarrowDevice && studentName ? studentName.innerHTML = 'Type and Media 2019' : null;

var navState = 0
var abtState = 0

function updateWidthFlags() {
    deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    isNarrowDevice = deviceWidth < 640;

    isNarrowDevice && studentName ? studentName.innerHTML = 'Type and Media 2019' : null;
    !isNarrowDevice && studentName ? studentName.innerHTML = studentNameInitial : null;

    updateStates(); // fixes some inconsistencies when the browser is resized with a menu open
}

function updateStates() {
    if (isIndexPage) {
        navState = 0
    }

    if (navState) {
        sidebarNav.classList.add('deployed');
        dismissTarget.classList.add('deployed');
        studentName ? studentName.innerHTML = 'Type and Media 2019' : null;
    } else {
        sidebarNav.classList.remove('deployed');
        !isNarrowDevice && studentName ? studentName.innerHTML = studentNameInitial : null;
    }

    if (abtState) {
        aboutPanel.classList.add('deployed');
        dismissTarget.classList.add('deployed');
        studentName ? studentName.innerHTML = 'Type and Media 2019' : null;
        aboutButton.innerHTML = 'Return';
    } else {
        aboutPanel.classList.remove('deployed');
        aboutButton.innerHTML = 'About';
    }

    if (!navState && !abtState) {
        dismissTarget.classList.remove('deployed');
    }
}

dismissTarget.addEventListener('click', function() {
    navState = 0;
    abtState = 0;
    updateStates();
});

aboutButton.addEventListener('click', function() {
    abtState ? abtState = 0 : abtState = 1;
    navState = 0;
    updateStates();
});

if (isTouchMode) {
    dismissTarget.classList.add("touchmode");
    sidebarPanel.addEventListener('click', function(e) {
        // Skip the nav menu and go straight to the homepage on small screens
        // or go to the homepage if the nav is already open
        if (!isNarrowDevice) {
            if (!navState && !abtState) {
                e.preventDefault();

                abtState = 0;
                navState = 1;
                updateStates();
            }
        }
    });
} else {
    sidebarPanel.addEventListener('mouseenter', function() { if (!abtState) navState = 1; updateStates(); });
    sidebarPanel.addEventListener('mouseleave', function() { navState = 0; updateStates(); });
    sidebarNav.addEventListener('mouseenter', function() { if (!abtState) navState = 1; updateStates(); });
    sidebarNav.addEventListener('mouseleave', function() { navState = 0; updateStates(); });
}

// Shuffle everything in the nav panel
var navShuffle = document.getElementById('nav_shuffle');
var sessionNavOrder = sessionStorage.getItem('navOrder');

if (!sessionNavOrder) {
    for (var i = navShuffle.children.length; i >= 0; i--) {
        navShuffle.appendChild(navShuffle.children[Math.random() * i | 0]);
    }
    sessionNavOrder = String(navShuffle.innerHTML);
    sessionStorage.setItem('navOrder', sessionNavOrder);
} else {
    navShuffle.innerHTML = sessionNavOrder;
}