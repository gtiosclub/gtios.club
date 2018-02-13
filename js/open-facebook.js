---
---

function openFacebook() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var url = "{{ site.facebook_url }}";
    var appUri = "{{ site.facebook_ios_uri }}";

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // setTimeout(function () {
        //     window.location = url;
        // }, 5);
        window.location = appUri;
    }
}