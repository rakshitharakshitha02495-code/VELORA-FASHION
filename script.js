let cart = [];

// Cart Functions
function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
}

function addToCart(title, price) {
  cart.push({ title, price });
  updateCartUI();
  openCart();
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartSubtotalEl = document.getElementById('cart-subtotal');

  cartCountEl.innerText = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-msg">Your shopping bag is currently empty.</p>';
    cartSubtotalEl.innerText = '$0.00';
    return;
  }

  let html = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price;
    html += `
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9rem;">
        <div>
          <p style="font-weight: 600;">${item.title}</p>
          <p style="color: #666;">$${item.price.toFixed(2)}</p>
        </div>
        <button onclick="removeFromCart(${index})" style="background:none; border:none; color: red; cursor:pointer;">&times;</button>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = html;
  cartSubtotalEl.innerText = `$${subtotal.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Product Filtering on shop.html
function filterProducts(category, btn) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const products = document.querySelectorAll('.product-card');
  products.forEach(product => {
    if (category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
