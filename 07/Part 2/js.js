var rightEye = document.getElementById("righteye");
var leftEye = document.getElementById("lefteye");
var leftArm = document.getElementById("leftarm");

rightEye.addEventListener("click", moveUpDown);
leftEye.addEventListener("click", moveUpDown);
leftArm.addEventListener("click", moveRightLeft);


function moveUpDown(e) {
    var robotPart = e.target;
    var top = 0;

    var id = setInterval(frame, 10) // draw every 10ms

    function frame() {
        robotPart.style.top = top + '%';
        top++;
        if (top === 20) {
            clearInterval(id);
        }
    }

}


function moveRightLeft(e) {
    var robotPart = e.target;
    var left = 0;
    var id = setInterval(frame, 10) // draw every 10ms
    function frame() {
        robotPart.style.left = left + '%';
        left++;
        if (left === 70) {
            clearInterval(id);
        }
    }
}

var rightEye = document.getElementById("righteye");
var leftEye = document.getElementById("lefteye");
var leftArm = document.getElementById("leftarm");
var rightArm = document.getElementById("rightarm");
var nose = document.getElementById("nose");
var mouth = document.getElementById("mouth");
var body = document.getElementById("body");
var head = document.getElementById("head");
rightEye.addEventListener("mouseover", moveUpDown);
leftEye.addEventListener("mouseover", moveUpDown);
leftArm.addEventListener("mouseover", moveRightLeft);
rightArm.addEventListener("mouseover", moveUpDown);
nose.addEventListener("mouseover", moveLeftRight);
mouth.addEventListener("click", moveDownUp);
body.addEventListener("click", squeeze);
head.addEventListener("click", moveDecapitate);



function moveUpDown(e) {
    var robotPart = e.target;
    var top = 0;

    var id = setInterval(frame, 10) //draw every 10ms
    function frame() {
        robotPart.style.top = top + '%';
        top++;
        if (top === 20) {
            clearInterval(id);
        }
    }
}

function moveRightLeft(e) {
    var robotPart = e.target;
    var left = 0;

    var id = setInterval(frame, 10) //draw every 10ms
    function frame() {
        robotPart.style.left = left + '%';
        left++;
        if (left === 70) {
            clearInterval(id);
        }
    }
}

function moveLeftRight(e) {
    var robotPart = e.target;
    var left = 0;

    var id = setInterval(frame, 10) //draw every 10ms
    function frame() {
        robotPart.style.left = left + '%';
        left++;
        if (left === 45) {
            clearInterval(id);
        }
    }
}

function moveDownUp(e) {
    var robotPart = e.target;
    var top = 0;

    var id = setInterval(frame, 10) //draw every 10ms
    function frame() {
        robotPart.style.top = top + '%';
        top++;
        if (top === 70) {
            clearInterval(id);
        }
    }
}

function squeeze(e) {
    var robotPart = e.target;
    var width = 0;

    var id = setInterval(frame, 10) //draw every 10ms
    function frame() {
        robotPart.style.width = width + '%';
        width++;
        if (width === 45) {
            clearInterval(id);
        }
    }
}

function moveDecapitate(e) {
    var robotPart = e.target;
    var height = 0;

    var id = setInterval(frame, 10) //draw every 10ms
    function frame() {
        robotPart.style.height = height + '%';
        height++;
        if (height === 30) {
            clearInterval(id);
        }
    }
}