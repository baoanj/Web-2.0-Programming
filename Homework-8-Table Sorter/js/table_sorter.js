var judge = true, id, bac = "";

window.onload = function() {
	$("th").click(click);
}

function click() {
	id = "#" + $(this).parents("table")[0].id;
	check($(this));
	var value_array = new Array();
	create_array($(this), value_array);
	var origin_array = _.cloneDeep(value_array);
	table_sort(value_array, $(this));
	martch(value_array, origin_array);
}

function create_array(this_instead, value_array) {
	var table_index = parseInt(this_instead.index());
	for (var i = 0; i < $(id + " tbody tr").length; i++){
		value_array[i] = $(id + " tbody tr:eq("+i+") td").eq(table_index).html();
	}
}

function check(this_instead) {
	if (bac != this_instead.text()) {
		judge = true;
		$(id + " th").removeClass("th_class");
	}
	bac = this_instead.text();
	this_instead.addClass("th_class");
}

function table_sort(value_array, this_instead) {
	$(id + " img").remove();
	if (judge == true){
		value_array.sort(function(a, b) { return a < b ? -1 : 1; });
		img = "<img src = 'image/ascend.png'>";
	} else {
		value_array.sort(function(a, b) { return a > b ? -1 : 1; });
		img = "<img src = 'image/descend.png'>";
	}
	judge = !judge;
	this_instead.append(img);
}

function martch(value_array, origin_array) {
	var temp_array = new Array();
	for (var i = 0; i < value_array.length; i++)
		for (var j = 0; j < origin_array.length; j++)
			if(value_array[i] == origin_array[j]) temp_array[i] = $(id + " tbody tr").eq(j).html();
	for (var i = 0; i < value_array.length; i++) {
		$(id + " tbody tr").eq(i).html(temp_array[i]);
	}
}