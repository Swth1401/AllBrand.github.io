export function setupCart() {
  const cartButton = document.getElementById('cart-button');
  const cartPanel = document.getElementById('cart-panel');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  let cart = [];

  cartButton.addEventListener('click', () => cartPanel.classList.add('open'));
  closeCartBtn.addEventListener('click', () => cartPanel.classList.remove('open'));

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity++;
    else { product.quantity = 1; cart.push(product); }
    updateCartUI();
  }

  function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    if (!cart.length) {
      cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
      cartCount.textContent = '0';
      cartTotal.textContent = 'Total: S/ 0';
      return;
    }
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>Precio unitario: S/ ${item.price}</p>
          <p>Cantidad: <span class="cart-item-quantity">${item.quantity}</span></p>
          <p>Subtotal: S/ ${item.price * item.quantity}</p>
        </div>`;
      cartItemsContainer.appendChild(div);
    });
    cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartTotal.textContent = `Total: S/ ${total}`;
  }

  document.querySelectorAll('.product-card').forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const name = card.querySelector('h4').textContent;
      const price = parseFloat(card.querySelector('.price').textContent.replace(/[^0-9.,]/g, '').replace(',', '.'));
      const img = card.querySelector('img').src;
      addToCart({ id: i, name, price, img });
      alert(`${name} agregado al carrito`);
    });
  });
}
