const products = [
    { id: 1, name: "เมาส์ไร้สาย", price: 350 },
    { id: 2, name: "คีย์บอร์ด", price: 850 },
    { id: 3, name: "แผ่นรองเมาส์", price: 150 },
    { id: 4, name: "หูฟังเกมมิ่ง", price: 1200 }
];

const productList = document.getElementById("productList");

// สร้าง Checkbox สินค้าจาก Array
products.forEach(p => {
    let div = document.createElement("div");
    div.className = "flex items-center";
    div.innerHTML = `
        <input type="checkbox" id="item_${p.id}" value="${p.price}" class="w-5 h-5 text-blue-600 rounded mr-3 product-cb">
        <label for="item_${p.id}" class="text-gray-700 cursor-pointer flex-grow">${p.name}</label>
        <span class="font-bold">${p.price.toLocaleString()} บาท</span>
    `;
    productList.appendChild(div);
});

document.getElementById("calculateBtn").addEventListener("click", () => {
    let checkboxes = document.querySelectorAll(".product-cb:checked");
    let totalPrice = 0;

    checkboxes.forEach(cb => {
        totalPrice += parseFloat(cb.value);
    });

    let discount = 0;
    // เงื่อนไขส่วนลด: > 1000 ลด 15%, > 500 ลด 10%
    if (totalPrice > 1000) {
        discount = totalPrice * 0.15;
    } else if (totalPrice > 500) {
        discount = totalPrice * 0.10;
    }

    let netPrice = totalPrice - discount;

    let res = document.getElementById("result");
    res.innerHTML = `
        <p>ราคารวม: ${totalPrice.toLocaleString()} บาท</p>
        <p class="text-green-600">ส่วนลด: ${discount.toLocaleString()} บาท</p>
        <p class="font-bold text-xl mt-2 text-red-600">ยอดสุทธิ: ${netPrice.toLocaleString()} บาท</p>
    `;
    res.classList.remove("hidden");
});