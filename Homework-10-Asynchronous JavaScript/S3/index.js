var ids = ['a', 'b', 'c', 'd', 'e'];

window.onload = function() {
    $("#button").mouseleave(restart);
    $(".apb").click(trigger);
}

function trigger() {
    $(".apb").unbind();
    $(".button").children("span").show();
    $(".button").css("background-color","gray");
    for (var i = 0; i < 5; i++) order(i);
}

function order(i) {
    $.post("getRandomNumber", function(data, status) {
        if (status === "success") {
            $($("#" + ids[i]).children("span")).html(data);
            sum();
        }
    });
}

function sum() {
    var sum = 0;
    for (var i = 0; i < 5; i++) {
        sum += parseInt($($(".random")[i]).html());
    }
    $(".info").html(sum).show();
}

function restart() {
    $(".random").css("display","none");
    $(".button").css("background-color","rgb(33,73,158)");
    $(".apb").bind("click",trigger);
    $(".random").html("...").hide();
    $(".info").html('').hide();
}