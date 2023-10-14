var time = 3000;
var intervalId;
var image;
var bodyWidth;
var bodyHeight;
var startX;
var startY;
var endX;
var endY;
var lvlname;
window.onload = function() {
    image = document.getElementById('face');
    bodyWidth = document.body.offsetWidth;
    bodyHeight = document.body.offsetHeight;
    var label = document.getElementById('label');
    var rect = label.getBoundingClientRect();
    startX = rect.left + window.scrollX;
    startY = rect.top + window.scrollY;
    endX = rect.right + window.scrollX;
    endY = rect.bottom + window.scrollY;
    lvlname = document.getElementById('lvlname');
};  
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
setRandomPosition();
intervalId = setInterval(setRandomPosition, time);
function levelUp() {
    var element = document.getElementById('level');
    if(lvlname=="Final"){
        alert("Congratulations, You Won!!");
        element.innerText = 0;
        lvlname = "Level";
        clearInterval(intervalId);
        intervalId = setInterval(setRandomPosition, 3000);
        return;
    }
    var value = parseInt(element.innerText);
    value = value + 1;
    if(value==11){
        value = "level";
        lvlname.innerText = "Final";
    }
    element.innerText = value;
    if (time > 50) {
        switch (time) {
            case 3000:
                time = time - 700;
              break;
            case 2300:
                time = time - 500;
              break;
            case 1800:
                time = time - 300;
              break;
            case 1500:
                time = time - 200;
                break;
            case 100:
                time = time - 50;
                break;
            default:
                time = time - 200;
        }
        setRandomPosition();
        clearInterval(intervalId);
        intervalId = setInterval(setRandomPosition, time);
    }
}


