window.onload = function() {
    var y = document.getElementsByTagName("input");
    for (var i = 0; i < y.length; i++) {
    	clickfun(y[i]);
    }
}

function clickfun(y) {
	y.onclick = function() {
		calculatefun(y.value);
	}
}

var express = "";  // 全局变量，储存运算的表达式和结果
var judge = false, flag = false;  // 判断是否清除结果

function calculatefun(operator) {
	if (operator != "←" && operator != "CE" && operator != "=") {
		if (express == "0" && judge == true && flag == false) express = "";
		if (judge == true && operator != "+" && operator != "-" && operator != "*" && operator != "/") {
			express = "";
			judge = false;
		}
		flag = false;
		judge = false;
		// 在小数点前无数字的情况下自动补零
		if ((express == "" || express[express.length - 1] == "+" || express[express.length - 1] == "-" || express[express.length - 1] == "*" || express[express.length - 1] == "/" || express[express.length - 1] == "(" || express[express.length - 1] == ")") && operator == ".") express += "0";
		express += operator;
	}
	else if (operator == "←") {
        express = express.slice(0, express.length - 1);
        judge = false;
        if (express == "") express = "0", judge = true;
	}
	else if (operator == "CE") {
        express = "0";
        judge = true;
	}
	else if (operator == "=") {
		// 在表达式非法的时候抛出异常
		try {
			if (express.match("//")) throw SyntaxError;
			if (eval(express) == Infinity) throw SyntaxError;  // 除数不能为零，否则抛出异常
			express = eval(express);
			express = express.toString();
			judge = true;
			if (express == "0") flag = true;
		}
		catch(SyntaxError) {
			alert("表达式非法")
		}
	}
	document.getElementById("display").innerHTML = express;
}