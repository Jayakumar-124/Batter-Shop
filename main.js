const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Sticky Header Effect
// Sticky Header Effect
const header = document.getElementById('main-header');

// Inject Global Drawers (Cart, Wishlist, Search) if not present
function injectDrawers() {
    if (document.getElementById('cart-drawer')) return; // Already exists

    const drawersHTML = `
    <!-- Grain Texture -->
    <div class="bg-grain"></div>
    <!-- Particle Field -->
    <div class="particle-field" id="particle-field"></div>

    <!-- Global Search Overlay -->
    <div id="search-overlay" class="search-overlay">
        <div class="search-close" id="search-close">&times;</div>
        <div class="search-container">
            <h2>Search <span class="script-font">Hesha</span></h2>
            <div class="search-input-group">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" id="search-input" placeholder="Search for products, recipes..." autocomplete="off">
            </div>
            <div id="search-results" class="search-results"></div>
        </div>
    </div>

    <!-- Global Cart Drawer -->
    <div id="cart-overlay" class="cart-overlay"></div>
    <div id="cart-drawer" class="cart-drawer">
        <div class="cart-header">
            <h2>Your <span class="script-font">Shopping Cart</span></h2>
            <div class="cart-close" id="cart-close">&times;</div>
        </div>
        <div id="cart-items" class="cart-items"></div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span id="cart-total-amount">₹0.00</span>
            </div>
            <button class="btn btn-primary cart-btn" id="checkout-btn">Proceed to Checkout</button>
            <button class="btn" style="width: 100%; background: var(--bg-secondary); color: var(--text-dark);"
                id="continue-shopping">Continue Shopping</button>
        </div>
    </div>

    <!-- Global Wishlist Drawer -->
    <div id="wishlist-overlay" class="cart-overlay"></div>
    <div id="wishlist-drawer" class="cart-drawer">
        <div class="cart-header">
            <h2>Your <span class="script-font">Wishlist</span></h2>
            <div class="cart-close" id="wishlist-close">&times;</div>
        </div>
        <div id="wishlist-items" class="cart-items"></div>
        <div class="cart-footer">
            <button class="btn btn-primary cart-btn" id="add-all-to-cart">Add All to Cart</button>
            <button class="btn" style="width: 100%; background: var(--bg-secondary); color: var(--text-dark);"
                id="wishlist-continue-shopping">Continue Shopping</button>
        </div>
    </div>

    <!-- Global Checkout Address Modal -->
    <div id="checkout-modal" class="search-overlay">
        <div class="search-container"
            style="max-width: 500px; background: var(--bg-surface); padding: 2rem; border-radius: 20px; box-shadow: var(--shadow-strong); border: 1px solid rgba(255,255,255,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; color: var(--text-main);">
                <h2 style="font-size: 1.8rem; margin: 0; color: var(--text-main);">Confirm <span class="script-font"
                        style="font-style: italic; color: var(--accent);">Address</span></h2>
                <div class="search-close" id="checkout-close"
                    style="position: static; color: var(--text-muted); font-size: 1.5rem;">&times;</div>
            </div>

            <form id="checkout-form" style="text-align: left;">
                <div class="form-group">
                    <label for="address-fullname">Full Name</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" id="address-fullname" required placeholder="Enter your full name">
                    </div>
                </div>

                <div class="form-group">
                    <label for="address-street">Street Address</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-location-dot"></i>
                        <input type="text" id="address-street" required placeholder="House No, Street Name">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label for="address-city">City</label>
                        <div class="input-wrapper">
                            <i class="fa-solid fa-city"></i>
                            <input type="text" id="address-city" required placeholder="City">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="address-zip">Zip Code</label>
                        <div class="input-wrapper">
                            <i class="fa-solid fa-map-pin"></i>
                            <input type="text" id="address-zip" required placeholder="Zip Code">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="address-phone">Phone Number</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-phone"></i>
                        <input type="tel" id="address-phone" required placeholder="+91 98765 43210">
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Confirm & Place Order</button>
            </form>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', drawersHTML);
    initParticles();
}

// Live Particle System
function initParticles() {
    const field = document.getElementById('particle-field');
    if (!field) return;

    // Clear existing
    field.innerHTML = '';

    const count = 40;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';

        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const bottom = Math.random() * 20;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${left}%`;
        p.style.bottom = `-${bottom}%`;
        p.style.setProperty('--duration', `${duration}s`);
        p.style.animationDelay = `${delay}s`;

        field.appendChild(p);
    }
}

// Ensure drawers are injected immediately
injectDrawers();

window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on Scroll (Simple implementation)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const revealOnScroll = () => {
    document.querySelectorAll('.product-card, .value-item, .process-item').forEach(el => {
        if (!el.classList.contains('reveal-init')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            el.classList.add('reveal-init');
            observer.observe(el);
        }
    });
};

revealOnScroll();
// Also run it after a short delay to catch dynamic items
setTimeout(revealOnScroll, 1000);

// Search Functionality
// These will work because injectDrawers ran before this
const searchBtn = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchClose = document.getElementById('search-close');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

if (searchBtn && searchOverlay && searchClose) {
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchOverlay.classList.add('active');
        if (searchInput) searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchOverlay.classList.remove('active');
        }
    });

    // Close on clicking outside container
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });
}

// Mock Data for Search
const searchData = [
    { title: 'Idli & Dosa Batter', type: 'Product', url: 'index.html#products', img: 'JPG/Front.jpeg' },
    { title: 'Golden Masala Dosa', type: 'Recipe', url: 'recipes.html', img: 'Golden Masala Dosa.png' },
    { title: 'Cloud-Soft Idlis', type: 'Recipe', url: 'recipes.html', img: 'Cloud-Soft Idlis.png' },
    { title: 'Cheese & Corn Padhdu', type: 'Recipe', url: 'recipes.html', img: 'Cheese & Corn Padhdu.png' }
];

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (searchResults) searchResults.innerHTML = '';

        if (query.length > 1) {
            const filtered = searchData.filter(item =>
                item.title.toLowerCase().includes(query)
            );

            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `
                    <img src="${item.img}" alt="${item.title}">
                    <div class="search-result-info">
                        <h4>${item.title}</h4>
                        <p>${item.type}</p>
                    </div>
                `;
                div.onclick = () => window.location.href = item.url;
                if (searchResults) searchResults.appendChild(div);
            });

            if (filtered.length === 0 && searchResults) {
                searchResults.innerHTML = '<p style="text-align: center; color: var(--text-muted); opacity: 0.5; width: 100%;">No results found.</p>';
            }
        }
    });
}

// --- State Management ---
let cart = [];
let wishlist = [];

try {
    cart = JSON.parse(localStorage.getItem('hesha_cart')) || [];
    wishlist = JSON.parse(localStorage.getItem('hesha_wishlist')) || [];
} catch (e) {
    console.warn("Could not load cart/wishlist from localStorage", e);
}

// Global UI Elements
const cartCountBadge = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-amount');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartBtn = document.getElementById('cart-btn');

const wishlistCountBadge = document.getElementById('wishlist-count');
const wishlistItemsContainer = document.getElementById('wishlist-items');
const wishlistDrawer = document.getElementById('wishlist-drawer');
const wishlistOverlay = document.getElementById('wishlist-overlay');
const wishlistClose = document.getElementById('wishlist-close');
const wishlistBtn = document.getElementById('wishlist-btn');

// --- Product Loading Logic ---
async function loadProducts() {
    // Only run this on the home page products section
    const productsSection = document.getElementById('products');
    if (!productsSection) return;

    const grid = productsSection.querySelector('.product-grid');
    if (!grid) return;

    try {
        const res = await fetch(`${API_BASE_URL}/products`);
        if (!res.ok) throw new Error("Backend not reachable");
        const products = await res.json();

        if (products && products.length > 0) {
            // We keep the static HTML as per user request ("permanently")
            // Just ensure it's revealed and interactive
            const firstProductCard = grid.querySelector('.product-card');
            if (firstProductCard) {
                firstProductCard.style.opacity = '1';
                firstProductCard.style.transform = 'translateY(0)';
                if (typeof observer !== 'undefined') observer.observe(firstProductCard);
            }
        }
        updateWishlistUI();
    } catch (e) {
        console.warn("Using static fallback for products.", e);
    }
}

// --- Cart Logic ---
function updateCartUI() {
    if (cartCountBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalItems;
        cartCountBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>';
            if (cartTotalElement) cartTotalElement.textContent = '₹0.00';
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <span class="item-price">₹${item.price.toFixed(2)}</span>
                        <div class="quantity-controls">
                            <button onclick="changeQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="remove-item" onclick="removeFromCart(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartTotalElement) cartTotalElement.textContent = `₹${total.toFixed(2)}`;
        }
    }
    localStorage.setItem('hesha_cart', JSON.stringify(cart));
}

window.addToCart = function (title, price, img) {
    const user = JSON.parse(localStorage.getItem('hesha_user'));

    if (!user || !user.isLoggedIn) {
        showNotification("Login Required", "You must be logged in to add items to the cart.", "Login Now", () => {
            window.location.href = 'login.html';
        });
        return;
    }

    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, img, quantity: 1 });
    }
    updateCartUI();
    if (cartDrawer && cartOverlay) {
        openCart();
    }
};

window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCartUI();
};

window.changeQuantity = function (index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) {
        removeFromCart(index);
    } else {
        updateCartUI();
    }
};

// --- Wishlist Logic ---
function updateWishlistUI() {
    if (wishlistCountBadge) {
        const totalItems = wishlist.length;
        wishlistCountBadge.textContent = totalItems;
        wishlistCountBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Update Heart Icons globally (Home & Recipes)
    document.querySelectorAll('.product-card, .recipe-card').forEach(card => {
        const titleElement = card.querySelector('h3');
        if (!titleElement) return;
        const title = titleElement.textContent.trim();
        const heartBtn = card.querySelector('.wishlist-heart-btn');
        if (heartBtn) {
            const isInWishlist = wishlist.some(item => item.title === title);
            if (isInWishlist) {
                heartBtn.classList.add('active');
                if (heartBtn.querySelector('i')) {
                    heartBtn.querySelector('i').className = 'fa-solid fa-heart';
                }
            } else {
                heartBtn.classList.remove('active');
                if (heartBtn.querySelector('i')) {
                    heartBtn.querySelector('i').className = 'fa-regular fa-heart';
                }
            }
        }
    });

    if (wishlistItemsContainer) {
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<p class="cart-empty-msg">Your wishlist is empty.</p>';
        } else {
            wishlistItemsContainer.innerHTML = wishlist.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <span class="item-price">₹${item.price.toFixed(2)}</span>
                        <div class="item-actions">
                            <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="moveToCart(${index})">Add to Cart</button>
                        </div>
                    </div>
                    <div class="remove-item" onclick="removeFromWishlist(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            `).join('');
        }
    }
    localStorage.setItem('hesha_wishlist', JSON.stringify(wishlist));
}

window.toggleWishlist = function (title, price, img) {
    const index = wishlist.findIndex(item => item.title === title);
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push({ title, price, img });
        // Open wishlist drawer when adding
        if (wishlistDrawer && wishlistOverlay) {
            openWishlist();
        }
    }
    updateWishlistUI();
};

function openCart() {
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (wishlistOverlay) wishlistOverlay.classList.remove('active');
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

function openWishlist() {
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    wishlistDrawer.classList.add('active');
    wishlistOverlay.classList.add('active');
}

function closeWishlist() {
    wishlistDrawer.classList.remove('active');
    wishlistOverlay.classList.remove('active');
}

window.removeFromWishlist = function (index) {
    wishlist.splice(index, 1);
    updateWishlistUI();
};

window.moveToCart = function (index) {
    const item = wishlist[index];
    addToCart(item.title, item.price, item.img);
};

// --- Checkout Logic ---
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutClose = document.getElementById('checkout-close');
const checkoutForm = document.getElementById('checkout-form');

function openCheckout() {
    console.log("Opening Checkout...");
    if (cart.length === 0) {
        showNotification("Cart Empty", "Your cart is empty! Add some delicious items first.");
        return;
    }

    const user = JSON.parse(localStorage.getItem('hesha_user'));

    if (!user || !user.isLoggedIn) {
        showNotification("Login Required", "You must be logged in to place an order.", "Login Now", () => {
            window.location.href = 'login.html';
        });
        return;
    }

    const addresses = user.addresses || (user.address ? [user.address] : []);

    // If user has multiple addresses, show selection
    if (addresses.length > 1) {
        const addressOptionsHTML = `
            <div style="margin-top: 1.5rem; text-align: left;">
                <p style="margin-bottom: 1rem; color: var(--text-muted);">Select a delivery address:</p>
                <div id="checkout-address-selector" style="display: flex; flex-direction: column; gap: 1rem;">
                    ${addresses.map((addr, idx) => `
                        <label style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--bg-surface); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); cursor: pointer; transition: 0.3s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'">
                            <input type="radio" name="selected_address" value="${idx}" ${idx === 0 ? 'checked' : ''} style="accent-color: var(--primary); transform: scale(1.2);">
                            <div>
                                <p style="font-weight: 700; font-size: 0.95rem;">${addr.fullname}</p>
                                <p style="font-size: 0.85rem; color: var(--text-muted);">${addr.street}, ${addr.city}</p>
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        showNotification(
            "Select Address",
            "Which address should we deliver to?",
            "Confirm Selection & Place Order",
            () => {
                const selectedIdx = document.querySelector('input[name="selected_address"]:checked').value;
                const chosenAddr = addresses[selectedIdx];
                placeOrderDirectly(user, chosenAddr);
            },
            addressOptionsHTML
        );
        return;
    }

    // If user has only one complete address, skip the form and place order directly
    if (addresses.length === 1) {
        const addr = addresses[0];
        showNotification(
            "Confirm Order",
            `Place order for <strong>₹${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</strong>? <br><br>Delivery to: ${addr.fullname}, ${addr.street}`,
            "Place Order Now",
            () => {
                placeOrderDirectly(user, addr);
            }
        );
        return;
    }

    // Otherwise show quick address prompt
    const addressHTML = `
        <div class="quick-form-container" style="margin-top: 1.5rem; text-align: left;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group-quick">
                    <label>Full Name</label>
                    <div class="input-wrapper-quick">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" id="quick-name" value="${user.name || ''}" placeholder="Enter name">
                    </div>
                </div>
                <div class="form-group-quick">
                    <label>Gmail ID</label>
                    <div class="input-wrapper-quick">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" id="quick-email" value="${user.email || ''}" placeholder="example@mail.com">
                    </div>
                </div>
            </div>
            <div class="form-group-quick">
                <label>Delivery Address</label>
                <div class="input-wrapper-quick textarea-wrapper">
                    <i class="fa-solid fa-location-dot"></i>
                    <textarea id="quick-address-input" placeholder="House No, Street, Area..."></textarea>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group-quick">
                    <label>District</label>
                    <div class="input-wrapper-quick">
                        <i class="fa-solid fa-map"></i>
                        <input type="text" id="quick-district" placeholder="District">
                    </div>
                </div>
                <div class="form-group-quick">
                    <label>City / Town</label>
                    <div class="input-wrapper-quick">
                        <i class="fa-solid fa-city"></i>
                        <input type="text" id="quick-city" placeholder="City">
                    </div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group-quick">
                    <label>Pin Code</label>
                    <div class="input-wrapper-quick">
                        <i class="fa-solid fa-map-pin"></i>
                        <input type="text" id="quick-zip" placeholder="Pincode">
                    </div>
                </div>
                <div class="form-group-quick">
                    <label>Mobile Number</label>
                    <div class="input-wrapper-quick">
                        <i class="fa-solid fa-phone"></i>
                        <input type="tel" id="quick-phone" value="${user.phone || ''}" placeholder="Number">
                    </div>
                </div>
            </div>
        </div>
    `;

    showNotification(
        "Delivery Address",
        "Please confirm your delivery details.",
        "Confirm & Place Order",
        async () => {
            const name = document.getElementById('quick-name').value;
            const email = document.getElementById('quick-email').value;
            const phone = document.getElementById('quick-phone').value;
            const addrText = document.getElementById('quick-address-input').value;
            const district = document.getElementById('quick-district').value;
            const city = document.getElementById('quick-city').value;
            const zip = document.getElementById('quick-zip').value;

            if (!name || !email || !phone || !addrText || !district || !city || !zip) {
                alert("Please fill all fields for delivery.");
                return;
            }

            const addressData = {
                id: Date.now(),
                fullname: name,
                email: email,
                street: addrText,
                district: district,
                city: city,
                zip: zip,
                phone: phone
            };

            // Save for next time
            if (!user.addresses) user.addresses = [];
            user.addresses.push(addressData);
            user.address = addressData; // Keep primary address updated
            localStorage.setItem('hesha_user', JSON.stringify(user));

            placeOrderDirectly(user, addressData);
        },
        addressHTML
    );
}

async function placeOrderDirectly(user, addressData) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderPayload = {
        user_id: user.id || null,
        total: total,
        items: cart,
        address: addressData
    };

    // Show loading state
    showNotification("Processing...", "Placing your order, please wait...", "...");

    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });

        if (response.ok) {
            const result = await response.json();
            cart = [];
            updateCartUI();
            closeCart();

            showNotification(
                "Order Placed!",
                `Success! Your order <strong>#${result.id}</strong> has been placed.<br>Tracking details sent to your account.`,
                "Back to Home",
                () => { window.location.href = 'index.html'; }
            );
        } else {
            showNotification("Order Error", "Failed to place order. Please try again.", "Retry", () => openCheckout());
        }
    } catch (error) {
        console.error("Order error:", error);
        // Fallback for demo if backend is down
        showNotification("Order Success (Demo Mode)", "Order placed successfully! (Offline mode active)", "Great!", () => {
            cart = [];
            updateCartUI();
            closeCart();
        });
    }
}

function showCheckoutForm(user) {
    if (user && user.address) {
        document.getElementById('address-fullname').value = user.address.fullname || '';
        document.getElementById('address-street').value = user.address.street || '';
        document.getElementById('address-city').value = user.address.city || '';
        document.getElementById('address-zip').value = user.address.zip || '';
        document.getElementById('address-phone').value = user.address.phone || '';
    } else if (user && user.name) {
        document.getElementById('address-fullname').value = user.name;
    }

    if (checkoutModal) {
        checkoutModal.classList.add('active');
    }
    closeCart();
}

function closeCheckout() {
    if (checkoutModal) checkoutModal.classList.remove('active');
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop any bubbling that might trigger "add to cart"
        openCheckout();
    });
}

if (checkoutClose) {
    checkoutClose.addEventListener('click', closeCheckout);
}

if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Gather Address Data
        const addressData = {
            fullname: document.getElementById('address-fullname').value,
            street: document.getElementById('address-street').value,
            city: document.getElementById('address-city').value,
            zip: document.getElementById('address-zip').value,
            phone: document.getElementById('address-phone').value
        };

        const user = JSON.parse(localStorage.getItem('hesha_user')) || { isLoggedIn: false };

        // Create Order Object for Backend
        const orderPayload = {
            user_id: user.id || null,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            items: cart,
            address: addressData
        };

        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            const result = await response.json();

            if (response.ok) {
                // Update Local User Address if it was provided in quick prompt
                if (addressData.street && (!user.address || !user.address.street)) {
                    user.address = addressData;
                    localStorage.setItem('hesha_user', JSON.stringify(user));
                }

                // Clear Cart
                cart = [];
                updateCartUI();
                closeCheckout();
                closeNotification(); // Ensure prompt is closed

                showNotification(
                    "Order Placed Successfully!",
                    `Order ID: ${result.id}. You can track your order status in your profile.`,
                    "View Order History",
                    () => {
                        window.location.href = 'profile.html';
                    }
                );
            } else {
                showNotification("Order Error", result.detail || "Failed to place order", "Try Again");
            }
        } catch (error) {
            console.error("Checkout Network Error:", error);
            showNotification("Connection Error", "Connection to server failed. Please try again later.");
        }
    });
}

// Helper to place order from quick prompt - can be used as fallback
window.placeOrder = function (user, quickAddress = null) {
    const orderPayload = {
        user_id: user.id || null,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        items: cart,
        address: quickAddress || user.address
    };

    fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
    })
        .then(res => res.json())
        .then(result => {
            if (result.id) {
                cart = [];
                updateCartUI();
                closeNotification();
                showNotification("Success!", `Order #${result.id} placed.`);
            }
        });
};

// --- Notification System ---

function createNotificationModal() {
    if (document.getElementById('custom-notification')) return;

    const modal = document.createElement('div');
    modal.id = 'custom-notification';
    modal.className = 'notification-overlay';
    modal.innerHTML = `
        <div class="notification-box" style="background: var(--bg-surface); border: 1px solid rgba(255,255,255,0.1); box-shadow: var(--shadow-strong);">
            <div class="notification-logo">
                <span class="logo" style="color: var(--primary);">HESHA</span>
                <p class="logo-subtitle" style="color: var(--text-muted);">Premium South Indian</p>
            </div>
            <div class="notification-icon" style="background: var(--bg-main); color: var(--primary); border: 1px solid rgba(255,255,255,0.05);">
                <i class="fa-solid fa-location-dot"></i>
            </div>
            <h3 class="notification-title" style="color: var(--text-main);">Success</h3>
            <p class="notification-message" style="color: var(--text-muted);">Operation completed successfully.</p>
            <div id="notification-custom-content"></div>
            <button class="notification-btn" id="notification-confirm-btn">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function showNotification(title, message, buttonText = "OK", onConfirm = null, customHTML = "") {
    createNotificationModal();
    const modal = document.getElementById('custom-notification');
    const titleEl = modal.querySelector('.notification-title');
    const msgEl = modal.querySelector('.notification-message');
    const customContent = document.getElementById('notification-custom-content');
    const btn = document.getElementById('notification-confirm-btn');
    const icon = modal.querySelector('.notification-icon i');

    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.innerHTML = message;
    if (btn) btn.textContent = buttonText;

    if (customContent) {
        customContent.innerHTML = customHTML;
        customContent.style.display = customHTML ? 'block' : 'none';
    }

    // Change icon based on title
    if (icon) {
        if (title.includes("Address")) icon.className = "fa-solid fa-map-location-dot";
        else if (title.includes("Login")) icon.className = "fa-solid fa-user-lock";
        else icon.className = "fa-solid fa-check";
    }

    if (btn) {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeNotification();
            if (onConfirm) onConfirm();
        });
    }

    modal.classList.add('active');
}

function closeNotification() {
    const modal = document.getElementById('custom-notification');
    if (modal) modal.classList.remove('active');
}

// --- Combined Listeners ---
function setupEventListeners() {
    // Cart Listeners
    if (cartBtn && cartDrawer && cartClose && cartOverlay) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
        cartClose.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);

        const continueShoppingBtn = document.getElementById('continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', closeCart);
        }
    }

    // Explicitly re-attach checkout listener if needed (though global bindings above work)
    // We already attached it globally above, so no need to duplicate here unless init order matters.
    // Ideally, keep simple event assignments together.

    // Wishlist Listeners
    if (wishlistBtn && wishlistDrawer && wishlistClose && wishlistOverlay) {
        wishlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openWishlist();
        });
        wishlistClose.addEventListener('click', closeWishlist);
        wishlistOverlay.addEventListener('click', closeWishlist);

        const wishlistContinueBtn = document.getElementById('wishlist-continue-shopping');
        if (wishlistContinueBtn) {
            wishlistContinueBtn.addEventListener('click', closeWishlist);
        }
        const addAllBtn = document.getElementById('add-all-to-cart');
        if (addAllBtn) {
            addAllBtn.addEventListener('click', () => {
                const user = JSON.parse(localStorage.getItem('hesha_user'));
                if (!user || !user.isLoggedIn) {
                    showNotification("Login Required", "You must be logged in to add items to the cart.", "Login Now", () => {
                        window.location.href = 'login.html';
                    });
                    return;
                }
                wishlist.forEach(item => {
                    const exists = cart.find(c => c.title === item.title);
                    if (exists) exists.quantity += 1;
                    else cart.push({ ...item, quantity: 1 });
                });
                updateCartUI();
                closeWishlist();
                openCart();
            });
        }
    }

    // Product Card Buttons (Delegation or Initial Setup)
    document.querySelectorAll('.product-card').forEach(card => {
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;
        const title = titleEl.textContent;
        const priceText = card.querySelector('.price') ? card.querySelector('.price').textContent : "₹0";
        const price = parseFloat(priceText.replace('₹', '')) || 0;
        const img = card.querySelector('img') ? card.querySelector('img').src : "";

        const addCartBtn = card.querySelector('button.btn-primary');
        if (addCartBtn && !addCartBtn.getAttribute('href') && !addCartBtn.getAttribute('onclick')) {
            addCartBtn.addEventListener('click', () => addToCart(title, price, img));
        }

        // REMOVED redundant heart button listener to prevent double-trigger with inline onclick
    });

    // Global Logout Listener for any .logout class
    document.querySelectorAll('.logout').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            window.logoutUser();
        });
    });

    document.querySelectorAll('.password-toggle').forEach(el => {
        el.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
                this.setAttribute('title', 'Hide Password');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
                this.setAttribute('title', 'Show Password');
            }
        });
    });
}

// --- Login State Management ---
function updateLoginUI() {
    const user = JSON.parse(localStorage.getItem('hesha_user'));
    const userBtn = document.querySelector('.nav-icons a[href="login.html"], .nav-icons a[href="profile.html"]');

    if (userBtn) {
        if (user && user.isLoggedIn) {
            userBtn.href = 'profile.html';
            userBtn.innerHTML = '<i class="fa-solid fa-user-check" style="color: var(--primary);"></i>';
        } else {
            userBtn.href = 'login.html';
            userBtn.innerHTML = '<i class="fa-solid fa-user"></i>';
        }
    }
}

window.logoutUser = function () {
    localStorage.removeItem('hesha_user');
    // Also clear other user-specific data if needed
    localStorage.removeItem('hesha_wishlist');
    localStorage.removeItem('hesha_cart');

    // Redirect immediately
    window.location.href = 'login.html';
};

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    updateWishlistUI();
    updateLoginUI();
    setupEventListeners();
    loadProducts(); // Load products from backend
});

// Hero Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length === 0) return;

    let currentSlide = 0;
    const intervalTime = 4000;
    let slideInterval;

    const nextSlide = () => {
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    };

    slideInterval = setInterval(nextSlide, intervalTime);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);

            slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

            currentSlide = index;

            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');

            slideInterval = setInterval(nextSlide, intervalTime);
        });
    });
});

