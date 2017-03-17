var puz = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var blank = 16, flag = false, count = 0;

window.onload = function() {
	for (var i = 1; i < 17; i++) {
		var para = document.createElement("div");
	    var element = document.getElementById("puzzle");
	    para.id = "part_" + i;
	    para.className = "puzzle part_" + i;
	    element.appendChild(para);
    }
    document.getElementById("restart").onclick = begin;
    document.onkeydown = showkey;
}

function begin() {
	flag = true;
	count = 0;
	document.getElementById("display").innerHTML = "";
	Initialization();
    for (var i = 1; i < 17; i++) {
    	document.getElementById("part_" + i).onclick = click;
    }
}

function click() {
	var id = event.target.id;
    onmove(id);
}

function Initialization() {
	flag = true;
	for (var i = 0; i < 16; i++) {
		document.getElementById("part_" + puz[i]).className = "puzzle part_" + puz[i];
	}
	puz = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
	blank = 16;
	for (var i = 0; i < 4; i++) {
		var ran = Math.round(Math.random() * 3 + 1);
		var temp;
		if (ran == 1) {
            temp = blank - 4;
            if (temp <= 0) temp = blank;
		} else if (ran == 2) {
			temp = blank + 4;
			if (temp > 16) temp = blank;
		} else if (ran == 3) {
			temp = blank - 1;
			if (temp <= 0 || (blank - 1)%4 == 0) temp = blank;
		} else {
			temp = blank + 1;
			if (temp > 16 || blank%4 == 0) temp = blank;
		}
	    move(blank, temp);
	    var swap = puz[blank - 1];
	    puz[blank - 1] = puz[temp - 1];
	    puz[temp - 1] = swap;
	    blank = temp;
    }
}

function showkey() {
	var k = event.keyCode;
	if (k == 13) begin();
	if (flag == true && k > 36 && k < 41) key_onmove(k);
}

function key_onmove(key) {
	var swap;
    if (key == 37 && blank%4 != 0) {
    	move(blank, blank + 1);
    	swap = puz[blank - 1];
        puz[blank - 1] = puz[blank];
	    puz[blank] = swap;
    	blank++;
        count++;
    } else if (key == 38 && blank < 13) {
    	move(blank, blank + 4);
    	swap = puz[blank - 1];
        puz[blank - 1] = puz[blank + 3];
	    puz[blank + 3] = swap;
    	blank += 4;
        count++;
    } else if (key == 39 && blank%4 != 1) {
    	move(blank, blank - 1);
    	swap = puz[blank - 1];
        puz[blank - 1] = puz[blank - 2];
	    puz[blank - 2] = swap;
    	blank--;
        count++;
    } else if (key == 40 && blank > 4) {
    	move(blank, blank - 4);
    	swap = puz[blank - 1];
        puz[blank - 1] = puz[blank - 5];
	    puz[blank - 5] = swap;
    	blank -= 4;
        count++;
    }
    win();
}

function move(i, j) {
    var element_i = document.getElementById("part_" + puz[i - 1]);
    var element_j = document.getElementById("part_" + puz[j - 1]);
    element_i.className = "puzzle part_" + j;
    element_j.className = "puzzle part_" + i;
}

function onmove(id) {
	var i;
	if (flag == true) {
		for (i = 0; i < 16; i++) {
			if ("part_" + puz[i] == id) break;
		}
		if (i < 16) {
			i++;
			if (i - 4 == blank || i + 4 == blank || i - 1 == blank || i + 1 == blank) {
        	    move(i, blank);
        	    count++;
            	var swap = puz[blank - 1];
    	        puz[blank - 1] = puz[i - 1];
        	    puz[i - 1] = swap;
            	blank = i;
			}
		}
	}
	win();
}

function win() {
	var i;
	for (i = 0; i < 16; i++) {
		if (puz[i] != i + 1) break;
	}
	if (i == 16 && flag == true) {
		flag = false;
        document.getElementById("display").innerHTML = "成功！共移动了" + count + "次";
	}
}