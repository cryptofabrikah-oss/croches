// Product Data
const products = [
    {
        id: 1,
        name: "Blusa de Crochê Floral",
        category: "roupas",
        price: 89.90,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&crop=center",
        description: "Blusa delicada em crochê com padrão floral, perfeita para o dia a dia.",
        featured: true
    },
    {
        id: 2,
        name: "Bolsa Artesanal Bege",
        category: "bolsas",
        price: 65.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
        description: "Bolsa em crochê com alça de couro, ideal para passeios.",
        featured: true
    },
    {
        id: 3,
        name: "Chapéu de Crochê",
        category: "acessorios",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?w=400&h=400&fit=crop&crop=center",
        description: "Chapéu estiloso em crochê, proteção e elegância.",
        featured: true
    },
    {
        id: 4,
        name: "Vestido Longo de Crochê",
        category: "roupas",
        price: 149.90,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center",
        description: "Vestido longo em crochê, perfeito para ocasiões especiais.",
        featured: false
    },
    {
        id: 5,
        name: "Carteira de Crochê",
        category: "bolsas",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&crop=center",
        description: "Carteira compacta e elegante em crochê.",
        featured: false
    },
    {
        id: 6,
        name: "Lenço Multiuso",
        category: "acessorios",
        price: 28.00,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop&crop=center",
        description: "Lenço versátil em crochê, pode ser usado de várias formas.",
        featured: false
    },
    {
        id: 7,
        name: "Cardigã de Crochê",
        category: "roupas",
        price: 119.90,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center",
        description: "Cardigã aconchegante em crochê, ideal para dias frescos.",
        featured: true
    },
    {
        id: 8,
        name: "Bolsa de Praia",
        category: "bolsas",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&crop=center",
        description: "Bolsa espaçosa em crochê, perfeita para a praia.",
        featured: false
    },
    {
        id: 9,
        name: "Brincos de Crochê",
        category: "acessorios",
        price: 22.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center",
        description: "Brincos delicados em crochê com detalhes únicos.",
        featured: false
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const productModalBody = document.getElementById('productModalBody');
const contactForm = document.getElementById('contactForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadFeaturedProducts();
    loadAllProducts();
    updateCartUI();
    setupSmoothScrolling();
    setupCategoryFilters();
}

function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Cart modal
    cartBtn.addEventListener('click', openCartModal);
    closeCart.addEventListener('click', closeCartModal);
    
    // Product modal
    closeModal.addEventListener('click', closeProductModal);
    
    // Close modals when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) closeCartModal();
    });
    
    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) closeProductModal();
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', handleCheckout);
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function toggleMobileMenu() {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                nav.classList.remove('active');
            }
        });
    });
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterProducts(filter);
        });
    });
}

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const featuredProducts = products.filter(product => product.featured);
    
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to product cards
    addProductCardListeners(featuredContainer);
}

function loadAllProducts() {
    const productsContainer = document.getElementById('productsGrid');
    productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
    
    // Add event listeners to product cards
    addProductCardListeners(productsContainer);
}

function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-bag"></i> Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;
}

function addProductCardListeners(container) {
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on add to cart button
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                return;
            }
            
            const productId = parseInt(this.dataset.productId);
            openProductModal(productId);
        });
    });
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('#productsGrid .product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    showAddToCartFeedback();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCart();
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        cartTotal.textContent = '0,00';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => createCartItem(item)).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2).replace('.', ',');
        checkoutBtn.disabled = false;
    }
}

function createCartItem(item) {
    return `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 1rem; background-color: #CD853F;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showAddToCartFeedback() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #8B4513;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = 'Produto adicionado ao carrinho!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function openCartModal() {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    productModalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
            </div>
            <div>
                <h2 style="font-family: 'Playfair Display', serif; color: #8B4513; margin-bottom: 1rem;">${product.name}</h2>
                <p style="color: #6B5B47; margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>
                <div style="font-size: 1.5rem; font-weight: 600; color: #CD853F; margin-bottom: 2rem;">
                    R$ ${product.price.toFixed(2).replace('.', ',')}
                </div>
                <button onclick="addToCart(${product.id}); closeProductModal();" style="width: 100%; background-color: #808000; color: white; border: none; padding: 1rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fas fa-shopping-bag"></i> Adicionar ao Carrinho
                </button>
                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #F0E6D2;">
                    <h4 style="color: #8B4513; margin-bottom: 1rem;">Detalhes do Produto</h4>
                    <ul style="color: #6B5B47; line-height: 1.8;">
                        <li>✓ Feito artesanalmente</li>
                        <li>✓ Materiais de alta qualidade</li>
                        <li>✓ Peça única</li>
                        <li>✓ Cuidado especial na confecção</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function handleCheckout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    
    const message = `Olá! Gostaria de finalizar minha compra:\n\n${itemsList}\n\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n\nPoderia me ajudar com o pagamento e entrega?`;
    
    const whatsappUrl = `https://wa.me/5411960240152?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after checkout
    cart = [];
    updateCartUI();
    saveCart();
    closeCartModal();
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const whatsappMessage = `Olá! Meu nome é ${name}.\n\nE-mail: ${email}\n\nMensagem: ${message}`;
    const whatsappUrl = `https://wa.me/541160240152?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    e.target.reset();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #808000;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
    `;
    successMessage.textContent = 'Mensagem enviada! Redirecionando para WhatsApp...';
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(250, 248, 245, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--warm-white)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add CSS animation for slide in right
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);