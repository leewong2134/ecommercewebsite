// This code assumes each product card has a 'data-id', 'data-name', and 'data-price' attribute

// Function to add an item to the cart
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = cart.find(p => p.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart`);
}

// Function to load cart items from localStorage
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Code to iterate over cart items and display them in your HTML
    // Include input fields for quantity, and "Remove" buttons, each with event listeners
}

// Function to update the quantity of a cart item
function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity = newQuantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Refresh the display
}

// Function to remove an item from the cart
function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Refresh the display
}

// Function to handle the checkout process
function checkout() {
    // Simulate a checkout process
    localStorage.removeItem('cart'); // Clear the cart
    alert('Thank you for your purchase!');
    // Redirect to a confirmation page or back to the shop
}

// Add event listeners to your "Add to Cart" buttons on the shop page
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));
        addToCart(productId, productName, productPrice);
    });
});

// On the cart page, call loadCartItems when the document is loaded
document.addEventListener('DOMContentLoaded', loadCartItems);

// Add event listener to the checkout button
document.getElementById('checkout-button').addEventListener('click', checkout);


