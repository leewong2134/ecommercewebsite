document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateTotal();
    
    document.getElementById('checkout-button').addEventListener('click', () => {
        // Implement checkout functionality here
        alert('Proceed to checkout...');
        // Here you would typically redirect to a checkout page or initiate a payment process
    });
});

function loadCartItems() {
    // Load cart items from localStorage or server
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('tbody');
    cartContainer.innerHTML = ''; // Clear existing cart items

    cartItems.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="form-control quantity-input" data-index="${index}">
            </td>
            <td class="subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
            </td>
        `;
        cartContainer.appendChild(tr);

        // Add event listener for the quantity change
        tr.querySelector('.quantity-input').addEventListener('change', function() {
            updateQuantity(index, parseInt(this.value));
        });

        // Add event listener for the remove button
        tr.querySelector('.remove-item').addEventListener('click', function() {
            removeItem(index);
        });
    });
}

function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (quantity > 0) {
        cart[index].quantity = quantity;
    } else {
        cart[index].quantity = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the subtotal for the changed item directly
    updateSubtotalForItem(index, cart[index].quantity, cart[index].price);

    // Update the total price
    updateTotal();
}

function updateSubtotalForItem(index, quantity, price) {
    // Select all subtotal elements
    const subtotals = document.querySelectorAll('.subtotal');
    // Update the specific subtotal
    subtotals[index].textContent = `$${(quantity * price).toFixed(2)}`;
}

function removeItem(index) {
    // Remove an item from the cart
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCartItems(); // Refresh the cart view
}

function updateTotal() {
    // Calculate and update the total price of cart items
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, quantity) {
    // Update the quantity of a cart item
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (quantity > 0) {
        cartItems[index].quantity = quantity;
    } else {
        cartItems[index].quantity = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCartItems(); // Refresh the cart view
}