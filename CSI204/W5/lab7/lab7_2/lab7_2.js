// ข้อมูลเริ่มต้น
let inventory = [
    { id: 1, name: "Watch", price: 1000 },
    { id: 2, name: "Bag", price: 1200 },
    { id: 3, name: "Shoes", price: 2500 }
];

function renderInventory(data) {
    let tbody = document.getElementById("jsonTableBody");
    tbody.innerHTML = "";

    // ใช้งาน map() และ forEach()
    data.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td class="border p-2">${item.id}</td>
                <td class="border p-2">${item.name}</td>
                <td class="border p-2">${item.price.toLocaleString()}</td>
            </tr>
        `;
    });

    // ใช้งาน reduce() เพื่อคำนวณราคารวม
    let total = data.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("totalValue").textContent = total.toLocaleString();
}

// ใช้งานตอนเปิดหน้าเว็บ
renderInventory(inventory);

// ฟังก์ชัน Export JSON
document.getElementById("exportBtn").addEventListener("click", () => {
    // ใช้ JSON.stringify
    let dataStr = JSON.stringify(inventory, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    
    let a = document.createElement("a");
    a.href = url;
    a.download = "inventory_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// ฟังก์ชัน Import JSON
document.getElementById("importFile").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            // ใช้ JSON.parse
            let importedData = JSON.parse(e.target.result);
            if (Array.isArray(importedData)) {
                inventory = importedData; // อัปเดตข้อมูล
                renderInventory(inventory);
                alert("Import ข้อมูลสำเร็จ!");
            } else {
                alert("รูปแบบ JSON ไม่ถูกต้อง ต้องเป็น Array");
            }
        } catch (error) {
            alert("ไม่สามารถอ่านไฟล์ JSON ได้");
        }
    };
    reader.readAsText(file);
});