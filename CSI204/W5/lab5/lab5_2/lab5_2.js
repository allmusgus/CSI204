document.getElementById("productTotal").addEventListener("input", function(e) {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    if(value) {
        let parts = value.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        e.target.value = parts.join('.');
    }
});

document.getElementById("calcShippingBtn").addEventListener("click", () => {
    let rawTotal = document.getElementById("productTotal").value.replace(/,/g, '');
    let productPrice = parseFloat(rawTotal) || 0;
    let shippingSelect = document.getElementById("shippingType");
    let shippingCost = parseFloat(shippingSelect.value);
    let shippingName = shippingSelect.options[shippingSelect.selectedIndex].text;

    // เงื่อนไขซื้อครบ 500 บาท จัดส่งฟรี
    if (productPrice >= 500) {
        shippingCost = 0;
        shippingName = "ฟรีจัดส่ง (ยอดเกิน 500 บาท)";
    }

    let finalTotal = productPrice + shippingCost;

    let res = document.getElementById("shippingResult");
    res.innerHTML = `
        <p>ค่าสินค้า: ${productPrice.toLocaleString()} บาท</p>
        <p>ค่าจัดส่ง (${shippingName}): <span class="${shippingCost === 0 ? 'text-green-600 font-bold' : ''}">${shippingCost.toLocaleString()} บาท</span></p>
        <p class="font-bold text-xl mt-2 text-red-600">ยอดรวมทั้งสิ้น: ${finalTotal.toLocaleString()} บาท</p>
    `;
    res.classList.remove("hidden");
});