const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

function validateCartItems(items) {
  const errors = [];

  if (!items || items.length === 0) {
    return { valid: false, errors: ['Your cart is empty.'] };
  }

  for (const item of items) {
    if (!item.id || !item.name) {
      errors.push(`Invalid item data: missing id or name.`);
      continue;
    }

    if (!Number.isInteger(item.quantity) || item.quantity < MIN_QUANTITY) {
      errors.push(`"${item.name}" must have a quantity of at least ${MIN_QUANTITY}.`);
    }

    if (item.quantity > MAX_QUANTITY) {
      errors.push(`"${item.name}" quantity cannot exceed ${MAX_QUANTITY}.`);
    }

    if (typeof item.price !== 'number' || item.price <= 0) {
      errors.push(`"${item.name}" has an invalid price.`);
    }

    if (item.outOfStock) {
      errors.push(`"${item.name}" is out of stock and cannot be purchased.`);
    }
  }

  return { valid: errors.length === 0, errors };
}

function getCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export { validateCartItems, getCartTotal };
