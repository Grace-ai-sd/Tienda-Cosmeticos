document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const totalCost = document.getElementById("total-cost");
    const promoCodeInput = document.getElementById("promo-code");
    const clearCartBtn = document.getElementById("clear-cart");
    const applyPromoBtn = document.getElementById("apply-promo");

    let cart = [];
    let discount = 0;

    const updateCart = () => {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <span>${item.name} - $${item.price}</span>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price;
        });

        total -= total * discount;
        totalCost.textContent = `Costo Total: $${total.toFixed(2)}`;
    };

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));

            cart.push({ name, price });
            updateCart();
        });
    });

    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        }
    });

    clearCartBtn.addEventListener("click", () => {
        cart = [];
        discount = 0;
        promoCodeInput.value = "";
        updateCart();
    });

    applyPromoBtn.addEventListener("click", () => {
        const promoCode = promoCodeInput.value.trim();
        if (promoCode === "DESCUENTO10") {
            discount = 0.1;
        } else {
            discount = 0;
        }
        updateCart();
    });

    updateCart();
});
