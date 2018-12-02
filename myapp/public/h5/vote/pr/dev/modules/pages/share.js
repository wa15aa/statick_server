import '../layout/share/'

import $ from 'zepto';
$(function(){
    // alert(1);
    $('.userMess .userNameMess').html('我是 '+userMess.nickName);
    $('.usePicBox .pic').attr('src',userMess.picLink);
    var hrefStr = window.location.href
    var lastUrlInfo = hrefStr.substring(hrefStr.lastIndexOf('/')+1);
    lastUrlInfo = lastUrlInfo.substring(0,lastUrlInfo.lastIndexOf('?'))
    if(lastUrlInfo === 'nobonus'){
        $('.userMess .getNum').html('快来 企鹅调研 跟我一起赚红包吧！');
    }else{
        $('.userMess .getNum').html('在 企鹅调研 拿了'+userMess.prizeNum+'个红包 共'+userMess.bonus+'元')
    }

    // alert(2);
    
})