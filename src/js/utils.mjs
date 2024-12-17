// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
 
export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value  = urlParams.get(param);
  return value;

}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false){
  const htmlStrings = list.map(templateFn);
  // clear out content of the parent when clear = true
  if (clear == true) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML('afterbegin', template);
  //if there is a callback...call it and pass data
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const headerElement = document.querySelector('#main-header');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const footerElement = document.querySelector('#main-footer');

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function (e) {
    if (e.target.tagName == 'SPAN') {
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach((alert) => document.querySelector('main').removeChild(alert));
}

// Function to run cart animation when item is added to cart
export function animateCart() {
  // Select the cart icon dynamically
  const cartIcon = document.querySelector('.cart-icon');

  // Check if cartIcon exists to avoid runtime errors
  if (cartIcon) {
    // Add the animation class
    cartIcon.classList.add('animated');

    // Remove the animation class after animation ends
    cartIcon.addEventListener(
      'animationend',
      () => {
        cartIcon.classList.remove('animated');
      },
      { once: true }
    );
  } else {
    console.warn('Cart icon not found!');
  }
}
