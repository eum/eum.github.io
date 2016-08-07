// /*#########################################
// * 以下Ajaxリストスクリプト
// #########################################*/

//初期化
$(".reader").css("display", "none");
var ep_num;

//Ajax関数

//個別関数
function ajaxGetHtml(ep_n) {
    var jqXHR = $.ajax({
        type: 'GET',
        url: './ep' + ep_n + '.html',
        dataType: 'html'
    });
    return jqXHR;
}

function back_ajaxGetHtml(ep_n) {
    if (ep_n === 1) {
        return;
    }
    var jqXHR = $.ajax({
        type: 'GET',
        url: './ep' + (ep_n - 1) + '.html',
        dataType: 'html'
    });
    return jqXHR;
}

function next_ajaxGetHtml(ep_n) {
    if (ep_n === 4) {
        return;
    }
    var jqXHR = $.ajax({
        type: 'GET',
        url: './ep' + (ep_n + 1) + '.html',
        dataType: 'html'
    });
    return jqXHR;
}

//主関数
function GetHtml(ep) {
    var getHtml = ajaxGetHtml(ep);
    // var getHtml_back = back_ajaxGetHtml(ep);
    // var getHtml_next = next_ajaxGetHtml(ep);

    // $.when(ajaxGetHtml(ep),back_ajaxGetHtml(ep),next_ajaxGetHtml(ep)).done(function(response1, response2, response3) {
    getHtml.done(function(response) {
        // $('#main').html(response2 + response1 + response3);
        $('#main').html(response);
        $('#main').attr("data-ep", ep);
        $(".reader").css("display", "block");
        $('#chapterlist').css("opacity", "0");
        ep_num = ep;
    });
}


//Ajaxイベントハンドラー
$("span[id^=list]").bind(
    "click",
    function(e) {
        var list_num = $(this).data("n");
        GetHtml(list_num);
        $("#arrow").css("display", "none");
        $("#navi--episode--backtolist").css("display", "none");
        arrow_flag = 0;
    });

$(document).on(
    "click", ".modal_close",
    function(e) {
        $(".reader").css("display", "none");
        $('#chapterlist').css("opacity", "1");

    });

// /*#########################################
// * 以下フリックイベント
// #########################################*/
var startX, startY;
var isTouch = ('ontouchstart' in window);
var touched = 0;


$("div#main").bind(
    'touchstart mousedown',
    function(e) {
        // e.preventDefault();
        startX = (isTouch ? e.originalEvent.changedTouches[0].pageX : e.pageX);
        startY = (isTouch ? e.originalEvent.changedTouches[0].pageY : e.pageY);
        touched = 1;
    });

$("div#main").bind(
    'touchend mouseup',
    function(e) {
        // e.preventDefault();

        if (touched !== 1) {
            return;
        }
        var endX = (isTouch ? e.originalEvent.changedTouches[0].pageX : e.pageX);
        var endY = (isTouch ? e.originalEvent.changedTouches[0].pageY : e.pageY);
        var dx = endX - startX;
        var dy = endY - startY;

        if (Math.abs(dy) < 70) {
            if (dx <= -200) {
                touched = 0;
                if (ep_num === 4) {
                    return;
                }
                GetHtml(ep_num + 1);
                $("#arrow").css("display", "none");
                $("#navi--episode--backtolist").css("display", "none");
                arrow_flag = 0;
                return;
            } else if (dx >= 200) {
                touched = 0;
                if (ep_num === 1) {
                    return;
                }
                GetHtml(ep_num - 1);
                $("#arrow").css("display", "none");
                $("#navi--episode--backtolist").css("display", "none");
                arrow_flag = 0;
                return;
            } else {
                touched = 0;
                return;
            }
        }
    });

// /*#########################################
// * 以下 各矢印アイコンスクリプト
// #########################################*/
$("#arrow").css("display", "none");
$("#navi--episode--backtolist").css("display", "none");

var arrow_flag = 0;

function ep() {
    if (arrow_flag === 0) {
        $("#arrow").css("display", "block");
        $("#navi--episode--backtolist").css("display", "block");
        arrow_flag = 1;
        return;
    } else if (arrow_flag === 1) {
        $("#arrow").css("display", "none");
        $("#navi--episode--backtolist").css("display", "none");
        arrow_flag = 0;
        return;
    }
}

$(document).on(
    'click', "div#main",
    function(e) {
        ep();
    });

$(document).on(
    "click", ".button-next",
    function(e) {
        if (ep_num === 4) {
            return;
        }
        GetHtml(ep_num + 1);
        $("#arrow").css("display", "none");
        $("#navi--episode--backtolist").css("display", "none");
        arrow_flag = 0;
        return;
    });

$(document).on(
    "click", ".button-prev",
    function(e) {
        if (ep_num === 1) {
            return;
        }
        GetHtml(ep_num - 1);
        $("#arrow").css("display", "none");
        $("#navi--episode--backtolist").css("display", "none");
        arrow_flag = 0;
        return;
    });
