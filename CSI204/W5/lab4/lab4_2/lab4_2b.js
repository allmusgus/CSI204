function loadCart() {
    let cartData = sessionStorage.getItem("shoppingCart");
    let cartList = document.getElementById("cartItems");
    let totalSpan = document.getElementById("totalPrice");
    
    if (cartData) {
        let cart = JSON.parse(cartData);
        let total = 0;
        cartList.innerHTML = "";
        
        cart.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price.toLocaleString()} บาท`;
            cartList.appendChild(li);
            total += item.price;
        });
        
        totalSpan.textContent = total.toLocaleString();
    } else {
        cartList.innerHTML = "<p class='text-gray-500'>ตะกร้าว่างเปล่า</p>";
        totalSpan.textContent = "0";
    }
}

document.getElementById("clearSessionBtn").addEventListener("click", () => {
    sessionStorage.removeItem("shoppingCart");
    loadCart();
});

// ให้โหลดทันทีเมื่อเปิดหน้า
window.onload = loadCart;