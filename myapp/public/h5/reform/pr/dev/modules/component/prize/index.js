import './css/index.scss'
import $ from 'zepto';

$(function () {

    var startNum = 0;
    var limit = 10;
    var currentOffset = 0;
    var moreMess = true;
    var reqursting = false;
    getMess(limit, currentOffset);

    function temp(time, mess) {
        var str = '<li><div class="point"></div><div class="date">' + time + ' </div><div class="prize_conteng">' + mess + '</div></li>';
        return str;
    }



    function wxShare(hasBonus) {
         var linkStr = '';
        if (hasBonus) {
           linkStr = 'http://piu.qq.com/wechat/share/' + userMess.openId
        } else {
           linkStr = 'http://piu.qq.com/wechat/share/' + userMess.openId + '/nobonus'
        }
        wx.ready(function () {
            // alert(2);
            // alert(linkStr);
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: '来企鹅调研，答问卷拆红包，还有更多好礼等你来拿！', // 分享标题
                link: linkStr, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl:'http://piu.qq.com/wechat/img/Artboard.png', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: '来企鹅调研，答问卷拆红包，还有更多好礼等你来拿！', // 分享标题
                desc: '每次至少可得不少于1元的红包哦~', // 分享描述
                link: linkStr, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl:'http://piu.qq.com/wechat/img/Artboard.png', // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        })
    }

    function handelMess(data) {
        //  debugger;
       

        // data.length=0;
        var contentMess = '';
        if(typeof data === 'undefined'){
            data = [];
        }
        if (data.length > 0 && typeof data !== 'undefined') {
             // 第一次加载有数据设置分享信息
            if(currentOffset === 0){
                wxShare(true)
            }
            if (data.length < limit) {
                moreMess = false;
                $('.noMess').show();
            }
            data.map(function (item, i) {
                // debugger;
                contentMess += temp(item.time, item.mess)
            })

            $('.prize ul').append(contentMess);
        } else {
            moreMess = false;
            if (typeof data === 'undefined' || data.length === 0) {
                // 第一次加载没有数据设置分享信息
                if(currentOffset === 0){
                    wxShare(false)
                    $('.share_content .getNum').html('快来 企鹅调研 跟我一起赚红包吧')
                }
                $('.noprize,.noprizeBg').show();
                $('.end_point').hide();
                $('body,html').css({
                    height: '100%'
                });
                // $('.getNumText').html('快来企鹅调研跟我一起赚红包吧!')
            }
        }
    }



    function getMess(limit, currentOffset) {
        reqursting = true;
        $.ajax({
            url: InterfacePrize,
            timeout: 3000,
            data: {
                open_id: userMess.openId,
                limit: limit,
                offset: currentOffset
            },
            dataType: 'jsonp',
            success: function (data) {
                reqursting = false;
                handelMess(data);

            },
            error: function () {
                reqursting = false;
                // alert(123);
                handelMess();
            }
        })
    }

    var winH = $(window).height();

    // alert(winH+','+doH);
    $(window).scroll(function () {

        if (moreMess) {
            // debugger;
            if (!reqursting) {
                var doH = $(document).height();
                // console.log(doH);
                // alert('aa'+(doH-$(window).scrollTop()-winH));
                if ((doH - $(window).scrollTop() - winH) < 100) {
                    // alert(11);
                    currentOffset += limit;
                    getMess(limit, currentOffset);

                }
            }

        }


    })



});