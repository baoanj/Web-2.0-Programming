var circles = document.getElementsByTagName("button");
var t;
var score = 0;  // 统计分数
var time = 15;  // 计时
var start_stop = false;  // 判断开始或停止

window.onload = function() {
	for (var i = 0; i < 20; i++) {  // 向游戏区域创建元素
		var para = document.createElement("button");
	    var element=document.getElementById("gamearea");
	    element.appendChild(para);
    }
	document.getElementById("box1").onclick = function() {
		if (start_stop == true) clear();
		if (start_stop == false) clearTimeout(t);
		start_stop = !start_stop;
		start();
		timedCount();
		state();
	}
    for (var i = 0; i < circles.length; i++) {
    	clickmole(i);
    }
}

function start() {
	if (score == 0) document.getElementById("box4").innerHTML = score;
	if (start_stop == true) {
		if (time == -1) {
			time = 15;
			score = 0;
			document.getElementById("box4").innerHTML = score;
		}
		getrandom();
	}
}

// 报告现在游戏的状态
function state() {
	var x = document.getElementById("box3");
	if (start_stop == true) {
		x.innerHTML = "playing..";
	} else if (start_stop == false && time != -1) {
		x.innerHTML = "pause";
	} else {
		x.innerHTML = "game over";
	}
}

// 计时
function timedCount()
{
	if (start_stop == true && time != -1) {
		document.getElementById("box2").innerHTML = time;
	    time -= 1;
	    t = setTimeout(timedCount, 1000);
	} else if (start_stop == true && time == -1) {
		clearTimeout(t);
		clear();
		start_stop = false;
		state();
		alert("Game Over!\nYour score is: " + score);
	}
}

// 点击游戏区域按钮发生的情形
function clickmole(i) {
	circles[i].onclick = function() {
    	if (start_stop == true && time != -1) {
    		getscore(i);
    	}
    }
}

function getrandom() {
	t = setTimeout(random, 0.1);
}

// 点击按钮得到分数并显示下一个可点击按钮
function getscore(i) {
	if (circles[i].style.backgroundColor == "blue") {
		score += 1;
		circles[i].innerHTML = "+1";
		t = setTimeout(inner, 110);
		t = setTimeout(clear, 0.1);
		t = setTimeout(random, 0.1);
	} else {
		circles[i].innerHTML = "-1";
		t = setTimeout(inner, 110);
		score -= 1;
	}
	document.getElementById("box4").innerHTML = score;
}

// 清空按钮中的文本
function inner() {
	for (var i = 0; i < circles.length; i++) {
		circles[i].innerHTML = "";
	}
}

// 产生随机数从而在游戏区域按钮中随机显示
function random() {  
	if (start_stop == true) {
		var ran = Math.floor(Math.random()*20);
		circles[ran].style.backgroundColor = "blue";
	}
}

// 游戏区域全部按钮恢复原色
function clear() {
	for (var i = 0; i < circles.length; i++) {
		circles[i].style.backgroundColor = "#C8C8C8";
	}
}