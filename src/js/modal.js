import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

(() => {
  // Находим все кнопки, которые открывают модальные окна
  const openBtns = document.querySelectorAll('[data-modal-open]');

  // Находим все кнопки закрытия внутри модальных окон
  // const closeBtns = document.querySelectorAll('[data-modal-close]');

  // console.log(closeBtns);

  openBtns.forEach(btn => {
    const modalId = btn.dataset.modalOpen; // id модального окна, например: "menu1"
    const modal = document.querySelector(`#${modalId}`); // модальное окно с id="menu1"

    if (!modal) return;

    const toggleModal = () => {
      const isOpen = modal.classList.contains('is-open');
      modal.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', !isOpen);

      if (!isOpen) {
        disableBodyScroll(modal);
      } else {
        enableBodyScroll(modal);
      }
    };

    const closeModal = () => {
      if (modal.classList.contains('is-open')) {
        modal.classList.remove('is-open');
        btn.setAttribute('aria-expanded', false);
        enableBodyScroll(modal);
      }
    };

    // Добавление обработчика на кнопки открытие при клике
    btn.addEventListener('click', toggleModal);

    // Закрытие по кнопке внутри модального окна
    const closeBtn = modal.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику на backdrop
    modal.addEventListener('click', event => {
      if (event.target === modal) closeModal();
    });

    // Закрытие по Esc
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeModal();
    });

    // Закрытие мобильного меню при переходе на десктоп
    if (modalId === 'mobile-menu') {
      window.matchMedia('(min-width: 1200px)').addEventListener('change', e => {
        if (e.matches) closeModal();
      });
    }
  });
})();
