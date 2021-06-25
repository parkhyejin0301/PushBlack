
$(document).ready(function() {
    
});

//메인 리포트 롤링 슬라이드, 2021-06-25, 박혜진
var swiper = new Swiper(".rolling-box", {
    direction: "vertical",
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});
