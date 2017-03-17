var start = false;  // 是否经过开始框“S”
var cheatjudge = false;  // 是否移出游戏区域
var wall = ["wall1", "wall2", "wall3", "wall4", "wall5", "wall6", "wall6_1", "wall7", "wall8", "wall9"];  // 把游戏区域中所有墙的id放进数组

window.onload = function() {
    document.getElementById("start").onmouseover = function() {
    	start = true;
    	cheatjudge = false;
    	display("r");
    }
    for (var i = 0; i < wall.length; i++) {
    	move(wall[i]);
    }
    document.getElementById("end").onmouseover = function() {
        result();
    }
    document.getElementById("cheat").onmouseover = function() {
    	cheatjudge = true;
    }
}

// 游戏开始后碰到墙的后果
function move(id) {
	document.getElementById(id).onmouseover = function() {
    	if (start == true && cheatjudge == false) {
    		changewallover(id);
    		start = false;
    		display("l");
    	}
    }
    document.getElementById(id).onmouseout = function() {
    	changewallout(id);
    }
}

// 到结束框“E”时的游戏结果
function result() {
	if (cheatjudge == true && start == true) {
        display("c");
        cheatjudge = false;
        start = false;
	} else if (start == true) {
		display("w");
		start = false;
	}
}

// 游戏进行时碰到墙墙会变红
function changewallover(id) {
	document.getElementById(id).style.backgroundColor = "red";
}

// 移开墙恢复原色
function changewallout(id) {
	document.getElementById(id).style.backgroundColor = "#EEE";
}

// 游戏结果显示
function display(s) {
	var x = document.getElementById('display');
	if (s == "w") {
		x.innerHTML = "You Win";
	} else if (s == "l") {
		x.innerHTML = "You Lose";
	} else if(s == "c") {
		x.innerHTML = "Don't cheat,you should start from 'S' and move to the 'E' inside the maze!";
	} else if (s == "r") {
		x.innerHTML = "";
	}
}