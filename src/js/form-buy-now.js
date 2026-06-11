const buyForm = document.getElementById('buyForm');
const submitBtn = buyForm.querySelector('button[type="submit"]');
const inputs = buyForm.querySelectorAll('input[required]');

submitBtn.disabled = true;

/* =========================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
========================= */

function showError(input, message) {
  removeError(input);

  input.classList.remove('input-success');
  input.classList.add('input-error');

  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;

  input.closest('label').appendChild(error);
}

function removeError(input) {
  input.classList.remove('input-error');

  const error = input.closest('label').querySelector('.error-message');
  if (error) error.remove();
}

function validateInput(input) {
  const value = input.value.trim();

  if (input.name === 'name' || input.name === 'surname') {
    if (!/^[A-Za-z]{3,10}$/.test(value)) {
      showError(input, '3–10 latin letters only');
      return false;
    }
  }

  if (input.name === 'email') {
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      showError(input, 'Enter valid email');
      return false;
    }
  }

  if (input.name === 'phone_number') {
    if (!/^\d{2} \d{7}$/.test(value)) {
      showError(input, 'Format: 67 1234567');
      return false;
    }
  }

  if (input.name === 'card_number') {
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(value)) {
      showError(input, 'Format: 1111 1111 1111 1111');
      return false;
    }
  }

  removeError(input);
  input.classList.add('input-success');
  return true;
}

function validateCheckboxGroup() {
  const checked = buyForm.querySelectorAll(
    'input[name="product-option"]:checked'
  );

  const fieldset = buyForm.querySelector('.modal-buy-now-list');

  const existingError = fieldset.querySelector('.error-message');
  if (existingError) existingError.remove();

  if (checked.length === 0) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = 'Select at least one product';
    fieldset.appendChild(error);
    return false;
  }

  return true;
}

function checkFormValidity() {
  const inputsValid = [...inputs].every(input => validateInput(input));

  const checkboxValid = validateCheckboxGroup();

  submitBtn.disabled = !(inputsValid && checkboxValid);
}

/* =========================
   АВТОЗАГЛАВНАЯ БУКВА
========================= */

['name', 'surname'].forEach(field => {
  const input = buyForm.querySelector(`input[name="${field}"]`);

  input.addEventListener('input', () => {
    input.value =
      input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
  });
});

/* =========================
   МАСКА ТЕЛЕФОНА
========================= */

const phoneInput = buyForm.querySelector('input[name="phone_number"]');

phoneInput.addEventListener('input', () => {
  let value = phoneInput.value.replace(/\D/g, '').slice(0, 9);

  if (value.length > 2) {
    value = value.slice(0, 2) + ' ' + value.slice(2);
  }

  phoneInput.value = value;
});

/* =========================
   МАСКА КАРТЫ
========================= */

const cardInput = buyForm.querySelector('input[name="card_number"]');

cardInput.addEventListener('input', () => {
  let value = cardInput.value.replace(/\D/g, '').slice(0, 16);

  value = value.match(/.{1,4}/g)?.join(' ') || value;

  cardInput.value = value;
});

/* =========================
   СОБЫТИЯ
========================= */

inputs.forEach(input => {
  input.addEventListener('blur', () => {
    validateInput(input);
    checkFormValidity();
  });

  input.addEventListener('input', checkFormValidity);
});

buyForm
  .querySelectorAll('input[name="product-option"]')
  .forEach(checkbox => checkbox.addEventListener('change', checkFormValidity));

buyForm.addEventListener('submit', e => {
  e.preventDefault();

  const inputsValid = [...inputs].every(validateInput);
  const checkboxValid = validateCheckboxGroup();

  if (!inputsValid || !checkboxValid) return;

  const formData = new FormData(buyForm);
  const data = Object.fromEntries(formData);
  data['product-option'] = formData.getAll('product-option');

  console.log(data);

  buyForm.reset();
  submitBtn.disabled = true;
  inputs.forEach(input => {
    input.classList.remove('input-success');
    input.classList.remove('input-error');
  });
});
