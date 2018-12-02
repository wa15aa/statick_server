// console.error('i am here');
import '../common/css/base.css'
import '../common/css/animate.css'
import '../common/css/page.scss'
import '../common/css/swiper.min.css'
// let Swiper = require('../common/js/swiper.min.js')
import Zepto from 'zepto';
import ppo from 'ppo';
// import '../common/js/zepto.fullpage.js'


$(function () {


    $('.time').html(currentTime+'s');



    let videoPlaying = false;
    
    var startx, starty;

    //获得角度
    function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
    };
 
    //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
    function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;
 
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
 
        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
            result = 1;
        } else if (angle > 45 && angle < 135) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        } else if (angle >= -45 && angle <= 45) {
            result = 4;
        }
 
        return result;
    }
    //手指接触屏幕
    document.addEventListener("touchstart", function(e) {
        startx = e.touches[0].pageX;
        starty = e.touches[0].pageY;
    }, false);
    //手指离开屏幕
    document.addEventListener("touchend", function(e) {
        var endx, endy;
        endx = e.changedTouches[0].pageX;
        endy = e.changedTouches[0].pageY;
        var direction = getDirection(startx, starty, endx, endy);
        switch (direction) {
            case 0:
                // alert("未滑动！");
                break;
            case 1:
                // alert("向上！")
                if(videoPlaying){
                    videoPlaying = false;
                    $(".video").get(0).pause();
                    videoPlayEnd();
                }
                break;
            case 2:
                // alert("向下！")
                

                break;
            case 3:
                // alert("向左！")
                break;
            case 4:
                // alert("向右！")
                break;
            default:
        }
    }, false);

    $(".video_play")[0].onclick = function () {
        // debugger;
        // console.log(1);
        $(".first_screen").addClass('feadIn');
        $(".full-video").show();
        scaleVideo('.video-player');
        $(".video").get(0).play();

        videoPlaying = true;
        document.addEventListener("WeixinJSBridgeReady", function () {
            $(".video").get(0).play();
            videoPlaying = true;
        }, false);
        $(".video").each(function () {
            $(this)[0].addEventListener("ended", videoPlayEnd);
        });

       
    };
    function videoPlayEnd() {
        // _this.friendPage();
        // console.log(1)
        videoPlaying = false;
        $('.full-video').addClass('feadIn');
        $('.vote').show().addClass('feadOut');
    }

    function scaleVideo(e) {
        let _w = document.documentElement.clientWidth;
        let _h = document.documentElement.clientHeight;
        var t, i = _w / _h,
            r = 540 / 960;
        t = i < r ? _h / 960 : _w / 540;
        $(e).css({
            "-webkit-transform-origin": 'center center',
            "-webkit-transform": "scale(" + t + ")",
            "transform": "scale(" + t + ")"
        })
    };


    // Zepto('.wp-inner').fullpage();
    Zepto('.dong')[0].addEventListener('webkitAnimationEnd', function () {

        // console.log(123);

        $('.first_screen').addClass('')

    }, false);

    let currentVoteNum = 0;
    let countDownObj = null
    let currentGrow = 0;

    //总投票数设置
    let leiNum = 0;
    let dongNum = 0;
    let hasVote = false;
    // $.jsonp({
    //     url:'http://panshi.qq.com/counter/a8637a98fc05ce952f56f1122fcc717b',
    //     callback: 'callback',
    //     success:function(data){
    //         debugger;
    //     }
    // })

    $.ajax({
        url: 'http://panshi.qq.com/counter/a8637a98fc05ce952f56f1122fcc717b',
        dataType: 'jsonp',
        success: function (data) {
            // debugger;
            leiNum = parseInt(data.data.total)
        }
    })

    $.ajax({
        url: 'http://panshi.qq.com/counter/05300152f67c418a56438dcc554f7efe',
        dataType: 'jsonp',
        success: function (data) {
            // debugger;
            dongNum = parseInt(data.data.total)
        }
    })


    

    function vote(voteName, count) {
        let id = '';
        if (voteName === 'lei') {
            id = 'a8637a98fc05ce952f56f1122fcc717b';
        } else {
            id = '05300152f67c418a56438dcc554f7efe';
        }

        $.ajax({
            url: 'http://panshi.qq.com/counter/' + id,
            type: 'post',
            data: {
                counterkey: id,
                count: count
            },
            success() {

            }
        })
    }


    function show_result(){
        $('.generate').hide()
        $('.vote_warp,.title').addClass('feadIn');
        $('.support_but,.time,.add_vote').css('opacity', 0);
        let max = 120;
        let spName = '';
        let taText = '';
        if (parentClass === 'lei') {
            spName = '雷军';
            taText = '他';
            leiNum += currentVoteNum;
        } else {
            spName = '董明珠';
            taText = '她';
            dongNum += currentVoteNum;
        }
        if (!hasVote) {
            $('.share_copywriting').html('你为' + spName + '打气 <span>' + currentVoteNum + '</span>  次！')
            vote(parentClass, currentVoteNum);
            hasVote = true;
            let leiH = 0;
            let dongH = 0;

            if (leiNum > dongNum) {
                leiH = max;
                dongH = max * dongNum / leiNum
            } else {
                dongH = max;
                leiH = max * leiNum / dongNum
            }
            $('.persion img').removeClass('jump');
            $('.cylindrical_g').removeClass('grow');
            $('.lei .cylindrical_g').css('height', leiH + 'px');
            $('.dong .cylindrical_g').css('height', dongH + 'px');


            $('.vote_warp').addClass('feadOut');
            //显示投票数
            $('.lei .num_vote').html(leiNum*next);
            $('.dong .num_vote').html(dongNum*next);
            $('.showNum').css('opacity', 1);
            $('.showNum').css('opacity', 1);
            $('.num_text').addClass('showNumAn');
            $('.num_warp').addClass('showNumAnNum');
            $('.uesr_button').show();

            setTimeout(function(){
                $('.share_copywriting').show();
            },1500);
            $('.share_copywriting span').addClass('currentNum_animate');

            // shareData.title = '我为' + spName + '加油' + currentVoteNum + '次，10亿赌局胜负将揭晓，快来为'+taText+'加油！';
            shareData.title  = setTitle(spName,currentVoteNum,taText);
            MShare.init();
        }
    }

    function countDown() {
        var overtime = true;
        var resT = null;
        countDownObj = setInterval(function () {
            // debugger;
            currentTime -= 1;
            $('.time').html(currentTime + 's');
            // currentGrow += 1;
            // $('.' + parentClass + ' .cylindrical_g').css('height', currentGrow + 'px');
            if (currentTime <= 0) {
                clearInterval(countDownObj);
                $('.generate').show()
                $('.vote_num').addClass('vote_num_an');
                // $('.vote_warp')[0].addEventListener('webkitAnimationEnd', function () {
                //     if(overtime){
                //         resT = setTimeout(function () {
                //             overtime = false;
                //             show_result();
                //         }, 2500);
                //     }
                   
                // }, false)

                setTimeout(function(){
                    if(overtime){
                        overtime = false
                        show_result();
                        if(resT){
                            clearTimeout(resT);
                        }
                    }
                },1500);


            }




        }, 1000)



    }

    let timeStart = false;

    let parentClass = '';

    $('.support_but').click(function () {

        if ($(this).hasClass('off')) {
            return;
        }

        if (currentTime <= 0) {
            return;
        }

        if (!parentClass) {
            parentClass = $(this).parent()[0].className;
            $('.' + parentClass + ' .cylindrical_g').addClass('grow')
            $('.' + parentClass + ' .persion img').addClass('jump')
        }

        if (!timeStart) {
            countDown();
            timeStart = true;
            $('.time').addClass('time_animate');
        }

        $('.' + parentClass + ' .shadow_inner').addClass('shadow_inner_animate');
        $(' .shadow_out').removeClass('shadow_out_before');
        $('.' + parentClass + ' .shadow_out').addClass('shadow_out_animate');
        $('.' + parentClass + ' .button_part').addClass('button_part_animate');
        currentVoteNum += 1;
        $('.' + parentClass + ' .add_vote .num').html(currentVoteNum);
        $('.' + parentClass + ' .add_vote').css('opacity', 1);



        if (parentClass === 'lei') {
            $('.dong .support_but').addClass('off');
        } else {
            $('.lei .support_but').addClass('off');
        }
    });

    $('.shadow_inner').on('webkitAnimationEnd', function () {

        $('.shadow_inner').removeClass('shadow_inner_animate');
        $('.shadow_out').removeClass('shadow_out_animate');
        $('.button_part').removeClass('button_part_animate');

    });

    // var swiper = new Swiper({
    //     el: '.swiper-container',
    //     direction: 'vertical'
    // });

    $('.back').click(function () {
        try {
            location.href = 'http://news.qq.com/zt2018/gamble/index.htm?' + Math.random();
        } catch (err) {}

    });

    $('.share_warp').click(function () {
        $(this).hide();
    })

    $('.share').click(function () {
        $('.share_warp').show();
    })


    var MShare = {
        WeiXin: function () {
            WeixinJSBridge.on("menu:share:timeline", function (e) {
                var data = {
                    img_width: "120",
                    img_height: "120",
                    img_url: shareData.img,
                    link: shareData.link,
                    desc: shareData.desc,
                    title: shareData.title
                };
                WeixinJSBridge.invoke("shareTimeline", data, function (res) {
                    WeixinJSBridge.log(res.err_msg)
                })
            });
            WeixinJSBridge.on("menu:share:weibo", function () {
                WeixinJSBridge.invoke("shareWeibo", {
                    "content": shareData.desc,
                    "url": shareData.link
                }, function (res) {
                    WeixinJSBridge.log(res.err_msg)
                })
            });
            WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                WeixinJSBridge.invoke("sendAppMessage", {
                    img_width: "120",
                    img_height: "120",
                    img_url: shareData.img,
                    link: shareData.link,
                    desc: shareData.desc,
                    title: shareData.title
                }, function (res) {
                    WeixinJSBridge.log(res.err_msg)
                })
            })
        },
        init: function () {
            var _this = this;
            // qqnews
            document.addEventListener('WeixinJSBridgeReady', function () {
                _this.WeiXin()
            })
        }
    };

    MShare.init();




})