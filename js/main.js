import { validateCartItems, getCartTotal } from './cart-validation.js';

const checkoutBtn = document.getElementById('checkout-btn');
const cartErrorList = document.getElementById('cart-errors');

function renderErrors(errors) {
  cartErrorList.innerHTML = '';
  cartErrorList.hidden = errors.length === 0;
  errors.forEach((msg) => {
    const li = document.createElement('li');
    li.textContent = msg;
    cartErrorList.appendChild(li);
  });
}

function getCartItems() {
  const raw = sessionStorage.getItem('cart');
  return raw ? JSON.parse(raw) : [];
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', (e) => {
    const items = getCartItems();
    const { valid, errors } = validateCartItems(items);

    if (!valid) {
      e.preventDefault();
      renderErrors(errors);
      checkoutBtn.setAttribute('aria-disabled', 'true');
      return;
    }

    const total = getCartTotal(items);
    sessionStorage.setItem('checkout_total', total.toFixed(2));
    renderErrors([]);
    checkoutBtn.removeAttribute('aria-disabled');
  });
}
