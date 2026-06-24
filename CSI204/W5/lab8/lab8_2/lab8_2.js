// Array สินค้า 5 รายการ [cite: 648-658]
const products = [
    { name: "Keyboard", price: 1200, qty: 2 },
    { name: "Monitor", price: 4500, qty: 1 },
    { name: "Mouse", price: 800, qty: 3 },
    { name: "Speaker", price: 1500, qty: 1 },
    { name: "Headphones", price: 2000, qty: 2 }
];

let totalAmount = 0;

// 1. สร้างตารางด้วย For Loop
let forHtml = "";
for (let i = 0; i < products.length; i++) {
    let itemTotal = products[i].price * products[i].qty;
    totalAmount += itemTotal; // เก็บยอดรวมทั้งหมด
    forHtml += `<tr><td class="border p-2">${products[i].name} (x${products[i].qty})</td><td class="border p-2">${itemTotal.toLocaleString()}</td></tr>`;
}
document.getElementById("forLoopTable").innerHTML = forHtml;

// 2. สร้างตารางด้วย While Loop (ยอดรวมไม่ต้องบวกซ้ำแล้ว)
let whileHtml = "";
let w = 0;
while (w < products.length) {
    let itemTotal = products[w].price * products[w].qty;
    whileHtml += `<tr><td class="border p-2">${products[w].name} (x${products[w].qty})</td><td class="border p-2">${itemTotal.toLocaleString()}</td></tr>`;
    w++;
}
document.getElementById("whileLoopTable").innerHTML = whileHtml;

// 3. สร้างตารางด้วย Do-While Loop
let doWhileHtml = "";
let d = 0;
do {
    if(products.length > 0) {
        let itemTotal = products[d].price * products[d].qty;
        doWhileHtml += `<tr><td class="border p-2">${products[d].name} (x${products[d].qty})</td><td class="border p-2">${itemTotal.toLocaleString()}</td></tr>`;
    }
    d++;
} while (d < products.length);
document.getElementById("doWhileLoopTable").innerHTML = doWhileHtml;

let discount = 0;
if (totalAmount >= 10000) {
    discount = totalAmount * 0.10; // ลด 10%
} else if (totalAmount >= 5000) {
    discount = totalAmount * 0.05; // ลด 5%
}

let priceAfterDiscount = totalAmount - discount;
let vat = priceAfterDiscount * 0.07;
let netPrice = priceAfterDiscount + vat;

// แสดงผลสรุป
document.getElementById("grandSummary").innerHTML = `
    <p>ยอดรวมก่อนส่วนลด: ${totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
    <p class="text-green-400">ส่วนลดที่ได้รับ: ${discount.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
    <p>ยอดหลังหักส่วนลด: ${priceAfterDiscount.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
    <p class="text-yellow-400">VAT (7%): ${vat.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
    <p class="text-2xl font-bold mt-2 pt-2 border-t border-gray-600">ยอดสุทธิที่ต้องชำระ: ${netPrice.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
`;