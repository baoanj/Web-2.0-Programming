window.onload = function() {
    $(".button").click(trigger);
    $("#info-bar").click(sum);
    $("#button").mouseleave(restart);
}

function trigger() {
    $(this).children("span").show();
    $(".button").css("background-color","gray");
    $(".button").unbind();
    var temp = $($(this).children("span"));
    $.get("getRandomNumber", function(data, status) {
        if (status === "success") {
            temp.html(data);
            for (var i = 0; i < 5; i++) { 
                if ($($(".random")[i]).html() === "...") {
                    $($(".random")[i]).parent().css("background-color","rgb(33,73,158)");
                    $($(".random")[i]).parent().bind("click",trigger);
                }
            }
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
    $(".button").bind("click",trigger);
    $(".random").html("...").hide();
    $(".info").html('').hide();
}