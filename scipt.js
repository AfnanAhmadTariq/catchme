var timeInterval = 3000;
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
//Automatic
window.onload = function() {
    image = document.getElementById('face');
    time = document.getElementById('time-remaining');
    bodyWidth = document.body.offsetWidth;
    bodyHeight = document.body.offsetHeight;
    var label = document.getElementById('label');
    var rect = label.getBoundingClientRect();
    startX = rect.left + window.scrollX;
    startY = rect.top + window.scrollY;
    endX = rect.right + window.scrollX;
    endY = rect.bottom + window.scrollY;
    lvlname = document.getElementById('lvlname');
    if(time){
        var point = document.getElementById('points');
        var rectPoint = point.getBoundingClientRect();
        endY += rectPoint.bottom + window.scrollY;
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
    var position = getRandomPosition();
    while(position[0]>=startX && position[0]<=endX && position[1]>=startY && position[1]<= endY){
        position = getRandomPosition();
    }
    image.style.left = position[0] + 'px';
    image.style.top = position[1] + 'px';
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
        lvlname = "Level";
        clearInterval(intervalId);
        intervalId = setInterval(setRandomPosition, 3000);
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
            case 3000:
                timeInterval = timeInterval - 700;
              break;
            case 2300:
                timeInterval = timeInterval - 500;
              break;
            case 1800:
                timeInterval = timeInterval - 300;
              break;
            case 1500:
                timeInterval = timeInterval - 200;
                break;
            case 100:
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


//Game Modes

function startGameMode1() {
    window.location.href = 'timed.html';
  }
  
  function startGameMode2() {
    window.location.href = 'leveled.html';
  }