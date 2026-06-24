function addToCart(name, price) {
    // โหลดตะกร้าจาก sessionStorage ถ้ามี 
    let cart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];
    
    cart.push({ name: name, price: price });
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
    
    alert(`เพิ่ม ${name} ลงตะกร้าแล้ว`);
}