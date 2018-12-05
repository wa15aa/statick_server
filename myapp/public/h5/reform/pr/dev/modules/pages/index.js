// console.error('i am here');
import '../common/css/base.css'
import '../common/css/common.scss'
let Swiper = require('../common/js/swiper.min.js')
let songMess = require('../common/data/song_data.js');
// debugger;
// import $ from 'zepto';
let currentSong = [];
let yearList = ['90', '80', '00', '10'];
let yearIndex = 0;
var audio = new Audio();

audio.preload = true;

audio.loop = true;
//初始化已经播放完多少个年代的歌曲了
let hasPlayed = 0;

let currentNameLength = 0;

let currentName = '';
//随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

//获取歌曲并且填充当前歌曲文字
function makeUrl() {
    if (songMess[yearList[yearIndex]].length > 0) {
        let currentNum = randomNum(0, songMess[yearList[yearIndex]].length-1)
        let currentSMess = []
        // if (yearList[yearIndex] == '0') {
        //     currentSMess = songMess['00'][currentNum];
        // } else {
            console.log(yearList[yearIndex],currentNum+1)
            currentSMess = songMess[yearList[yearIndex]][currentNum];
        // }
        console.log(currentSMess);
        let sUrl = 'http://mat1.gtimg.com/news/images/static/2018/reform/'+yearList[yearIndex] + '_' + currentSMess[4]+'.mp3';
       
        debugger;
        let sNStr = '';
        currentNameLength = currentSMess[0];
        // currentName = currentSMess[2].slice(0,currentSMess[2].indexOf('/'));
        currentName = currentSMess[3];
        console.log(currentName);
        for (var i = 0; i < currentSMess[0]; i++) {
            sNStr += '<div class="item"></div>'
        }
        sNStr += '<div class="refresh"></div>';

        $('.enter_box').html(sNStr)
        let guess = '';

        for (var i = 0; i < currentSMess[1].length; i++) {
            guess += '<div class="item">' + currentSMess[1][i] + '</div>'
        }

        $('.guess_name').html(guess)
        //删除这个元素
        songMess[yearList[yearIndex]].splice(currentNum, 1)
        // songMess[yearList[yearIndex]][currentNum] = null;
        yearIndex += 1;
        if (yearIndex >= yearList.length) {
            yearIndex = 0;
        }
        return sUrl;
    } else {
        hasPlayed += 1;
        yearIndex += 1;
        if (yearIndex >= yearList) {
            yearIndex = 0;
        }
        if (hasPlayed >= 4) {
            // 全都答完

            console.log('全都答完')
            return false;
        }

        makeUrl()
    }
}

function setMess(arr) {
    //选择年份
    //生成随机数
    let sUrl = makeUrl();
    if (sUrl) {
        audio.src = sUrl;
        audio.play();
    } else {
        // 全部答对
    }
}

$(function () {
    let hasTime = 60;
    function countDown(){
        let cdObj = setInterval(function(){
            hasTime-=1;
            $('.time').html(hasTime);
            if(hasTime<=0){
                clearInterval(cdObj);
            }
        },1000)
    }

   
    var swiper = new Swiper({
        el: '.swiper-container',
        direction: 'vertical'
    });
    //滑动到第二页禁止滑动并触发第一次歌曲加载
    swiper.on('slideChangeTransitionEnd', function () {
        if (swiper.activeIndex == 1) {
            $('.swiper-container').addClass('swiper-no-swiping');
            //播放音乐
            setMess();
            //开始倒计时
            countDown()
        }

    });
    //已经选择了几个元素
    let hasSelect = 0;
    let currentEntStr = '';
    $('.guess_name').on('touchstart','.item',function(e){
        //选中过就不再选了
        if($(e.currentTarget).hasClass('hasSelect')){
            return;
        }
        //如果名字文字不够继续填
        let selectStr = $(e.currentTarget).html();
        if(hasSelect< currentNameLength){
            $(e.currentTarget).addClass('hasSelect')
            $('.enter_box .item').eq(hasSelect).html(selectStr)
            currentEntStr+=selectStr;
            hasSelect+=1;
            if(hasSelect === currentNameLength){
                judgeSong();
            }
            
        }
    })
    //输入歌名按钮
    $('.enter_box').on('click','div',function(e){
        // debugger;

        let sClass = $(e.currentTarget).attr('class');
        if(sClass === 'refresh'){
            refreshEnt();
        }
       
    });
    //判断是否正确
    function judgeSong(){
        //判断是否正确
        // debugger;
        if(currentEntStr === currentName){
            hasTime+=10;
            // debugger;
            refreshEnt();
            setMess();
        }else{
            debugger;
            $('.enter_box .item').addClass('name_err');
        }
    };

    function refreshEnt(){
        $('.enter_box .item').html('');
        $('.enter_box .item').removeClass('name_err');
        $('.guess_name .item').removeClass('hasSelect');
        hasSelect = 0;
        currentEntStr = '';
    }

    //首页进度条加载

    let current_pr = 0;
    let prTime = setInterval(function () {
        current_pr += 1;

        if (current_pr >= 101) {
            $('.loading').animate({
                opacity: 0
            }, 500, function () {
                $('.loading').hide();
            })
            clearInterval(prTime);
        }
        $('.loading_progress').css('width', current_pr + '%');
    }, 50);

})