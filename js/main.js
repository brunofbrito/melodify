// main.js
console.log('Script loaded for melodify_website');

// Auto-format card number as groups of 4 digits
document.getElementById('card-number').addEventListener('input', function (e) {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
  e.target.value = digits.replace(/(.{4})/g, '$1 ').trim();
});

// Auto-format expiry as MM / YY
document.getElementById('expiry').addEventListener('input', function (e) {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    e.target.value = digits.slice(0, 2) + ' / ' + digits.slice(2);
  } else {
    e.target.value = digits;
  }
});

// Restrict CVV to digits only
document.getElementById('cvv').addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

// Validation helpers
function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validateCardNumber(value) {
  return value.replace(/\s/g, '').length === 16;
}

function validateExpiry(value) {
  const match = value.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) return false;
  const month = parseInt(match[1], 10);
  const year = parseInt('20' + match[2], 10);
  const now = new Date();
  const expDate = new Date(year, month - 1);
  return month >= 1 && month <= 12 && expDate >= new Date(now.getFullYear(), now.getMonth());
}

function validateCvv(value) {
  return /^\d{3,4}$/.test(value);
}

function setFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  input.classList.toggle('input-error', !!message);
  let hint = input.parentElement.querySelector('.field-error');
  if (message) {
    if (!hint) {
      hint = document.createElement('span');
      hint.className = 'field-error';
      input.parentElement.appendChild(hint);
    }
    hint.textContent = message;
  } else if (hint) {
    hint.remove();
  }
}

document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  const email = document.getElementById('email').value;
  if (!validateEmail(email)) {
    setFieldError('email', 'Enter a valid email address.');
    valid = false;
  } else {
    setFieldError('email', '');
  }

  const cardNumber = document.getElementById('card-number').value;
  if (!validateCardNumber(cardNumber)) {
    setFieldError('card-number', 'Card number must be 16 digits.');
    valid = false;
  } else {
    setFieldError('card-number', '');
  }

  const expiry = document.getElementById('expiry').value;
  if (!validateExpiry(expiry)) {
    setFieldError('expiry', 'Enter a valid expiry date.');
    valid = false;
  } else {
    setFieldError('expiry', '');
  }

  const cvv = document.getElementById('cvv').value;
  if (!validateCvv(cvv)) {
    setFieldError('cvv', 'CVV must be 3 or 4 digits.');
    valid = false;
  } else {
    setFieldError('cvv', '');
  }

  if (valid) {
    document.getElementById('checkout-form').dispatchEvent(new Event('checkout:valid'));
  }
});
