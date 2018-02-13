
$( document ).ready(function() {

    var calendar = $(".schedule-container");
    calendar.each(
        function() {
            var colOne = $(this).children().first();

            var l = colOne.children().first().children().length;
            var val = Math.floor(l / 2.2);
            var secondSet = colOne.children().first().children().slice(-val);
    
            colOne.after("<div class='col-lg'></div>");
            colOne.next().append("<ul class='calender'></ul>");
            secondSet.appendTo(colOne.next().children().first());
    })

})

$(".options a").click(
    function() {
        $(window).scrollTo(document.getElementById('pastSemester'), 800);
})
