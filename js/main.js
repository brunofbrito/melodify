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
