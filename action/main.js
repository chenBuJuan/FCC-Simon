var colors, audio, level, start, strict;
var order, levelNum, checkIndex;
var bStrict;

$(document).ready(function(){
    colors = $("#colors>div");
    audio = $("#colors>audio");
    level = $("#level>span");
    start = $("#start>button");
    strict = $("#strict");

    order = [];
    levelNum = 0;
    checkIndex = 0;
    bStrict = false;
    
    $.each(colors, function(key, value){
        value.index = key + 1;
        $(value).bind("click", colorClick);
    });

    start.bind("click", initGame);
    strict.bind("click", strictClick);
});

function colorClick(key){
    audio.attr("src", "audio/simonSound" + this.index + ".mp3");
    $(this).addClass("colorClick");
    setTimeout(() => {
        $(this).removeClass("colorClick");
    }, 500);
}
function strictClick(){
    if(bStrict){
        bStrict = false;
        tip("Normal Mode");

        $(this).find("div").css({
            "left": "3px",
            "background-color": "#b1b1a5"
        });
    }else{
        bStrict = true;
        tip("Strict Mode");

        $(this).find("div").css({
            "left": "15px",
            "background-color": "#f3f309"
        });
    }
}
function setNum(){
    if(levelNum < 10){
        return "0" + levelNum;
    }else{
        return levelNum;
    }
}
function initGame(){
    $(this).addClass("startClick");
    setTimeout(() => {
        $(this).removeClass("startClick");
    }, 300);

    levelNum = 0;
    level.text("--");
    order = [];
    checkIndex = 0;

    $.each(colors, function(key, value){
        $(value).unbind("click", checkOrder);
    });
    
    gameContinue();
}
function gameContinue(){
    levelUp();
    play();
}
function levelUp(){
    levelNum++;
    if(levelNum == 21){
        win();
    }
    level.text(setNum(levelNum));
    order.push(Math.round(Math.random() * 3));
}
function play(){
    tip("Remember")
    display();
    check();
}
function display(){
    for(let i in order){
        setTimeout(() => {
            $(colors[order[i]]).trigger("click");
        }, 600 * i);
    }
}
function check(){
    setTimeout(() => {
        checkIndex = 0;
        $.each(colors, function(key, value){
            $(value).bind("click", checkOrder);
        });
    }, 600 * order.length);
}
function checkOrder(){
    if(this.index == order[checkIndex] + 1){
        correctClick();
    }else if(bStrict){
        $.each(colors, function(key, value){
            $(value).unbind("click", checkOrder);
        });
        gameover();
    }else{
        $.each(colors, function(key, value){
            $(value).unbind("click", checkOrder);
        });
        warning();
        tip("Wrong Click!");
        setTimeout(() => {
            play();
        }, 1000);
    }
}
function correctClick(){
    checkIndex++;
    tip("Correct");
    if(checkIndex == order.length){
        $.each(colors, function(key, value){
            $(value).unbind("click", checkOrder);
        });
        setTimeout(() => {
            gameContinue();
        }, 1000);
    }
}
function win(){
    warning();
    tip("You Win!");
}
function gameover(){
    warning();
    tip("You Lose!");
}
function tip(mes){
    $("#tip>span").text(mes);
}
function warning(){
    var temp = level.text();
    level.text("!!");
    level.addClass("warning");
    setTimeout(() => {
        level.text(temp);
        level.removeClass("warning");
    }, 1000);
}