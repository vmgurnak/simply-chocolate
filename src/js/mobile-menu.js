import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    if (!isMenuOpen) {
      disableBodyScroll(mobileMenu);
    } else {
      enableBodyScroll(mobileMenu);
    }
  };

  const closeMenu = () => {
    if (mobileMenu.classList.contains('is-open')) {
      openMenuBtn.setAttribute('aria-expanded', false);
      mobileMenu.classList.remove('is-open');
      enableBodyScroll(mobileMenu);
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on a click on the background
  document.addEventListener('click', event => {
    if (event.target === mobileMenu) {
      closeMenu();
    }
  });

  // Close the mobile menu on a click on Escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 1200px)').addEventListener('change', e => {
    if (!e.matches) return;
    closeMenu();
  });
})();
