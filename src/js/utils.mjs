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
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlStrings = list.map(item => templateFn(item));
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const template = templateFn(data);
  parentElement.insertAdjacentHTML(position, template);
  if (callback) {
    callback(data);
  }
}

// Function to load template from a given path
export function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    } else {
      throw new Error(`Failed to load template from ${path}`);
    }
  };
}

// Function to load and render header and footer
export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const headerEl = qs('header');
  const footerEl = qs('footer');

  const headerHTML = await headerTemplateFn();
  const footerHTML = await footerTemplateFn();

  renderWithTemplate(() => headerHTML, headerEl);
  renderWithTemplate(() => footerHTML, footerEl);
}

// Function to animate cart icon when item is added to cart
export function animateCartIcon() {
  const cartIcon = document.getElementById('cart-icon');
  // Add the class to change the color
  cartIcon.classList.add('adding-item');

  // Remove the class after the transition ends
  setTimeout(() => {
    cartIcon.classList.remove('adding-item');
  }, 500); // 500ms matches the CSS transition duration
}