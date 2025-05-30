const CART_KEY = 'allbasketball_cart';
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

export function setupCart () {
  const cartBtn   = document.getElementById('cart-button');
  const cartPanel = document.getElementById('cart-panel');
  const closeBtn  = document.getElementById('close-cart');
  const itemsBox  = document.getElementById('cart-items');
  const countEl   = document.getElementById('cart-count');
  const totalEl   = document.getElementById('cart-total');

  // Crear botón "Finalizar Pedido"
  let checkoutBtn = document.getElementById('checkout-btn');
  if (!checkoutBtn) {
    checkoutBtn = document.createElement('button');
    checkoutBtn.id = 'checkout-btn';
    checkoutBtn.className = 'checkout-btn';
    checkoutBtn.textContent = 'Finalizar Pedido';
    checkoutBtn.onclick = () => {
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = 'Procesando...';
      setTimeout(() => {
        window.location.href = 'FinalizarPedido.html';
      }, 1500);
    };
    closeBtn.after(checkoutBtn);
  }

  cartBtn?.addEventListener('click', () => cartPanel.classList.add('open'));
  closeBtn?.addEventListener('click', () => cartPanel.classList.remove('open'));

  render();

  function save () {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function inc (p) {
    p.qty++;
    save();
    render();
  }

  function dec (p) {
    p.qty--;
    if (p.qty <= 0) cart = cart.filter(i => i !== p);
    save();
    render();
  }

  function del (p) {
    cart = cart.filter(i => i !== p);
    save();
    render();
  }

  function render () {
    itemsBox.innerHTML = '';

    if (!cart.length) {
      itemsBox.innerHTML = '<p>Tu carrito está vacío.</p>';
      countEl.textContent = '0';
      totalEl.textContent = 'Total: S/ 0';
      checkoutBtn.style.display = 'none';
      return;
    }

    checkoutBtn.disabled = false;
    checkoutBtn.textContent = 'Finalizar Pedido';
    checkoutBtn.style.display = 'inline-block';

    let total = 0;
    cart.forEach(prod => {
      total += prod.price * prod.qty;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${prod.img}" alt="${prod.name}" />
        <div class="cart-item-details">
          <h4>${prod.name}</h4>
          <p>Color: ${prod.color} &nbsp;|&nbsp; Talla: ${prod.size}</p>
          <p>Precio: S/ ${prod.price.toFixed(2)}</p>

          <div class="qty-controls">
            <button class="dec">-</button>
            <span>${prod.qty}</span>
            <button class="inc">+</button>
            <button class="del">🗑</button>
          </div>

          <p>Subtotal: S/ ${(prod.price * prod.qty).toFixed(2)}</p>
        </div>
      `;

      row.querySelector('.inc').onclick = () => inc(prod);
      row.querySelector('.dec').onclick = () => dec(prod);
      row.querySelector('.del').onclick = () => del(prod);

      itemsBox.appendChild(row);
    });

    countEl.textContent = cart.reduce((s, p) => s + p.qty, 0);
    totalEl.textContent = `Total: S/ ${total.toFixed(2)}`;
  }
}

export function addToCart (prod) {
  const list = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const same = list.find(p => p.id === prod.id && p.color === prod.color && p.size === prod.size);
  if (same) same.qty += prod.qty || 1;
  else      list.push({ ...prod, qty: prod.qty || 1 });
  localStorage.setItem(CART_KEY, JSON.stringify(list));
}
