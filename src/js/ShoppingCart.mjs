import { getLocalStorage } from './utils.mjs';

// Template for rendering a single cart item
function cartItemTemplate(item) {
  const colorName = item.Colors?.[0]?.ColorName || 'No color specified';
  const quantity = item.Quantity || 1;

  return `
    <li class='cart-card divider'>
      <a href='#' class='cart-card__image'>
        <img
          src='${item.Image || ''}'
          alt='${item.Name || 'Product image'}'
        />
      </a>
      <a href='#'>
        <h2 class='card__name'>${item.Name || 'Unnamed Product'}</h2>
      </a>
      <p class='cart-card__color'>${colorName}</p>
      <p class='cart-card__quantity'>Qty: ${quantity}</p>
      <p class='cart-card__price'>$${item.FinalPrice?.toFixed(2) || '0.00'}</p>
    </li>`;
}

// ShoppingCart Class
export default class ShoppingCart {
  /**
   * Creates a ShoppingCart instance
   * @param {string} key - The localStorage key for cart items.
   * @param {string} parentSelector - The selector for the parent element to render the cart.
   */
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  /**
   * Renders the contents of the shopping cart
   */
  renderCartContents() {
    // Retrieve cart items from local storage
    const cartItems = getLocalStorage(this.key) || [];

    // Generate HTML for each cart item
    const htmlItems = cartItems.map(cartItemTemplate);

    // Find the parent container and inject the HTML
    const parentElement = document.querySelector(this.parentSelector);

    if (parentElement) {
      parentElement.innerHTML = htmlItems.join('');
    } else {
      console.error(`Parent element not found: ${this.parentSelector}`);
    }
  }
}
