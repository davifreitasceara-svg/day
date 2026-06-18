// ============================================
// TechStore - Cart System (localStorage-based)
// ============================================

const Cart = (() => {
  const STORAGE_KEY = 'techstore_cart';

  // --- Helpers ---
  function getItems() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
  }

  function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateBadge();
    renderDrawer();
  }

  // --- Core API ---
  function addItem(product) {
    // product: { id, name, icon, price, oldPrice, category }
    const items = getItems();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    saveItems(items);
    showToast('✅ ' + product.name + ' adicionado ao carrinho!');
    openDrawer();
  }

  function removeItem(id) {
    const items = getItems().filter(i => i.id !== id);
    saveItems(items);
  }

  function updateQty(id, qty) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    item.qty = qty;
    saveItems(items);
  }

  function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    updateBadge();
    renderDrawer();
  }

  function getTotalItems() {
    return getItems().reduce((sum, i) => sum + i.qty, 0);
  }

  function getTotalPrice() {
    return getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  // --- Badge ---
  function updateBadge() {
    const badges = document.querySelectorAll('#cartBadge');
    const total = getTotalItems();
    badges.forEach(b => {
      b.textContent = total;
      b.style.display = total > 0 ? 'flex' : 'none';
    });
  }

  // --- Toast ---
  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerHTML = msg;
    t.style.transform = 'translateY(0)';
    t.style.opacity = '1';
    clearTimeout(t._timeout);
    t._timeout = setTimeout(() => {
      t.style.transform = 'translateY(100px)';
      t.style.opacity = '0';
    }, 3000);
  }

  // --- Drawer ---
  function createDrawer() {
    if (document.getElementById('cartDrawer')) return;

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'cartOverlay';
    overlay.className = 'cart-overlay';
    overlay.addEventListener('click', closeDrawer);
    document.body.appendChild(overlay);

    // Drawer
    const drawer = document.createElement('div');
    drawer.id = 'cartDrawer';
    drawer.className = 'cart-drawer';
    drawer.innerHTML = `
      <div class="cart-drawer-header">
        <h3>🛒 Meu Carrinho</h3>
        <button class="cart-close-btn" id="cartCloseBtn" aria-label="Fechar carrinho">✕</button>
      </div>
      <div class="cart-drawer-body" id="cartDrawerBody"></div>
      <div class="cart-drawer-footer" id="cartDrawerFooter"></div>
    `;
    document.body.appendChild(drawer);

    document.getElementById('cartCloseBtn').addEventListener('click', closeDrawer);
  }

  function openDrawer() {
    createDrawer();
    renderDrawer();
    requestAnimationFrame(() => {
      document.getElementById('cartOverlay').classList.add('active');
      document.getElementById('cartDrawer').classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeDrawer() {
    const overlay = document.getElementById('cartOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay) overlay.classList.remove('active');
    if (drawer) drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderDrawer() {
    const body = document.getElementById('cartDrawerBody');
    const footer = document.getElementById('cartDrawerFooter');
    if (!body || !footer) return;

    const items = getItems();

    if (items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">🛒</div>
          <p>Seu carrinho está vazio</p>
          <span>Adicione produtos para começar!</span>
        </div>`;
      footer.innerHTML = '';
      return;
    }

    body.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-icon">${item.icon}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-category">${item.category || ''}</div>
          <div class="cart-item-price">R$ ${(item.price * item.qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        </div>
        <div class="cart-item-controls">
          <div class="cart-qty-control">
            <button class="cart-qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty - 1})" aria-label="Diminuir">−</button>
            <span class="cart-qty-value">${item.qty}</span>
            <button class="cart-qty-btn" onclick="Cart.updateQty(${item.id}, ${item.qty + 1})" aria-label="Aumentar">+</button>
          </div>
          <button class="cart-remove-btn" onclick="Cart.removeItem(${item.id})" aria-label="Remover">🗑️</button>
        </div>
      </div>
    `).join('');

    const total = getTotalPrice();
    const totalItems = getTotalItems();
    const installment = (total / 12);

    footer.innerHTML = `
      <div class="cart-summary">
        <div class="cart-summary-row">
          <span>Itens (${totalItems})</span>
          <span>R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        <div class="cart-summary-row shipping">
          <span>Frete</span>
          <span class="free-shipping">Grátis ✨</span>
        </div>
        <div class="cart-summary-divider"></div>
        <div class="cart-summary-row total">
          <span>Total</span>
          <span>R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
        </div>
        <div class="cart-installment">
          ou 12x de R$ ${installment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} sem juros
        </div>
      </div>
      <button class="btn btn-accent cart-checkout-btn" onclick="Cart.checkout()">
        Finalizar Compra →
      </button>
      <button class="btn btn-outline cart-clear-btn" onclick="Cart.confirmClear()">
        🗑️ Limpar Carrinho
      </button>
    `;
  }

  function confirmClear() {
    if (confirm('Deseja limpar todo o carrinho?')) {
      clearCart();
      showToast('🗑️ Carrinho limpo!');
    }
  }

  function checkout() {
    const items = getItems();
    if (items.length === 0) return;

    const total = getTotalPrice();
    let msg = '🛒 *Pedido TechStore*\n\n';
    items.forEach(item => {
      msg += `• ${item.name} (x${item.qty}) - R$ ${(item.price * item.qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    });
    msg += `\n💰 *Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}*`;
    msg += `\n\nGostaria de finalizar este pedido!`;

    const phone = '5511999999999';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  // --- Init ---
  function init() {
    updateBadge();

    // Bind cart button
    const cartBtns = document.querySelectorAll('#cartBtn');
    cartBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    addItem,
    removeItem,
    updateQty,
    clearCart,
    getItems,
    getTotalItems,
    getTotalPrice,
    openDrawer,
    closeDrawer,
    confirmClear,
    checkout,
    showToast,
    updateBadge
  };
})();
