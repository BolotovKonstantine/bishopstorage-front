import { qs, getLocalStorage, setLocalStorage,loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML = '<p>Your cart is empty.</p>';
  } else {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    attachDeleteListeners(); // Attach listeners after rendering
  }
}

function cartItemTemplate(item) {
  let newItem;
  newItem = `<li class="cart-card divider" data-id="${item.Id}">
    <span class="delete-item" data-id="${item.Id}">✖</span>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Function to attach delete listeners
function attachDeleteListeners() {
  document.querySelectorAll('.delete-item').forEach(function(button) {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      removeItemFromCart(productId);
    });
  });
}

// Function to remove single instance of an item from the cart
function removeItemFromCart(productId) {
  let cartItems = getLocalStorage('so-cart') || [];
  const itemIndex = cartItems.findIndex(item => item.Id === productId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    setLocalStorage('so-cart', cartItems);
    renderCartContents(); // Re-render the cart
  }
}

// Initial rendering of cart contents
renderCartContents();

// Cart Total

document.addEventListener('DOMContentLoaded', () => {
  const cartFooter = qs('.cart-footer');
  const cartTotal = qs('.cart-total');

  // Retrieve cart items using getLocalStorage
  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length > 0) {
    // Calculate the total (assuming each item has a 'FinalPrice' property)
    const total = cartItems.reduce((sum, item) => sum + (item.FinalPrice * item.quantity || 0), 0);

    // Create HTML to display the total
    cartTotal.innerHTML = `Total: <strong>$${total.toFixed(2)}</strong>`;

    // Show the cart-footer element
    cartFooter.classList.remove('hide');
  } else {
    // Hide the cart-footer if the cart is empty
    cartFooter.classList.add('hide');
  }
});


//