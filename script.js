
const container = document.getElementById('container');

let intervalID;
let trailing = [];

let snekColor = "black";
let speed = 50;
let longness = 3;
let curX = 50;
let curY = 50;

document.addEventListener("keydown", changeDirection);

function changeDirection(dir) {
    if (dir.keyCode === 38 || dir.code === "KeyW"){ //upArrow
        clearInterval(intervalID);
        intervalID = setInterval(moveSnek, speed, "up"); 
    } else if (dir.keyCode === 40 || dir.code === "KeyS") { //downArrow
        clearInterval(intervalID);
        intervalID = setInterval(moveSnek, speed, "down");
    } else if (dir.keyCode === 37 || dir.code === "KeyA") { //leftArrow
        clearInterval(intervalID);
        intervalID = setInterval(moveSnek, speed, "left"); 
    } else if (dir.keyCode === 39 || dir.code === "KeyD") { //rightArrow
        clearInterval(intervalID);
        intervalID = setInterval(moveSnek, speed, "right");
    } else if (dir.keyCode === 32) { //space
        snekFood();
        clearInterval(intervalID);
    }
}

//make the divs
for (let y = 1; y <= 100; y++) {
    for (let x = 1; x <= 100; x++) {
        window["snek" + y + "x" + x] = document.createElement('div');
        container.appendChild(window["snek" + y + "x" + x]);
        window["snek" + y + "x" + x].setAttribute("id", "snek" + y + "x" + x);
        window["snek" + y + "x" + x].style['grid-row'] = x;
        window["snek" + y + "x" + x].style['grid-column'] = y;
    }
}
//edges
for (let i = 1; i <= 100; i++) {
    window["snek1x" + i].style['background-color'] = "black";
    window["snek100x" + i].style['background-color'] = "black";
    window["snek" + i +"x1"].style['background-color'] = "black";
    window["snek" + i +"x100"].style['background-color'] = "black";
}

let food = snekFood();

function moveSnek(dir) {  
    if (curX < 2 || curX > 99 || curY < 2 || curY > 99) {
        crash();
    }
    if (trailing.indexOf(window["snek" + curY + "x" + curX]) !== -1) {
        crash();
    }
    if (food === window["snek" + curY + "x" + curX]) {
        food.style['background-color'] = "white";
        longness++;
        food = snekFood();
    }
    if (dir === "up") {
        window["snek" + curY + "x" + curX].style['background-color'] = snekColor;
        trail(window["snek" + curY + "x" + curX]);
        curX--; 
    } else if (dir === "left") {
        window["snek" + curY + "x" + curX].style['background-color'] = snekColor;
        trail(window["snek" + curY + "x" + curX]);
        curY--; 
    } else if (dir === "down") {
        window["snek" + curY + "x" + curX].style['background-color'] = snekColor;
        trail(window["snek" + curY + "x" + curX]);
        curX++; 
    } else if (dir === "right") {
        window["snek" + curY + "x" + curX].style['background-color'] = snekColor;
        trail(window["snek" + curY + "x" + curX]);
        curY++; 
    }
}

function snekFood() {
    let x = (Math.floor(Math.random() * 97) + 2);
    let y = (Math.floor(Math.random() * 97) + 2);
    window["snek" + y + "x" + x].style['background-color'] = "green";
    return window["snek" + y + "x" + x];
}

function trail(div) {
    trailing.push(div);
    if (trailing.length >= longness) {
        trailing[0].style['background-color'] = "white";
        trailing.shift();
    }
}

function crash() {
    clearInterval(intervalID);
    alert("Crash!");
    curX = 30;
    curY = 30;
    for (let i = 1; i < longness; i++) {
        trailing[0].style['background-color'] = "white";
        trailing.shift();
    }
    longness = 3;
}
