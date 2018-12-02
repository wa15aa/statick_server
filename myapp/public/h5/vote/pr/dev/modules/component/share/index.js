import './css/index.scss'

import $ from 'zepto';

$(function(){
    $('.share').click(function(){
        $('.share_box').show();
        
        $("body").addClass('mask_body');
        $("html").addClass('mask_html');
    });

    $('.closeBut').click(function(){
        $('.share_box').hide();
        $("body").removeClass('mask_body');
        $("html").removeClass('mask_html');
    })
})