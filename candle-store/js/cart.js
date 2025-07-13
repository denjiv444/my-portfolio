// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sample product images - in a real app, these would be part of the product data
const productImages = {
  1: 'images/candle1.jpg',
  2: 'images/candle2.jpg',
  3: 'images/candle3.jpg',
  4: 'images/candle4.jpg',
  5: 'images/candle5.jpg',
  // Default image for products without specific images
  default: 'https://via.placeholder.com/80x80/e8cfae/4a4031?text=Candle'
};

// Update cart count in the header
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCounts = document.querySelectorAll('.cart-count');
  
  cartCounts.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  // Show confirmation
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = 'var(--success-green)';
  toast.style.color = 'white';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = 'var(--shadow-md)';
  toast.style.zIndex = '1000';
  toast.style.transition = 'all 0.3s ease';
  toast.textContent = `${product.name} added to cart!`;
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Remove product from cart
function removeFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    const removedItem = cart[itemIndex];
    cart.splice(itemIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
    
    // Show confirmation
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.background = 'var(--error-red)';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = 'var(--shadow-md)';
    toast.style.zIndex = '1000';
    toast.style.transition = 'all 0.3s ease';
    toast.textContent = `${removedItem.name} removed from cart`;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
}

// Update product quantity
function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) return;
  
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
  }
}

// Render cart items
function renderCartItems() {
  // Get DOM elements
  const cartItemsContainer = document.getElementById('cart-items');
  const orderSummary = document.getElementById('order-summary');
  const emptyCart = document.getElementById('empty-cart');
  const subtotalElement = document.getElementById('subtotal');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');
  
  if (!cartItemsContainer) return;
  
  // Get cart header (we'll keep it)
  const cartHeader = cartItemsContainer.querySelector('.cart-header');
  
  // Clear cart items container but keep the header
  cartItemsContainer.innerHTML = '';
  if (cartHeader) {
    cartItemsContainer.appendChild(cartHeader);
  }
  
  // Check if cart has items
  if (!cart || cart.length === 0) {
    console.log("Cart is empty, showing empty cart message");
    cartItemsContainer.classList.add('hidden');
    if (emptyCart) {
      emptyCart.classList.add('hidden');
    }
    if (orderSummary) {
      orderSummary.classList.add('hidden');
    }
    return;
  }
  
  // Cart has items, show cart items and order summary
  console.log("Cart has items, showing cart items");
  cartItemsContainer.classList.remove('hidden');
  if (emptyCart) {
    emptyCart.classList.add('hidden');
  }
  if (orderSummary) {
    orderSummary.classList.remove('hidden');
  }
  
  // Calculate totals
  let subtotal = 0;
  
  // Render each cart item
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    
    // Get product image or use default
    const productImage = productImages[item.id] || productImages.default;
    
    itemElement.innerHTML = `
      <img src="${productImage}" alt="${item.name}" class="item-image">
      
      <div class="item-info">
        <h3>${item.name}</h3>
        <p class="price">$${item.price.toFixed(2)}</p>
      </div>
      
      <div class="item-quantity">
        <button class="quantity-btn decrease-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
               onchange="updateQuantity(${item.id}, parseInt(this.value))">
        <button class="quantity-btn increase-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
      </div>
      
      <div class="item-total">
        $${itemTotal.toFixed(2)}
      </div>
      
      <button class="remove-btn" onclick="removeFromCart(${item.id})">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    `;
    
    cartItemsContainer.appendChild(itemElement);
  });
  
  // Calculate tax and total
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  
  // Update summary values
  if (subtotalElement) {
    subtotalElement.textContent = subtotal.toFixed(2);
  }
  
  if (taxElement) {
    taxElement.textContent = tax.toFixed(2);
  }
  
  if (totalElement) {
    totalElement.textContent = total.toFixed(2);
  }
  
  // Setup checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      alert('Thank you for your order! This is a demo checkout process.');
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Make sure we're working with the latest cart data
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Debug log to check cart contents
  console.log('Cart contents:', cart);
  
  // Update cart count
  updateCartCount();
  
  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Render cart items if on cart page
  if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
  }
  
  // Setup newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing with ${email}!`);
      this.reset();
    });
  }
});