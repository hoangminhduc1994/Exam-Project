// swiper
document.addEventListener('DOMContentLoaded', () => {
    const swiperThumb = new Swiper('.swiper-thumb', {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        slideToClickedSlide: true
    });

    const swiperMain = new Swiper('.swiper-main', {
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: swiperThumb
        }
    });
});