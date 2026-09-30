/**
 * millenniumebooks Interactive E-Commerce Cart Manager
 */
(function() {
    'use strict';

    const CART_STORAGE_KEY = 'millennium_ebooks_cart';

    // Get Cart Items from LocalStorage
    function getCart() {
        try {
            const data = localStorage.getItem(CART_STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error reading cart from localStorage', e);
            return [];
        }
    }

    // Save Cart Items to LocalStorage
    function saveCart(cart) {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            updateCartHeader();
        } catch (e) {
            console.error('Error saving cart to localStorage', e);
        }
    }

    // Calculate Cart Totals
    function getCartTotals() {
        const cart = getCart();
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        return { totalItems, totalPrice: totalPrice.toFixed(2) };
    }

    // Update Top Navigation Cart Display
    function updateCartHeader() {
        const { totalItems, totalPrice } = getCartTotals();
        const cartBadgeElements = document.querySelectorAll('.cart.for-buy span');
        cartBadgeElements.forEach(el => {
            if (totalItems > 0) {
                el.textContent = `Cart: (${totalItems}) - $${totalPrice}`;
            } else {
                el.textContent = `Cart:(0 $)`;
            }
        });
    }

    // Toast Notification Banner
    function showToast(message) {
        let toastContainer = document.getElementById('cart-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'cart-toast-container';
            toastContainer.style.cssText = `
                position: fixed;
                bottom: 25px;
                right: 25px;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
            `;
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.style.cssText = `
            background: #2f2f2f;
            color: #ffffff;
            padding: 14px 22px;
            border-left: 4px solid #C5A992;
            border-radius: 6px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            font-family: 'Raleway', sans-serif;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease-out forwards;
            pointer-events: auto;
        `;
        toast.innerHTML = `<i class="icon icon-clipboard" style="color: #C5A992; font-size: 18px;"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // Add Product To Cart
    function addToCart(product) {
        let cart = getCart();
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                author: product.author,
                price: parseFloat(product.price),
                image: product.image,
                quantity: 1
            });
        }

        saveCart(cart);
        showToast(`Added <strong>${product.title}</strong> to your Cart!`);
    }

    // Remove Item From Cart
    function removeFromCart(id) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
        renderCartDrawer();
        showToast(`Item removed from Cart.`);
    }

    // Update Quantity
    function updateQuantity(id, change) {
        let cart = getCart();
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            saveCart(cart);
            renderCartDrawer();
        }
    }

    // Clear Whole Cart
    function clearCart() {
        saveCart([]);
        renderCartDrawer();
        showToast(`Cart has been cleared.`);
    }

    // Create & Render Offcanvas Cart Drawer
    function createCartDrawerHTML() {
        if (document.getElementById('cart-drawer-overlay')) return;

        const drawerHTML = `
            <div id="cart-drawer-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:99990; backdrop-filter:blur(3px); transition: opacity 0.3s ease;"></div>
            <div id="cart-drawer" style="position:fixed; top:0; right:-420px; width:400px; max-width:90%; height:100%; background:#ffffff; z-index:99995; box-shadow:-5px 0 25px rgba(0,0,0,0.15); transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1); display:flex; flex-direction:column;">
                <div style="padding: 20px 25px; border-bottom: 1px solid #EAEAEA; display:flex; justify-content:space-between; align-items:center; background:#FAF9F6;">
                    <h4 style="font-family:'Prata', serif; margin:0; color:#2f2f2f; font-size:1.3rem;">Your Shopping Cart</h4>
                    <button id="close-cart-btn" style="background:none; border:none; font-size:24px; color:#757575; cursor:pointer; padding:0; line-height:1;">&times;</button>
                </div>

                <div id="cart-items-container" style="flex:1; overflow-y:auto; padding:20px 25px;">
                    <!-- Dynamic Cart Items Rendered Here -->
                </div>

                <div id="cart-footer" style="padding:20px 25px; border-top:1px solid #EAEAEA; background:#FAF9F6;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.95rem; color:#666;">
                        <span>Subtotal:</span>
                        <strong id="cart-subtotal" style="color:#2f2f2f;">$0.00</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:15px; font-size:0.95rem; color:#666;">
                        <span>Digital Delivery:</span>
                        <strong style="color:#2E7D32;">FREE (Instant)</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:1.15rem; border-top:1px dashed #DDD; padding-top:10px;">
                        <span style="font-weight:600; color:#2f2f2f;">Total Amount:</span>
                        <strong id="cart-grand-total" style="color:#C5A992; font-size:1.25rem;">$0.00</strong>
                    </div>
                    <div style="display:flex; gap:10px;">
                        <button id="clear-cart-btn" style="flex:1; padding:12px; border:1px solid #CCC; background:#FFF; color:#555; border-radius:4px; font-weight:600; cursor:pointer; text-transform:uppercase; font-size:0.8rem;">Clear</button>
                        <a id="checkout-cart-btn" href="thank-you.html" style="flex:2; padding:12px; background:#2f2f2f; color:#FFF; border-radius:4px; font-weight:600; text-align:center; text-decoration:none; text-transform:uppercase; font-size:0.85rem; display:block;">Checkout Now &rarr;</a>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', drawerHTML);

        document.getElementById('close-cart-btn').addEventListener('click', closeCartDrawer);
        document.getElementById('cart-drawer-overlay').addEventListener('click', closeCartDrawer);
        document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    }

    // Render Cart Drawer Items
    function renderCartDrawer() {
        createCartDrawerHTML();
        const cart = getCart();
        const container = document.getElementById('cart-items-container');
        const { totalPrice } = getCartTotals();

        document.getElementById('cart-subtotal').textContent = `$${totalPrice}`;
        document.getElementById('cart-grand-total').textContent = `$${totalPrice}`;

        if (cart.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding: 50px 10px; color:#888;">
                    <i class="icon icon-clipboard" style="font-size:48px; color:#D1D1D1; margin-bottom:15px; display:block;"></i>
                    <p style="margin-bottom:15px; font-size:1rem;">Your cart is currently empty.</p>
                    <a href="index.html#featured-books" onclick="window.closeCartDrawer && window.closeCartDrawer();" style="color:#C5A992; text-decoration:underline; font-weight:600;">Browse Featured Ebooks</a>
                </div>
            `;
            return;
        }

        let html = '';
        cart.forEach(item => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            html += `
                <div style="display:flex; gap:15px; margin-bottom:18px; padding-bottom:18px; border-bottom:1px solid #F0F0F0; align-items:center;">
                    <img src="${item.image}" alt="${item.title}" style="width:60px; height:80px; object-fit:cover; border-radius:4px; border:1px solid #EEE;">
                    <div style="flex:1;">
                        <h5 style="margin:0 0 4px 0; font-size:0.95rem; font-family:'Prata', serif; color:#2f2f2f;">${item.title}</h5>
                        <p style="margin:0 0 6px 0; font-size:0.8rem; color:#888;">${item.author || 'Author'}</p>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="color:#C5A992; font-weight:700; font-size:0.95rem;">$${itemTotal}</span>
                            <div style="display:flex; align-items:center; border:1px solid #DDD; border-radius:4px; overflow:hidden;">
                                <button class="cart-qty-btn" data-id="${item.id}" data-change="-1" style="background:#F5F5F5; border:none; width:26px; height:24px; font-weight:bold; cursor:pointer;">-</button>
                                <span style="padding:0 8px; font-size:0.85rem; font-weight:600;">${item.quantity}</span>
                                <button class="cart-qty-btn" data-id="${item.id}" data-change="1" style="background:#F5F5F5; border:none; width:26px; height:24px; font-weight:bold; cursor:pointer;">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="cart-remove-btn" data-id="${item.id}" style="background:none; border:none; color:#CC0000; cursor:pointer; padding:5px; font-size:16px;" title="Remove Item">&times;</button>
                </div>
            `;
        });

        container.innerHTML = html;

        // Attach event listeners for quantity and remove buttons
        container.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const change = parseInt(e.currentTarget.getAttribute('data-change'));
                updateQuantity(id, change);
            });
        });

        container.querySelectorAll('.cart-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                removeFromCart(id);
            });
        });
    }

    // Open Cart Drawer
    function openCartDrawer(e) {
        if (e) e.preventDefault();
        createCartDrawerHTML();
        renderCartDrawer();

        const overlay = document.getElementById('cart-drawer-overlay');
        const drawer = document.getElementById('cart-drawer');

        overlay.style.display = 'block';
        setTimeout(() => overlay.style.opacity = '1', 10);
        drawer.style.right = '0';
    }

    // Close Cart Drawer
    function closeCartDrawer() {
        const overlay = document.getElementById('cart-drawer-overlay');
        const drawer = document.getElementById('cart-drawer');

        if (drawer) drawer.style.right = '-420px';
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 300);
        }
    }

    window.closeCartDrawer = closeCartDrawer;

    // Initialize Event Listeners
    document.addEventListener('DOMContentLoaded', () => {
        updateCartHeader();

        // Cart link click handlers
        document.querySelectorAll('.cart.for-buy').forEach(link => {
            link.addEventListener('click', openCartDrawer);
        });

        // Add to Cart Buttons
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart, [data-product-tile="add-to-cart"]');
            if (btn) {
                e.preventDefault();
                const productItem = btn.closest('.product-item');

                let title = 'eBook Product';
                let author = 'Featured Author';
                let price = 40.00;
                let image = 'images/product-item1.jpg';
                let id = 'ebook-item-' + Math.random().toString(36).substr(2, 9);

                if (productItem) {
                    const titleEl = productItem.querySelector('figcaption h3, .item-title');
                    const authorEl = productItem.querySelector('figcaption span, .author-name');
                    const priceEl = productItem.querySelector('.item-price');
                    const imgEl = productItem.querySelector('img.product-item, img.single-image');

                    if (titleEl) title = titleEl.textContent.trim();
                    if (authorEl) author = authorEl.textContent.trim();
                    if (imgEl) image = imgEl.getAttribute('src');
                    if (priceEl) {
                        const priceText = priceEl.textContent.replace(/[^0-9.]/g, '');
                        if (priceText) price = parseFloat(priceText);
                    }
                    id = 'ebook-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-');
                }

                addToCart({ id, title, author, price, image });
            }
        });
    });

})();
