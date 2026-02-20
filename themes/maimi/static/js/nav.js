/**
 * nav.js — Hamburger toggle + navbar scroll shadow
 */
(function () {
    'use strict';
    var hamburger = document.getElementById('hamburger');
    var navList = document.getElementById('navbar-nav');
    var navbar = document.getElementById('navbar');

    if (hamburger && navList) {
        hamburger.addEventListener('click', function () {
            var isOpen = navList.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });
        navList.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navList.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (navbar) {
        function update() { navbar.classList.toggle('scrolled', window.scrollY > 10); }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }
})();
