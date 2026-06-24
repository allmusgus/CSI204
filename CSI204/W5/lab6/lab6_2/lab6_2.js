// สร้าง Array Object สินค้า
const shopProducts = [
    { name: "เสื้อยืดคอกลม", category: "เสื้อผ้า", price: 199, stock: 50 },
    { name: "กางเกงยีนส์", category: "เสื้อผ้า", price: 890, stock: 20 },
    { name: "เมาส์คอมพิวเตอร์", category: "อุปกรณ์", price: 450, stock: 15 },
    { name: "สายชาร์จโทรศัพท์", category: "อุปกรณ์", price: 150, stock: 100 },
    { name: "ขนมปังโฮลวีต", category: "อาหาร", price: 45, stock: 30 },
    { name: "นมสด", category: "อาหาร", price: 55, stock: 40 }
];

function renderTable(data) {
    let tbody = document.getElementById("productTableBody");
    tbody.innerHTML = "";
    
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center p-4 text-gray-500">ไม่พบข้อมูล</td></tr>`;
        return;
    }

    data.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.name}</td>
                <td class="border p-2">${item.category}</td>
                <td class="border p-2">${item.price.toLocaleString()}</td>
                <td class="border p-2">${item.stock}</td>
            </tr>
        `;
    });
}

// แสดงข้อมูลทั้งหมดตอนเปิดหน้าเว็บ
renderTable(shopProducts);

// กรองข้อมูลเมื่อเลือก Dropdown
document.getElementById("categoryFilter").addEventListener("change", function() {
    let selectedCat = this.value;
    let filteredData = [];

    if (selectedCat === "ทั้งหมด") {
        filteredData = shopProducts;
    } else {
        // ใช้ filter() กรองข้อมูล
        filteredData = shopProducts.filter(item => item.category === selectedCat);
    }
    
    renderTable(filteredData);
});