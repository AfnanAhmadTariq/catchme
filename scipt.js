var timeInterval = 3100;
var totalTime = 6000;
var time;
var intervalId;
var image;
var bodyWidth;
var bodyHeight;
var startX;
var startY;
var endX;
var endY;
var lvlname; 

//animation
var initialPosition;
var position;
var startTime;

//Start
function start() {
    document.getElementById('start').style.display = 'none';
    time = document.getElementById('time-remaining');
    bodyWidth = document.body.offsetWidth;
    bodyHeight = document.body.offsetHeight;
    var rect = document.getElementById('label').getBoundingClientRect();
    startX = rect.left + window.scrollX;
    startY = rect.top + window.scrollY;
    endX = rect.right + window.scrollX;
    endY = rect.bottom + window.scrollY;
    lvlname = document.getElementById('lvlname');
    if(time){
        const point = document.getElementById('points').getBoundingClientRect();
        endY = point.bottom + window.scrollY;
        updateTime();
    }
    else
        intervalId = setInterval(setRandomPosition, timeInterval);
}; 

// Private
function getRandomPosition() {
    var randomX = Math.floor(Math.random() * (bodyWidth - image.width));
    var randomY = Math.floor(Math.random() * (bodyHeight - image.height));
    return [randomX, randomY];
}       
function setRandomPosition() {
    position = getRandomPosition();
    while(position[0]>=startX && position[0]<=endX && position[1]>=startY && position[1]<= endY){
        position = getRandomPosition();
    }
    if(!time){
        var currentCordinates = image.getBoundingClientRect();
        initialPosition = [ 
            currentCordinates.left + window.scrollX,
            currentCordinates.top + window.scrollY
        ];
        startTime = null;
        requestAnimationFrame(animateImage);
    }
    else{
        image.style.left = position[0] + 'px';
        image.style.top = position[1] + 'px';
    }
}
function animateImage(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = timestamp - startTime;
    var percentage = Math.min(progress / (timeInterval-100) , 1);
    var currentPosition = [
        initialPosition[0] + (position[0] - initialPosition[0]) * percentage,
        initialPosition[1] + (position[1] - initialPosition[1]) * percentage
    ];
    image.style.left = currentPosition[0] + 'px';
    image.style.top = currentPosition[1] + 'px';
    
    if (progress < (timeInterval-100)) {
        requestAnimationFrame(animateImage);
    }
}
function updateTime(){
    currentTime = totalTime;
    intervalId = setInterval(function(){
        var minutes = Math.floor(currentTime / 6000) ;
        var seconds = Math.floor(currentTime / 100) ;
        var milliseconds = currentTime % 100;
        time.textContent = formatTime(minutes) + ":" + formatTime(seconds) + ":" + formatTime(milliseconds);
        currentTime--;
        if (currentTime <= 0) {
            alert("Time Up, you lose!!");
            totalTime = 6000;
            currentTime = totalTime;
        }
    }, 10);
}
function formatTime(timeValue){
    return timeValue < 10 ? "0" + timeValue : timeValue;
}

// called on Action
function levelUp() {
    var level = document.getElementById('level');
    if(lvlname.innerText=="Final"){
        alert("Congratulations, You Won!!");
        level.innerText = 0;
        lvlname.innerText = "Level";
        clearInterval(intervalId);
        intervalId = setInterval(setRandomPosition, 3100);
        return;
    }
    var levelValue = parseInt(level.innerText);
    if((levelValue+1)==11){ 
        level.innerText = "level";
        lvlname.innerText = "Final";
        alert("Final Level up ahead!");
    }
    else
        level.innerText = levelValue + 1;
    if (timeInterval > 50) {
        switch (timeInterval) {
            case 3100:
                timeInterval = timeInterval - 700;
              break;
            case 2400:
                timeInterval = timeInterval - 500;
              break;
            case 1900:
                timeInterval = timeInterval - 300;
              break;
            case 1600:
                timeInterval = timeInterval - 200;
                break;
            case 200:
                timeInterval = timeInterval - 50;
                break;
            default:
                timeInterval = timeInterval - 200;
        }
        clearInterval(intervalId);
        intervalId = setInterval(setRandomPosition, timeInterval);
    }
    setRandomPosition();
}
function timeUp(){
    var counter = document.getElementById('counter');
    var counterValue = parseInt(counter.innerText);
    var level = document.getElementById('level');
    var levelValue = parseInt(level.innerText);
    var conditon;
    switch(levelValue){
        case 1:
            conditon = 25;
            break;
        case 2:
            conditon = 20;
            break;
        case 3:
            conditon = 15;
            break;
        case 4:
            conditon = 10;
            break;
        case 5:
            conditon = 10
            break;
        case 6:
            conditon = 5;
            break;
        case "Final":
            conditon = 1;
            break;
        default:
            conditon = 3;
    }
    if(counterValue>=conditon)
        pointUp(counter, true);
    else
        pointUp(counter,false);
    setRandomPosition();
}
function pointUp(counter, reset){
    if(reset){
        var message = "level Up!";
        clearInterval(intervalId);
        counter.innerText = 0;
        var level = document.getElementById('level');
        if(lvlname.innerText=="Final"){
            alert("Congratulations, You Won!!");
            level.innerText = 0;
            lvlname.innerText = "Level";
            totalTime = 6000;
            return;
        }
        var levelValue = parseInt(level.innerText);
        if((levelValue+1)==11){ 
            level.innerText = "level";
            lvlname.innerText = "Final";
            message = "Final Level up ahead!";
            totalTime = totalTime - 500;
        }
        else{
            level.innerText = levelValue + 1;
            totalTime = totalTime - 500;
        }
        alert(message);
        updateTime();
    }
    else{
        var value = parseInt(counter.innerText);
        counter.innerText = value + 1;
    }
}
function invert(){
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--backgorund');
    if(primaryColor=="black"){
        sessionStorage.setItem('mode', "light");
        document.documentElement.style.setProperty('--backgorund', 'white');
        document.documentElement.style.setProperty('--font', 'black');
        document.documentElement.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.1)');
        const face = document.getElementById('face');
        const icon = document.getElementById('icon');
        const backFaces = document.getElementById('background');
        const iconFaces = document.getElementsByClassName('iconFaces');
        if(backFaces){
            backFaces.style.filter = "invert(0)";
        }
        if(iconFaces){
            console.log('goia');
            for(var i=0; i<iconFaces.length; i++)
                iconFaces[i].style.filter = "invert(0)";
        }
        if(face)
            face.style.filter = "invert(0)";
        icon.style.filter = "invert(0)"
        document.body.style.cursor = 'url("pointers/Black-Arrow.png"), auto';
    }
    else{
        sessionStorage.setItem('mode', "dark");
        document.documentElement.style.setProperty('--backgorund', 'black');
        document.documentElement.style.setProperty('--font', 'white');
        document.documentElement.style.setProperty('--shadow', 'rgba(255, 255, 255, 0.1)');
        const face = document.getElementById('face');
        const icon = document.getElementById('icon');
        const backFaces = document.getElementById('background');
        const iconFaces = document.getElementsByClassName('iconFaces');
        if(backFaces){
            backFaces.style.filter = "invert(1)";
        }
        if(iconFaces)
            for(var i=0; i<iconFaces.length; i++)
                iconFaces[i].style.filter = "invert(1)";
        if(face)
            face.style.filter = "invert(1)";
        icon.style.filter = "invert(1)"
        document.body.style.cursor = 'url("pointers/Black-Arrow(inverted).png"), auto';
    }
    const mode = document.getElementById('invert');
    if(mode.innerText==="Dark Mode")
        mode.innerText = "Light Mode";
    else
        mode.innerText = "Dark Mode";
}

//Game Modes

function timed() {
    window.location.href = 'timed.html';
}
function leveled() {
    window.location.href = 'leveled.html';
}
function menu(open){
    var elements = document.getElementsByClassName("menu");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    if(open=="faces")
        document.getElementById('faces').style.display='block';
    else
        document.getElementById(open).style.display ='block';
}
function faces(source){
    document.getElementById('icon').src = source;
    sessionStorage.setItem('face', source);
}
function exitFaces(){
    document.getElementById('faces').style.display='none';
    document.getElementById('options').style.display ='block';
}
function back(){
  sessionStorage.setItem('back', "play");
  window.location.href = "index.html";
}
function exit(){
    alert("Press ctrl + W");
}

// //Event Listener
document.addEventListener('DOMContentLoaded', function() {
    image = document.getElementById('face');
    var source = sessionStorage.getItem('face');
    if(source){
        document.getElementById('icon').src = source;
        if(image)
            image.src = source;
    }
    var appearance = sessionStorage.getItem('mode');
    if(appearance)
        if(appearance=="dark")
            invert();
    var passedValue = sessionStorage.getItem('back');
    if (passedValue)
        menu(passedValue);
});