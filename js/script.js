//あらすじ
var prol = [{
    "message": "<br>クリアするまで脱出不可能、ゲームオーバーは本当の"
}, {
    "message": '<br><br><span id="emp">“死”</span><br><br>'
}, {
    "message": "を意味するー。"
}, {
    "message": '<br>謎の次世代MMO『ソードアート・オンライン(SAO)』の "真実" を知らずログインした約一万人のユーザーと共に、その過酷なデスバトルは幕を開けた。'
}, {
    "message": '<br>SAOに参加した一人である主人公・キリトは、いち早くこのMMOの "真実" を受け入れる。'
}, {
    "message": "<br>そして、ゲームの舞台となる巨大浮遊城『アインクラッド』で、パーティーを組まないソロプレイヤーとして頭角をあらわしていった。"
}, {
    "message": "<br>クリア条件である最上階層到達を目指し、熾烈な冒険を単独で続けるキリトだったが、レイピアの名手・女流剣士アスナの強引な誘いによって彼女とコンビを組むことに。<br>"
}, {
    "message": "<br>その出会いは、キリトに運命とも呼べる契機をもたらしー。"
}, {
    "message": "<br>個人サイト上で閲覧数"
}, {
    "message": "<br><br><span id='emp2'>650万</span><br><br><span id='emp3'>PVオーバー</span>"
}, {
    "message": "<br>を記録した伝説の小説が登場！<span id='target'></span><br><br>"
}];

//会話内容
var talk = [{
    "message": "<li>き、キリト君もはやく脱いでよ……。</li><li>わたしだけ、は、恥ずかしいよ</li>",
    "name": "asuna"
}, {
    "message": "<img id='talk_img' src='bookillust/ep03_ci_01@3x.png'>",
    "name": "img"

}, {
    "message": "<div style='margin-top:-70vh;'>その声に、俺はようやくアスナの行動の意図するところを理解した。</div>"
}, {
    "message": "つまり、彼女は──俺の、今夜一緒にいたい、という台詞を、俺より一段踏み込んだ意味に解釈したのだ。"
}, {
    "message": "それを理解すると同時に俺は底なしの深いパニックに陥った。"
}, {
    "message": "結果、これまでの人生で最大級のミスを犯すこととなった。"
}, {
    "message": "<li>あ……いや、</li><li>その、俺は……ただ……</li><li>今夜、い、一緒の部屋に居たいという、それだけの……</li><li>つもりで……</li>",
    "name": "kirito"
}, {
    "message": "<li>へ……？</li>",
    "name": "asuna"
}, {
    "message": "自分の思考を馬鹿正直にトレースした俺の発言に、今度はアスナがぽかんとした顔で完全停止した。"
}, {
    "message": "が、やがて、その顔に最大級の羞恥と怒りを混合した表情が浮かぶ。"
}, {
    "message": "<li>バ……バ……</li>",
    "name": "asuna"
}, {
    "message": "握り締めた右拳に目に見えるほどの殺気をみなぎらせ、"
}, {
    "message": "<li>バカ──────ッ!!</li>",
    "name": "asuna"
}, {
    "message": "敏捷度パラメータ全開のスピードで突進してきたアスナの正拳突きは、俺の顔面に炸裂する寸前で犯罪防止コードに阻まれて大音響と共に紫色の火花を散らした。"
}, {
    "message": "<li>わ、わあー、待った!!</li><li>ごめん、ごめんって！</li><li>今のナシ！</li>",
    "name": "kirito"
}, {
    "message": "構わず二撃目を見舞おうとするアスナに向かって両手を激しく振りながら俺は必死に弁解した。"
}, {
    "message": "<li>悪かった、俺が悪かった!!</li><li>い……いや、しかし、そもそもだなぁ……。</li><li>その……で、できるの……？</li><li>SAOの中で……？</li>",
    "name": "kirito"
}, {
    "message": "ようやく攻撃姿勢をやや解除したアスナが、怒りの冷めやらぬ中にも呆れた表情を浮べて言った。"
}, {
    "message": "<li>し、知らないの……？</li>",
    "name": "asuna"
}, {
    "message": "<li>知りません……</li>",
    "name": "kirito"
}, {
    "message": "すると、途端に表情を激怒から羞恥へとシフトさせながら、アスナは小声で言った。"
}, {
    "message": "<li>……その……オプションメニューの、</li><li>すっごい深いとこに……</li><li>《倫理コード解除設定》があるのよ</li>",
    "name": "asuna"
}, {
    "message": "まるで初耳だった。ベータの時には間違いなくそんな物はなかったし、マニュアルにも載っていない。"
}, {
    "message": "ソロプレイに徹して戦闘情報以外に興味を向けなかったツケをこんな形で払うことになろうとは。"
}, {
    "message": "だが、その話は俺に新たな、看過し得ぬ疑問をもたらした。"
}, {
    "message": "思考能力が回復しないまま、うっかりそれを口にしてしまう。"
}, {
    "message": "<li>……その……け、経験がおありなんです……？</li>",
    "name": "kirito"
}, {
    "message": "再びアスナの鉄拳が俺の顔面直前に炸裂した。"
}, {
    "message": "<li>な、ないわよバカ────ッ!!</li><li>ギルドの子に聞いたの!!</li>",
    "name": "asuna"
}, {
    "message": "俺は慌てて平伏しつつ謝りに謝り続け、どうにか宥めるまでにたっぷり数分を要した。<span id='target4'></span><br><br>"
}];

var timer,
    count = 0,
    count2 = 0,
    count4 = 0,
    switcher = true;

// window.onload = function(){
//   document.getElementById('bar2').style.display = "none";
// };

//本文タップイベント
$(function() {
    $('.content-wrapper').bind('touchstart', onTouchStart); //指が触れたか検知
    $('.content-wrapper').bind('touchmove', onTouchMove); //指が動いたか検知
    $('.content-wrapper').bind('touchend', onTouchEnd); //指が離れたか検知
    var direction, positionX, positionY;

    //スワイプ開始時の横方向の座標を格納
    function onTouchStart(event) {
        positionX = getPositionX(event);
        positionY = getPositionY(event);
        direction = ''; //一度リセットする
    }

    //スワイプの方向を取得
    function onTouchMove(event) {
        if (positionX - getPositionX(event) > 50) { // 10px以上移動しなければスワイプと判断しない
            direction = 'left'; //左と検知
        } else if (positionX - getPositionX(event) < -50) { // 10px以上移動しなければスワイプと判断しない
            direction = 'right'; //右と検知
        } else if (positionY - getPositionY(event) > 10) { // 20px以上移動しなければスワイプと判断しない
            direction = 'down'; //下と検知
        } else if (positionY - getPositionY(event) < -10) { // 50px以上移動しなければスワイプと判断しない
            direction = 'up'; //上と検知
        }
    }

    //タップしたら、左右のナビゲーションを表示
    function onTouchEnd(event) {
        if (direction == 'right') {
            //document.getElementById("arrow").style.display = "none";
        } else if (direction == 'left') {
            //document.getElementById("arrow").style.display = "none";
        } else if (direction == 'down') {
            /*document.getElementById("arrow").style.display = "none";
            document.getElementById("bar2").style.display = "none";
            bar_switch = true;*/
        } else if (direction == 'up') {
            /*document.getElementById("arrow").style.display = "none";
            document.getElementById("bar2").style.display = "none";
            bar_switch = true; */
        } else {
            if (switcher === true) {
                document.getElementById("arrow").style.display = "inline";
                document.getElementById("bar2").style.display = "inline";
                switcher = false;
            } else {
                document.getElementById("arrow").style.display = "none";
                document.getElementById("bar2").style.display = "none";
                switcher = true;
            }
            $(".swiper-scrollbar-drag").width(15 + "px"); //スクロールバーを丸に
        }
    }

    //横方向の座標を取得
    function getPositionX(event) {
        return event.originalEvent.touches[0].pageX;
    }
    //縦
    function getPositionY(event) {
        return event.originalEvent.touches[0].pageY;
    }
});

//会話ページのテキスト追加処理
function add() {
    clearInterval(timer);
    timer = setInterval(function() {
        if (count >= talk.length) {
            clearInterval(timer);
            return;
        }
        if (talk[count].name == "asuna") { //アスナの発言

            var p_element = document.createElement("p");
            if (count < 1) { //赤くする
                p_element.innerHTML = '<div class="asuna div-comment"><span class="asuna-name comment-box-name"><span>アスナ</span></span><span class="asuna-comment left_box comment-box animated fadeInUp list_l" id="red">' + talk[count].message + '</span></div>';
            } else {
                p_element.innerHTML = '<div class="asuna div-comment"><span class="asuna-name comment-box-name"><span>アスナ</span></span><span class="asuna-comment left_box comment-box animated fadeInUp list_l">' + talk[count].message + '</span></div>';
            }
            var parent_object = document.getElementById("talk_p");
            parent_object.appendChild(p_element);

            line_left();
        } else if (talk[count].name == "kirito") { //キリトの発言
            var p_element = document.createElement("p");
            p_element.innerHTML = '<div class="kirito div-comment comment-right"><span class="kirito-name comment-box-name"><span>キリト</span></span><span class="kirito-comment right_box comment-box animated fadeInUp list_r">' + 　talk[count].message　 + '</span></div>';
            var parent_object = document.getElementById("talk_p");
            parent_object.appendChild(p_element);

            line_right();
        } else if (talk[count].name == "img") { //画像挿入
            var p_element = document.createElement("p");
            p_element.innerHTML = '<div class="talk_img">' + talk[count].message + '</div>';
            var parent_object = document.getElementById("talk_p");
            parent_object.appendChild(p_element);
        } else {
            var p_element = document.createElement("p");
            p_element.innerHTML = talk[count].message;
            var parent_object = document.getElementById("talk_p");
            parent_object.appendChild(p_element);
        }

        count++;
        talkScroll();
    }, 3000);
}

//あらすじの、自動テキスト挿入
function add_prol() {
    clearInterval(timer);
    timer = setInterval(function() {
        if (count2 >= prol.length) {
            clearInterval(timer);
            return;
        }
        var p_element = document.createElement("p");
        p_element.innerHTML = '<div><span class="animated fadeInUp">' + prol[count2].message + '</span></div>';
        var parent_object = document.getElementById("title_p");
        parent_object.appendChild(p_element);
        count2++;
        prolScroll();
    }, 1500);
}

/*セリフの表示アニメーション*/
function line_left() {
    $('.list_l li')
        .css({
            opacity: 0
        })
        .each(function(i) {
            $(this).delay(600 * i).animate({
                opacity: 1
            }, 1500);
        });
    $('.list_l').removeClass('list_l');
}

function line_right() {
    $('.list_r li')
        .css({
            opacity: 0
        })
        .each(function(i) {
            $(this).delay(600 * i).animate({
                opacity: 1
            }, 800);
        });
    $('.list_r').removeClass('list_r');
}
var cssTemplate = '<style type="text/css">#title_arrow:after{left: #[color_code];}</style>';


var count_s,
    count_s2,
    count_s3;
//指定の場所が画面上に表示されたら行う処理
setInterval('arrows()', 1000);

function arrows() {
    //ページ遷移したら、上に戻る
    $("#prol").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            $('.episodetitle--pagenav').text('エピソード01：あらすじ');
            $('.swiper-wrapper').css('transform', 'translate3d(15vw, 0px, 0px)');
            $('.swiper-scrollbar-drag').css('transform', 'translate3d(0px, 0px, 0px)');
        } else {}
    });
    $("#title_p").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            add_prol();
        } else {}
    });
    $("#page1").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            $('.episodetitle--pagenav').text('エピソード02：視線を集中すると');
            $('.swiper-wrapper').css('transform', 'translate3d(-63vw, 0px, 0px)');
            $('.swiper-scrollbar-drag').css('transform', 'translate3d(25vw, 0px, 0px)');
        } else {}
    });
    //斜線テキストを挿入
    $("#skew").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (count_s !== 1) {
            var p_element = document.createElement("span");
            p_element.innerHTML = '<div class="animated slideInLeft"><span class="box" id="skew-25y" style="background-color:black;">&nbsp;&nbsp;&nbsp;一撃で──死亡だと──!?</span></div>';
            var parent_object = document.getElementById("skew");
            parent_object.appendChild(p_element);
            count_s = 1;

            $('.animated').css(
                '-webkit-animation-duration', '0.5s');
            $('.animated').css(
                'animation-duration', '0.5s');
        }
    });
    $("#skew2").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (count_s2 !== 1) {
            var p_element = document.createElement("span");
            p_element.innerHTML = '<div class="animated slideInLeft"><span class="box" id="skew-25y">&nbsp;&nbsp;&nbsp;&nbsp;<span id="font">わ</span><span id="font1">あ</span><span id="font2">あ</span><span id="font3">あ</span><span id="font4">ーーー</span><span id="span5">!！</span></span></div>';
            var parent_object = document.getElementById("skew2");
            parent_object.appendChild(p_element);
            count_s2 = 1;

            $('.animated').css(
                '-webkit-animation-duration', '0.5s');
            $('.animated').css(
                'animation-duration', '0.5s');
        }
    });
    $("#skew3").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (count_s3 !== 1) {
            var p_element = document.createElement("span");
            p_element.innerHTML = '<div class="animated slideInLeft"><span class="box" id="skew-25y">&nbsp;&nbsp;&nbsp;俺は我知らず飛び出していた。</span></div>';
            var parent_object = document.getElementById("skew3");
            parent_object.appendChild(p_element);
            count_s3 = 1;

            $('.animated').css(
                '-webkit-animation-duration', '0.5s');
            $('.animated').css(
                'animation-duration', '0.5s');
        }
    });
    $("#page2").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {

        if (isInView) {
            $('.episodetitle--pagenav').text('エピソード03：アスナは、薄青い闇の');
            $('.swiper-wrapper').css('transform', 'translate3d(-136vw, 0px, 0px)');
            $('.swiper-scrollbar-drag').css('transform', 'translate3d(50vw, 0px, 0px)');
        } else {}
    });
    //自動挿入部分トリガー
    $("#talk_p").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {

        if (isInView) {
            add();
        } else {}
    });
    $("#page4").bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            $('.episodetitle--pagenav').text('エピソード04：あとがき');
            $('.swiper-wrapper').css('transform', 'translate3d(-210vw, 0px, 0px)');
            $('.swiper-scrollbar-drag').css('transform', 'translate3d(75vw, 0px, 0px)');
        } else {}
    });
}

/*テキスト挿入後自動スクロール処理*/
function prolScroll() {
    var $sampleBox = document.getElementById("prol");
    $sampleBox.scrollTop = $sampleBox.scrollTop + $sampleBox.scrollHeight;
}

function talkScroll() {
    var $Box = document.getElementById("talk");
    $Box.scrollTop = $Box.scrollTop + $Box.scrollHeight;
}


//大塚さん追記部分


//ジャイロ
if (window.DeviceOrientationEvent) {
    // (1) DeviceOrientationEventのイベントを拾う
    window.addEventListener("deviceorientation", function() {
        // (2) X軸、Y軸の傾きの値を取得する
        var x = Math.round(event.beta || 0); // [-90,  90)
        var y = Math.round(event.gamma || 0); // [-180,  180)

        var win_width = (window.innerWidth);
        var element_width = $(".gyro").width();
        var element_outer = (element_width - win_width) / 2;

        //(3) 座標値を好みの値に調節する
        if (x >= 31) {
            x = 30;
        } else if (x <= -31) {
            x = -30;
        }

        if (y >= 31) {
            y = 30;
        } else if (y <= -31) {
            y = -30;
        }

        y = -element_outer - y * element_outer / 30;


        // (4) 画像の位置を調節する
        // $('.contentarea').css({'background-position-x':x,
        //  'background-position-y':y});
        //$(".gyro").css("top", x);
        $(".gyro").css("left", y);

    }, true);
} else {
    // DeviceOrientationEventがサポートされていません
    var win_width = (window.innerWidth);
    var element_width = $(".gyro").width();
    var element_outer = (element_width - win_width) / 2;
    $(".gyro").css("left", -element_outer);

}
