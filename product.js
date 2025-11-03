
/*------------------------------------------------*/

var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  freeMode: true,
  watchSlidesProgress: true,
  breakpoints: {
    // когда ширина экрана >= 320px
    320: {
      slidesPerView: 3,
    },
    // когда ширина экрана >= 480px
    480: {
      slidesPerView: 3,
    },
    600: {
      slidesPerView: 4,
    },
    // когда ширина экрана >= 768px
  },
});

var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});
