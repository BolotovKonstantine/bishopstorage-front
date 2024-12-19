import { getLocalStorage, setLocalStorage, alertMessage, animateCart  } from './utils.mjs';

function productDetailsTemplate(product) {
  const propertyNames = Object.keys(product.properties);
  const propertyValues = Object.values(product.properties);
  return `<section class="product-detail"> <h3>${product.title}</h3>
    <h2 class="divider">${product.description}</h2>
    <p class="product-card__price">Location: ${product.location}</p>
    <p class="product__prop0">${propertyNames[0]}: ${propertyValues[0]}</p>
    <p class="product__prop1">${propertyNames[1]}: ${propertyValues[1]}</p>
    <p class="product__prop2">${propertyNames[2]}: ${propertyValues[2]}</p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      <p></p>
      <button id="add-to-wishlist" data-id="${product.Id}">Add to Wishlist</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // Use the datasource to get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product details HTML
    this.renderProductDetails('main');

    // Add event listeners to both buttons
    const addToWishlistButton = document.getElementById('add-to-wishlist');
    const addToCartButton = document.getElementById('addToCart');

    if (addToWishlistButton) {
      addToWishlistButton.addEventListener('click', this.addtowishlist.bind(this));
    }

    if (addToCartButton) {
      addToCartButton.addEventListener('click', this.addToCart.bind(this));
    }
  }
  addToCart() {
    let cartItems = getLocalStorage('so-cart');

    if (!cartItems) {
      cartItems = [];
    } else if (!Array.isArray(cartItems)) {
      // Handle case where previous item was stored as a single object
      cartItems = [cartItems];
    }
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.Id === this.product.Id);

    if(existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
    } else {
        this.product.quantity = 1;
        cartItems.push(this.product);
    }
    setLocalStorage('so-cart', cartItems);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);

    // Call animateCart on the cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        animateCart(cartIcon);
    }
  }
  addtowishlist() {
    let wishlistItems = getLocalStorage('so-wishlist');
    if (!wishlistItems) {
      wishlistItems = [];
    } else if (!Array.isArray(wishlistItems)) {
      // Handle case where previous item was stored as a single object
      wishlistItems = [wishlistItems];
    }

    const existingItemIndex = wishlistItems.findIndex(wishItem => wishItem.Id === this.product.Id);

    if (existingItemIndex !== -1) {
      // If item already exists, alert that it already exists
      alertMessage(`${this.product.NameWithoutBrand} is already in your wishlist!`);
    } else {
      // Add the item to wishlist and alert that it was added
      wishlistItems.push(this.product);
      setLocalStorage('so-wishlist', wishlistItems);
      alertMessage(`${this.product.NameWithoutBrand} added to your wishlist!`);
    }
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      'afterBegin',
      productDetailsTemplate(this.product)
    );
  }
}
