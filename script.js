//bug if food pops up on the snek it turns white after the snek moves off it

const container = document.getElementById('container');
const deaths = document.getElementById('deaths');
const hiScore = document.getElementById('score');
const longth = document.getElementById('length');
const spdRead = document.getElementById('speed');
const slow = document.getElementById('slow');
const med = document.getElementById('medium');
const fast = document.getElementById('fast');
const gameOver = document.getElementById('floater');

let intervalID;
let trailing = [];

let hiScoreCount = document.cookie;
let deathCount = 0;
let snekColor = "black";
let speed = 100;
let longness = 2;
let curX = 50;
let curY = 50;

if (!document.cookie) {
    document.cookie = 0;
}
function setCookie(score) {
    document.cookie = score;
}
console.log(document.cookie);

spdRead.lastElementChild.textContent = "MEDIUM";
longth.lastElementChild.textContent = longness - 1;
hiScore.lastElementChild.textContent = hiScoreCount;
deaths.lastElementChild.textContent = deathCount;

document.addEventListener("keydown", changeDirection);
slow.onclick = () => {
    speed = 200;
    spdRead.lastElementChild.textContent = "SLOW";
}
med.onclick = () => {
    speed = 100;
    spdRead.lastElementChild.textContent = "MEDIUM";
}
fast.onclick = () => {
    speed = 50;
    spdRead.lastElementChild.textContent = "FAST";
}

function changeDirection(dir) {
    gameOver.style.visibility = "hidden";
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
        food.style['border-radius'] = "0px";
        longness += 5;
        food = snekFood();
        longth.lastElementChild.textContent = longness - 1;
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
    window["snek" + y + "x" + x].style['border-radius'] = "20px";
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
    deathCount++;
    deaths.lastElementChild.textContent = deathCount;
    clearInterval(intervalID);
    gameOver.style.visibility = "visible";
    curX = 30;
    curY = 30;
    for (let i = 1; i < longness; i++) {
        trailing[0].style['background-color'] = "white";
        trailing.shift();
    }
    if (longness - 1 > hiScoreCount) {
        hiScoreCount = longness - 1;
        hiScore.lastElementChild.textContent = hiScoreCount;
        setCookie(hiScoreCount);
    }
    longness = 2;
    longth.lastElementChild.textContent = longness - 1;
}
