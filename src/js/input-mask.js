const buyForm = document.getElementById('buyForm');
const reviewForm = document.getElementById('reviewForm');
const subscribeForm = document.getElementById('subscribeForm');

function phoneNumberMask(input) {
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '').slice(0, 9);
    if (v.length > 2) v = v.slice(0, 2) + ' ' + v.slice(2);
    input.value = v;
  });
}

function cardNumberMask(input) {
  input.addEventListener('input', () => {
    let v = input.value.replace(/\D/g, '').slice(0, 16);
    v = v.replace(/(.{4})/g, '$1 ').trim();
    input.value = v;
  });
}

phoneNumberMask(buyForm.phone_number);
phoneNumberMask(reviewForm.phone_number);
cardNumberMask(buyForm.card_number);

function capitalizeFirst(input) {
  input.addEventListener('input', () => {
    let v = input.value.toLowerCase();
    input.value = v.charAt(0).toUpperCase() + v.slice(1);
  });
}

capitalizeFirst(buyForm.name);
capitalizeFirst(buyForm.surname);
capitalizeFirst(reviewForm.name);

const fields = [
  {
    el: buyForm.name,
    empty: 'Enter your name.',
    invalid: 'Use 3–10 letters, first letter uppercase.',
  },
  {
    el: buyForm.surname,
    empty: 'Enter your surname.',
    invalid: 'Use 3–10 letters, first letter uppercase.',
  },
  {
    el: buyForm.email,
    empty: 'Email is required.',
    invalid: 'Enter a valid email (example@mail.com).',
  },
  {
    el: buyForm.phone_number,
    empty: 'Phone number is required.',
    invalid: 'Format: 67 1234567',
  },
  {
    el: buyForm.card_number,
    empty: 'Card number is required.',
    invalid: 'Format: 1111 1111 1111 1111',
  },
  {
    el: reviewForm.name,
    empty: 'Enter your name.',
    invalid: 'Use 3–10 letters, first letter uppercase.',
  },
  {
    el: reviewForm.email,
    empty: 'Email is required.',
    invalid: 'Enter a valid email (example@mail.com).',
  },
  {
    el: reviewForm.phone_number,
    empty: 'Phone number is required.',
    invalid: 'Format: 67 1234567',
  },
  {
    el: subscribeForm.email,
    empty: 'Email is required.',
    invalid: 'Enter a valid email (example@mail.com).',
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

buyForm.addEventListener('submit', e => {
  e.preventDefault();

  prepareValidation();

  if (buyForm.checkValidity()) {
    console.log('FORM OK');
    buyForm.reset(); // ✔ очищается
  } else {
    buyForm.reportValidity(); // ❗ ТОЛЬКО кастомные сообщения
  }
});

reviewForm.addEventListener('submit', e => {
  e.preventDefault();

  prepareValidation();

  if (reviewForm.checkValidity()) {
    console.log('FORM OK');
    reviewForm.reset(); // ✔ очищается
  } else {
    reviewForm.reportValidity(); // ❗ ТОЛЬКО кастомные сообщения
  }
});

subscribeForm.addEventListener('submit', e => {
  e.preventDefault();

  prepareValidation();

  if (subscribeForm.checkValidity()) {
    console.log('FORM OK');
    subscribeForm.reset(); // ✔ очищается
  } else {
    subscribeForm.reportValidity(); // ❗ ТОЛЬКО кастомные сообщения
  }
});
