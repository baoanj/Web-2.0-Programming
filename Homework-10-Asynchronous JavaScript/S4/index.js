var ids = ['a', 'b', 'c', 'd', 'e'];

window.onload = function() {
    randomSort();
    $("#button").mouseleave(restart);
    $(".apb").click(trigger);
}

function trigger() {
    $(".apb").unbind();
    $(".button").css("background-color","gray");
    order(0);
}

function order(i) {
    if (i < 5) {
        $("#" + ids[i]).children("span").show();
        var temp = $($("#" + ids[i]).children("span"));
        $.get("getRandomNumber", function(data, status) {
            if (status === "success") {
                temp.html(data);
                order(i + 1);
            }
        });
    }
    sum();
}

function sum() {
    var sum = 0;
    for (var i = 0; i < 5; i++) {
        sum += parseInt($($(".random")[i]).html());
    }
    $(".info").html(sum).show();
}

function randomSort() {
    for (var i = 0; i < 5; i++) {
        var ran = Math.round(Math.random() * 4);
        var temp = ids[i];
        ids[i] = ids[ran];
        ids[ran] = temp;
    }
}

function restart() {
    $(".random").css("display","none");
    $(".button").css("background-color","rgb(33,73,158)");
    $(".apb").bind("click",trigger);
    $(".random").html("...").hide();
    $(".info").html('').hide();
    randomSort();
}