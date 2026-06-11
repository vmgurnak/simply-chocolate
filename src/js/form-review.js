const reviewForm = document.getElementById('reviewForm');
const submitBtnReviewForm = reviewForm.querySelector('button[type="submit"]');
const inputsReviewForm = reviewForm.querySelectorAll('input[required]');

submitBtnReviewForm.disabled = true;

/* =========================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
========================= */

function showErrorReviewForm(input, message) {
  removeErrorReviewForm(input);

  input.classList.add('input-error');

  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;

  input.closest('label').appendChild(error);
}

function removeErrorReviewForm(input) {
  input.classList.remove('input-error');

  const error = input.closest('label').querySelector('.error-message');
  if (error) error.remove();
}

function validateInputReviewForm(input) {
  const value = input.value.trim();

  if (input.name === 'name') {
    if (!/^[A-Za-z]{3,10}$/.test(value)) {
      showErrorReviewForm(input, '3–10 latin letters only');
      return false;
    }
  }

  if (input.name === 'email') {
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      showErrorReviewForm(input, 'Enter valid email');
      return false;
    }
  }

  if (input.name === 'phone_number') {
    if (!/^\d{2} \d{7}$/.test(value)) {
      showErrorReviewForm(input, 'Format: 67 1234567');
      return false;
    }
  }

  removeErrorReviewForm(input);
  input.classList.add('input-success');
  return true;
}

function checkFormValidityReviewForm() {
  const inputsValid = [...inputsReviewForm].every(input =>
    validateInputReviewForm(input)
  );

  submitBtnReviewForm.disabled = !inputsValid;
}

/* =========================
   АВТОЗАГЛАВНАЯ БУКВА
========================= */

['name'].forEach(field => {
  const input = reviewForm.querySelector(`input[name="${field}"]`);

  input.addEventListener('input', () => {
    input.value =
      input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
  });
});

/* =========================
   МАСКА ТЕЛЕФОНА
========================= */

const phoneInputReviewForm = reviewForm.querySelector(
  'input[name="phone_number"]'
);

phoneInputReviewForm.addEventListener('input', () => {
  let value = phoneInputReviewForm.value.replace(/\D/g, '').slice(0, 9);

  if (value.length > 2) {
    value = value.slice(0, 2) + ' ' + value.slice(2);
  }

  phoneInputReviewForm.value = value;
});

/* =========================
   СОБЫТИЯ
========================= */

inputsReviewForm.forEach(input => {
  input.addEventListener('blur', () => {
    validateInputReviewForm(input);
    checkFormValidityReviewForm();
  });

  input.addEventListener('input', checkFormValidityReviewForm);
});

reviewForm.addEventListener('submit', e => {
  e.preventDefault();

  const inputsValid = [...inputsReviewForm].every(validateInputReviewForm);

  if (!inputsValid) return;

  const formDataReviewForm = new FormData(reviewForm);
  const data = Object.fromEntries(formDataReviewForm);

  console.log(data);

  reviewForm.reset();
  submitBtnReviewForm.disabled = true;
  inputsReviewForm.forEach(input => {
    input.classList.remove('input-success');
    input.classList.remove('input-error');
  });
});
