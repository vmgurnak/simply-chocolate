// const refs = {
//   openModalBtn: document.querySelector('js-open-modal'),
//   closeModalBtn: document.querySelector('js-close-modal'),
//   modal: document.querySelector('.js-modal'),
// };

// refs.openModalBtn.addEventListener('click', handlerOpenModal);
// refs.closeModalBtn.addEventListener('click', handlerClosenModal);
// refs.modal.addEventListener('click', handlerCloseModalBackdrop);

// function handlerOpenModal(evt) {
//   refs.modal.classList.remove('is-hidden');
//   document.addEventListener('keydown', handlerEscClose);
// }

// function handlerClosenModal(evt) {
//   refs.modal.classList.add('is-hidden');
//   removeEventListenerKeydown();
// }

// function handlerCloseModalBackdrop(evt) {
//   if (evt.currentTarget === evt.target) {
//     refs.modal.classList.add('is-hidden');
//     removeEventListenerKeydown();
//   }
// }

// function handlerEscClose(evt) {
//   console.log(evt);
//   if (evt.code === 'Escape') {
//     refs.modal.classList.add('is-hidden');
//     removeEventListenerKeydown();
//   }
// }

// function removeEventListenerKeydown() {
//   document.removeEventListener('keydown', handlerEscClose);
// }


import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

(() => {
  const modalContainer = document.querySelector('.js-modal-container');
  const modalOpenBtn = document.querySelector('.js-modal-open');
  const modalCloseBtn = document.querySelector('.js-modal-close');

  const modals = document.querySelectorAll('.js-modal-container');
  const modalsOpen = document.querySelectorAll('.js-modal-open');

  console.log(modals);
  console.log(modalsOpen);


  const toggleMenu = () => {
    const isMenuOpen =
      modalOpenBtn.getAttribute('aria-expanded') === 'true' || false;
    modalOpenBtn.setAttribute('aria-expanded', !isMenuOpen);
    modalContainer.classList.toggle('is-open');

    if (!isMenuOpen) {
      disableBodyScroll(modalContainer);
    } else {
      enableBodyScroll(modalContainer);
    }
  };

  const closeMenu = () => {
    if (modalContainer.classList.contains('is-open')) {
      modalOpenBtn.setAttribute('aria-expanded', false);
      modalContainer.classList.remove('is-open');
      enableBodyScroll(modalContainer);
    }
  };

  modalOpenBtn.addEventListener('click', toggleMenu);
  modalCloseBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on a click on the background
  document.addEventListener('click', event => {
    if (event.target === modalContainer) {
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
