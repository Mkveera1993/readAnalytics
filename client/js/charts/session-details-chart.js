// JavaScript Document




// Date Picker

$(function() {
    $("#datepicker").datepicker({
        showOn: 'button',
        buttonImage: 'img/calender-icon.png',
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        showAnim: 'slideDown',
        duration: 'fast',
        dateFormat: 'dd-mm-yy'
    });
});

// Session Slide Section
$(document).ready(function() {
    $(".session-slide span").each(function(e) {
        if (e != 0)
            $(this).hide();
    });

    $("#next").click(function() {
        if ($(".session-slide span:visible").next().length != 0)
            $(".session-slide span:visible").next().show().prev().hide();
        else {
            $(".session-slide span:visible").hide();
            $(".session-slide span:first").show();
        }
        return false;
    });

    $("#prev").click(function() {
        if ($(".session-slide span:visible").prev().length != 0)
            $(".session-slide span:visible").prev().show().next().hide();
        else {
            $(".session-slide span:visible").hide();
            $(".session-slide span:last").show();
        }
        return false;
    });
});