

$(function () {
    var $body = $("body");
    slickSlider();
    swiperNoticePop();
    if ( $body.find(".swiper.sports-main-banner").length > 0 ) { swiperSportsMainBnn(); }// 스포츠월드 메인배너 슬라이드
    if ( $body.find(".main-sec.main-banner .my-sports").length > 0 ) { sportsMainMore(); }// 나에게맞는운동 더보기
    $(".main-sec.app-content .app-list > li > a").on("click", appTabClick);// 스포츠월드 수강신청 탭
    if ( $body.find(".main-sec.course-intro").length > 0 ) { mysportsMore(); }// 스포츠월드 강좌종목안내 더보기
    thumbClickAction(".main-sec.good-sports .good-list > li > a", ".big-img");// 스포츠월드 추천종목 썸네일
    if ( $body.find(".swiper.arena-main-banner").length > 0 ) { swiperArenaMainBnn(); }// 아레나 메인배너 슬라이드
    if ( $body.find(".swiper.arena-month-event").length > 0 ) { swiperArenaEvent(); }// 아레나 이달의행사 슬라이드
    if ( $body.find(".swiper.biz-main-banner").length > 0 ) { swiperBizMainBnn(); }// 비즈니스 메인배너 슬라이드
    thumbClickAction(".main-sec.biz-field .field-list > li > a", ".detail-con");// 비즈니스 Field of Business 썸네
    $(".main-sec.biz-intro .company-list > li > a").on("click", function(e) {
        var winWidth = $(window).width();
        if (winWidth <= 768) {
            return true;
        } else {
            e.preventDefault();
            var menuIdx = $(this).parent().index();
            $(this).parent().addClass("on").siblings().removeClass("on");
            $(".main-sec.biz-intro .detail-con").eq(menuIdx).addClass("show").siblings().removeClass("show");
        }
    });
    if ( $body.find(".swiper.art-main-banner").length > 0 ) { swiperArtMainBnn(); }// 예술과학원 메인배너 슬라이드

    function slickSlider() {
        var $banner = $('.banner'); // 슬라이더 선택자
    
        if ($banner.length > 0) {
            // 슬라이더 초기화
            $banner.slick({
                arrows: false,
                infinite: true,
                autoplay: true,
                fade: true,
                speed: 500,
                dots: true,
                pauseOnHover: false
            });
    
            // 재생/일시정지 버튼
            var isPaused = false;
            $('.banner-play-button').on('click', function () {
                if (isPaused) {
                    $banner.slick('slickPlay');
                } else {
                    $banner.slick('slickPause');
                }
                isPaused = !isPaused;
                $(this).text(isPaused ? '재생' : '일시정지').toggleClass('play');
            });
    
            // 슬라이드 변경 이벤트
            $banner.on('afterChange', function (event, slick, currentSlide) {
                console.log("현재 슬라이드:", currentSlide);
            });
        } else {
            console.warn("'.banner' 요소를 찾을 수 없습니다.");
        }
    }
    
    // DOM이 완전히 로드된 후 실행
    $(document).ready(function () {
        slickSlider();
    });
    
});
// /* 스포츠월드 메인배너 슬라이드 */
// function swiperNoticePop() {
//     var noticePop = new Swiper(".pop-wrap .swiper.notice-slide", {
//         // autoplay: {
//         //     delay: 4000,
//         //     disableOnInteraction: false,
//         // },
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         pagination: {
//             el: ".swiper-pagination",
//             clickable : true,
//         },
//     });
//     $('.swiper.notice-slide .slide-play').on('click', function() {
//         noticePop.autoplay.start();
//         return false;
//     });
//     $('.swiper.notice-slide .slide-pause').on('click', function() {
//         noticePop.autoplay.stop();
//         return false;
//     });
//     var noticePopPaging = new Swiper(".swiper.notice-slide", {
//         pagination: {
//             el: ".swiper-pagination2",
//             type: "fraction",
//         },
//     });
//     noticePop.controller.control = noticePopPaging;
// }
// function swiperSportsMainBnn() {
//     var sportsaMainBnn = new Swiper(".kbs-sports .swiper.sports-main-banner", {
//         autoplay: {
//             delay: 4000,
//             disableOnInteraction: false,
//         },
//         navigation: {
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//         },
//         pagination: {
//             el: ".swiper-pagination",
//             clickable : true,
//         },
//     });

//     $('.swiper.sports-main-banner .slide-play').on('click', function() {
//         sportsaMainBnn.autoplay.start();
//         return false;
//     });
//     $('.swiper.sports-main-banner .slide-pause').on('click', function() {
//         sportsaMainBnn.autoplay.stop();
//         return false;
//     });

//     var sportsaMainPaging = new Swiper(".kbs-sports .swiper.sports-main-banner", {
//         pagination: {
//             el: ".swiper-pagination2",
//             type: "fraction",
//         },
//     });
//     sportsaMainBnn.controller.control = sportsaMainPaging;
// }
/* 나에게맞는운동 더보기 */
function sportsMainMore() {
    var $spList = $(".main-sec.course-intro .sports-list");
    var $spListMore =  $(".main-sec.course-intro .list-more");
    $spListMore.on("click", function(e){
        e.preventDefault();
        var $this= $(this);
        var $moreTxt =  $this.find(".txt");
        $spList.toggleClass("open")
        $this.toggleClass("close");
        $moreTxt.text("닫기");
        if(!$this.hasClass("close")) {
            $moreTxt.text("더보기");
        }
    });
}
/* 스포츠월드 수강신청 탭 */
function appTabClick() {
    var $this =  $(this);
    var appIdx = $(this).parent().index();
    var $appCon = $(".app-con");
    $this.parent().addClass("on").siblings().removeClass("on");
    $appCon.eq(appIdx).addClass("open").siblings().removeClass("open");
}
/* 스포츠월드 강좌종목안내 더보기 */
function mysportsMore() {
    var $myChkList = $(".main-sec.main-banner .my-sports");
    var $myChkMore =  $(".main-sec.main-banner .my-sports .chk-more");

    $myChkMore.on("click", function(e){
        e.preventDefault();
        var $this= $(this);
        var $moreTxt =  $this.find(".txt");
        $myChkList.toggleClass("open")
        $this.toggleClass("close");
        $moreTxt.text("닫기");

        if(!$this.hasClass("close")) {
            $moreTxt.text("더보기");
        }
    });
}
/* 썸네일 클릭시 빅이미지 보여주기 */
function thumbClickAction(thumbImg, showImg) {
    var thumbImgs = $(thumbImg);
    var showImgs = $(showImg);
    var thumbWap = $(thumbImg).parent().parent();

    thumbImgs.each(function(index) {
        var thumbImg = $(this);
        var showImg = showImgs.eq(index);
        thumbImg.on("click", function(){
            thumbImg.parent().addClass("on").siblings().removeClass("on");
            showImg.addClass("show").siblings().removeClass("show");
            thumbWap.stop().animate({
                scrollLeft:parseInt(thumbWap.scrollLeft() + thumbWap.find("li").eq(index - (index > 0 ? 1 : 0) ).position().left)}, 300
            );
        });
    });
}
/* 아레나 메인배너 슬라이드 */
function swiperArenaMainBnn() {
    var arenaMainBnn = new Swiper(".kbs-arena .swiper.arena-main-banner", {
        effect : "fade",
        fadeEffect: { 
            crossFade: true 
        },
        pagination: {
            el: ".swiper-pagination",
            clickable : true,
        },
        observer: true,  
        observeParents: true,

    });
    $('.swiper.arena-main-banner .slide-play').on('click', function() {
        arenaMainBnn.autoplay.start();
        return false;
    });
    $('.swiper.arena-main-banner .slide-pause').on('click', function() {
        arenaMainBnn.autoplay.stop();
        return false;
    });
    var arenaMainPaging = new Swiper(".kbs-arena .swiper.arena-main-banner", {
        effect : "fade",
        fadeEffect: { 
            crossFade: true 
        },
        pagination: {
            el: ".swiper-pagination2",
            type: "fraction",
        },
    });
    arenaMainBnn.controller.control = arenaMainPaging;
}
/* 아레나 이달의행사 슬라이드 */
function swiperArenaEvent() {
    var arenaMonthEvent = new Swiper(".kbs-arena .swiper.arena-month-event", {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable : true,
        },
        spaceBetween: 18,
        breakpoints: {
            280: {
                slidesPerView: "auto",
                spaceBetween: 16,
            },
            320: {
                slidesPerView: "auto",
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: "auto",
                spaceBetween: 24,
            },
            1025: {
                slidesPerView: 2,
            },
        },
    });
    $('.swiper.arena-month-event .slide-play').on('click', function() {
        arenaMonthEvent.autoplay.start();
        return false;
    });
    $('.swiper.arena-month-event .slide-pause').on('click', function() {
        arenaMonthEvent.autoplay.stop();
        return false;
    });
}
/* 비즈니스 메인배너 슬라이드 */
function swiperBizMainBnn() {
    var bizMainBnn = new Swiper(".kbs-business .swiper.biz-main-banner", {
        effect : "fade",
        fadeEffect: { 
            crossFade: true 
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable : true,
        },
        observer: true,  
        observeParents: true,
    });
    $('.swiper.biz-main-banner .slide-play').on('click', function() {
        bizMainBnn.autoplay.start();
        return false;
    });
    $('.swiper.biz-main-banner .slide-pause').on('click', function() {
        bizMainBnn.autoplay.stop();
        return false;
    });
    var bizMainPaging = new Swiper(".kbs-business .swiper.biz-main-banner", {
        effect : "fade",
        fadeEffect: { 
            crossFade: true 
        },
        pagination: {
            el: ".swiper-pagination2",
            type: "fraction",
        },
    });
    bizMainBnn.controller.control = bizMainPaging;
}
/* 예술과학원 메인배너 슬라이드 */
function swiperArtMainBnn() {
    var artMainBnn = new Swiper(".kbs-art .swiper.art-main-banner", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable : true,
        },
    });
    $('.swiper.art-main-banner .slide-play').on('click', function() {
        artMainBnn.autoplay.start();
        return false;
    });
    $('.swiper.art-main-banner .slide-pause').on('click', function() {
        artMainBnn.autoplay.stop();
        return false;
    });
    var artMainPaging = new Swiper(".kbs-art .swiper.art-main-banner", {
        pagination: {
            el: ".swiper-pagination2",
            type: "fraction",
        },
    });
    artMainBnn.controller.control = artMainPaging;
}