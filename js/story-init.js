/**
 * Story page: Swiper gallery + AOS init
 */
(function () {
  // Swiper
  if (typeof Swiper !== 'undefined') {
    var gallerySwiper = new Swiper('.gallery-swiper', {
      slidesPerView: 1,
      spaceBetween: 12,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      breakpoints: {
        768: { slidesPerView: 3, spaceBetween: 16 }
      }
    });

    var prevBtn = document.querySelector('.gallery-prev');
    var nextBtn = document.querySelector('.gallery-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { gallerySwiper.slidePrev(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { gallerySwiper.slideNext(); });
  }

  // AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 50 });
  }

  // Photo wall: scroll-triggered grayscale → color
  var wallImgs = document.querySelectorAll('.photo-wall img');
  if (wallImgs.length > 0 && 'IntersectionObserver' in window) {
    var wallObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          wallObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    wallImgs.forEach(function (img) { wallObserver.observe(img); });
  }
})();
