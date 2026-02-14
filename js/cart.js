const CART_KEY = 'cart';
const CURRENCY_SYMBOL = 'Rs.';

function formatPrice(price) {
    return `${CURRENCY_SYMBOL} ${price.toLocaleString('en-PK')}`;
}

function initCart() {
    if (!localStorage.getItem(CART_KEY)) {
        localStorage.setItem(CART_KEY, JSON.stringify([]));
    }
}

function getCart() {
    initCart();
    return JSON.parse(localStorage.getItem(CART_KEY));
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const product = getProductById(productId);
    
    if (!product) {
        console.error('Product not found:', productId);
        return false;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart(cart);
    updateCartCount();
    showCartToast();
    
    return true;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    loadCart();
}

function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        item.quantity = quantity;
        saveCart(cart);
        updateCartCount();
        loadCart();
    }
}

function clearCart() {
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    updateCartCount();
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartCount() {
    const count = getCartItemCount();
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = count;
        el.classList.add('cart-animate');
        setTimeout(() => el.classList.remove('cart-animate'), 300);
    });
}

function createCartItemHTML(item) {
    const itemTotal = item.price * item.quantity;
    
    return `
        <div class="cart-item d-flex align-items-center">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
            <div class="flex-grow-1">
                <h6 class="mb-1 fw-bold">${item.name}</h6>
                <p class="mb-1 text-muted small">${formatPrice(item.price)} each</p>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="quantity-badge mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </div>
            <div class="text-end ms-3">
                <p class="fw-bold mb-1">${formatPrice(itemTotal)}</p>
                <button class="btn btn-sm btn-outline-danger" onclick="confirmRemove('${item.id}')">
                    <i class="bi bi-trash"></i> Remove
                </button>
            </div>
        </div>
    `;
}

function loadCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartContentDiv = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        if (emptyCartDiv) emptyCartDiv.classList.remove('d-none');
        if (cartContentDiv) cartContentDiv.classList.add('d-none');
        return;
    }
    
    if (emptyCartDiv) emptyCartDiv.classList.add('d-none');
    if (cartContentDiv) cartContentDiv.classList.remove('d-none');
    
    if (cartItemsContainer) {
        const cartHTML = cart.map(item => createCartItemHTML(item)).join('');
        cartItemsContainer.innerHTML = cartHTML;
    }
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (taxEl) taxEl.textContent = formatPrice(tax);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

function showCartToast() {
    const toastEl = document.getElementById('cartToast');
    if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}

let itemToRemove = null;

function confirmRemove(productId) {
    itemToRemove = productId;
    const modal = new bootstrap.Modal(document.getElementById('removeModal'));
    modal.show();
}

if (document.getElementById('confirmRemove')) {
    document.getElementById('confirmRemove').addEventListener('click', function() {
        if (itemToRemove) {
            removeFromCart(itemToRemove);
            itemToRemove = null;
            bootstrap.Modal.getInstance(document.getElementById('removeModal')).hide();
        }
    });
}

initCart();
