/**
 * Shared nav: hamburger toggle + scroll shadow
 * Used on all pages.
 */
(function () {
  var navMenu = document.getElementById('nav-menu');
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  // Hamburger
  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.toggle('open');
    this.classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Scroll shadow
  window.addEventListener('scroll', function () {
    nav.style.boxShadow = window.scrollY > 50
      ? '0 2px 20px rgba(0,0,0,0.08)'
      : 'none';
  });
  // Block right-click on images
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  });
})();
