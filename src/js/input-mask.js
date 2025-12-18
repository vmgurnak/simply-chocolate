document
  .querySelector('input[name="phone_number"]')
  .addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 9);
    if (v.length > 2) v = v.slice(0, 2) + ' ' + v.slice(2);
    e.target.value = v;
  });

document
  .querySelector('input[name="card_number"]')
  .addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16);
    v = v.replace(/(.{4})/g, '$1 ').trim();
    e.target.value = v;
  });

function capitalizeFirst(input) {
  input.addEventListener('input', () => {
    let v = input.value.toLowerCase();
    input.value = v.charAt(0).toUpperCase() + v.slice(1);
  });
}

capitalizeFirst(document.querySelector('input[name="name"]'));
capitalizeFirst(document.querySelector('input[name="surname"]'));

const form = document.getElementById('buyForm');

const fields = [
  {
    el: document.querySelector('input[name="name"]'),
    empty: 'Enter your name.',
    invalid: 'Use 3–10 letters, first letter uppercase.',
  },
  {
    el: document.querySelector('input[name="surname"]'),
    empty: 'Enter your surname.',
    invalid: 'Use 3–10 letters, first letter uppercase.',
  },
  {
    el: document.querySelector('input[name="email"]'),
    empty: 'Email is required.',
    invalid: 'Enter a valid email (example@mail.com).',
  },
  {
    el: document.querySelector('input[name="phone_number"]'),
    empty: 'Phone number is required.',
    invalid: 'Format: 67 1234567',
  },
  {
    el: document.querySelector('input[name="card_number"]'),
    empty: 'Card number is required.',
    invalid: 'Format: 1111 1111 1111 1111',
  },
];

// ❗ ставим кастомные сообщения ДО reportValidity
function prepareValidation() {
  fields.forEach(({ el, empty, invalid }) => {
    if (el.validity.valueMissing) {
      el.setCustomValidity(empty);
    } else if (!el.checkValidity()) {
      el.setCustomValidity(invalid);
    } else {
      el.setCustomValidity('');
    }
  });
}

// очищаем ошибку при вводе
fields.forEach(({ el }) => {
  el.addEventListener('input', () => {
    el.setCustomValidity('');
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  prepareValidation();

  if (form.checkValidity()) {
    console.log('FORM OK');
    form.reset(); // ✔ очищается
  } else {
    form.reportValidity(); // ❗ ТОЛЬКО кастомные сообщения
  }
});

function setValidationMessages(input, emptyMessage, invalidMessage) {
  input.addEventListener('invalid', function () {
    if (this.validity.valueMissing) {
      this.setCustomValidity(emptyMessage);
    } else {
      this.setCustomValidity(invalidMessage);
    }
  });

  input.addEventListener('input', function () {
    this.setCustomValidity('');
  });
}

// Name
setValidationMessages(
  document.querySelector('input[name="name"]'),
  'Enter your name.',
  'Use 3–10 letters A–Z.'
);

// Surname
setValidationMessages(
  document.querySelector('input[name="surname"]'),
  'Enter your surname.',
  'Use 3–10 letters A–Z.'
);

// Email
setValidationMessages(
  document.querySelector('input[name="email"]'),
  'Email is required.',
  'Enter a valid email (example@mail.com).'
);

// Phone
setValidationMessages(
  document.querySelector('input[name="phone_number"]'),
  'Phone number is required.',
  'Format: 67 1234567'
);

// Card
setValidationMessages(
  document.querySelector('input[name="card_number"]'),
  'Card number is required.',
  'Format: 1111 1111 1111 1111'
);
