const subscribeForm = document.getElementById('subscribeForm');
const submitBtnSubscribeForm = subscribeForm.querySelector(
  'button[type="submit"]'
);
const inputsSubscribeForm = subscribeForm.querySelectorAll('input[required]');

submitBtnSubscribeForm.disabled = true;

/* =========================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
========================= */

function showErrorSubscribeForm(input, message) {
  removeErrorSubscribeForm(input);

  input.classList.add('input-error');

  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;

  input.closest('label').appendChild(error);
}

function removeErrorSubscribeForm(input) {
  input.classList.remove('input-error');

  const error = input.closest('label').querySelector('.error-message');
  if (error) error.remove();
}

function validateInputSubscribeForm(input) {
  const value = input.value.trim();

  if (input.name === 'email') {
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      showErrorSubscribeForm(input, 'Enter valid email');
      return false;
    }
  }

  removeErrorSubscribeForm(input);
  input.classList.add('input-success');
  return true;
}

function checkFormValiditySubscribeForm() {
  const inputsValid = [...inputsSubscribeForm].every(input =>
    validateInputSubscribeForm(input)
  );

  submitBtnSubscribeForm.disabled = !inputsValid;
}

/* =========================
   СОБЫТИЯ
========================= */

inputsSubscribeForm.forEach(input => {
  input.addEventListener('blur', () => {
    validateInputSubscribeForm(input);
    checkFormValiditySubscribeForm();
  });

  input.addEventListener('input', checkFormValiditySubscribeForm);
});

subscribeForm.addEventListener('submit', e => {
  e.preventDefault();

  const inputsValid = [...inputsSubscribeForm].every(
    validateInputSubscribeForm
  );

  if (!inputsValid) return;

  const formDataSubscribeForm = new FormData(subscribeForm);
  const data = Object.fromEntries(formDataSubscribeForm);

  console.log(data);

  subscribeForm.reset();
  submitBtnSubscribeForm.disabled = true;
  inputsSubscribeForm.forEach(input => {
    input.classList.remove('input-success');
    input.classList.remove('input-error');
  });
});
