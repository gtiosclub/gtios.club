var officers = [
    {"pic":"images/home/cal.jpg", "firstName":"Cal", "lastName":"Stephens", "job":"President", "github":"https://github.com/calda"},
    {"pic":"images/home/brian.jpg", "firstName":"Brian", "lastName":"Wang", "job":"Founder", "github":"https://github.com/brianwang9100"},
    {"pic":"images/home/ale.jpg", "firstName":"Ale", "lastName":"Patron", "job":"Senior Tech Lead", "github":"https://github.com/apatronl"},
    {"pic":"images/home/komal.jpg", "firstName":"Komal", "lastName":"Hirani", "job":"Tech Lead / Senior Designer", "github":"https://github.com/khirani6"},
    {"pic":"images/home/kevin.jpg", "firstName":"Kevin", "lastName":"Randrup", "job":"Senior Tech Lead", "github":"https://github.com/kevinrandrup"},
    //{"pic":"images/home/varun.jpg", "firstName":"Varun", "lastName":"Ballari", "job":"Designer", "github":"https://github.com/Varun-Ballari"},
    {"pic":"images/home/cliff.jpg", "firstName":"Cliff", "lastName":"Panos", "job":"Tech Lead / Designer", "github":"https://github.com/cliffpanos"},
    {"pic":"images/home/mitchell.jpg", "firstName":"Mitchell", "lastName":"Gant", "job":"Tech Lead / Corporate Relations", "github":"https://github.com/m-gant"},
    {"pic":"images/home/kay.jpg", "firstName":"Kay", "lastName":"Yin", "job":"Tech Lead", "github":"https://github.com/lumingyin"},
    {"pic":"images/home/rohan.jpg", "firstName":"Rohan", "lastName":"Rk", "job":"Tech Lead", "github":"https://github.com/rohanrk"},
];

getDataFromOfficers(officers);

function getDataFromOfficers(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<li><div class="team_image" style="background-image: url(' + arr[i].pic + ')"></div>' +
                '<div class="name"><a href="' + arr[i].github + '" target="_blank">' + arr[i].firstName + " " + arr[i].lastName + '</a></div>' +
                '<div class="job">' + arr[i].job + '</div></li>';
    }
    document.getElementById("officer-data").innerHTML = out;
}

/*window.addEventListener('resize', function(event){
    var elmnt = document.getElementById("long-page");
    var maxX = elmnt.offsetWidth;
    console.log(maxX);

});*/

/*$(document).ready(function(){
   var scroll_start = 0;
   var startchange = $('#iphone');
   var offset = startchange.offset();

   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start + 500 > offset.top) {
          $('.siri').css('background-color', '#4B4F56');
      } else {
          $('.siri').css('background-color', 'white');
      }
   });
});*/
