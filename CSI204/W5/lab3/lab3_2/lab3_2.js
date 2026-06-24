function formatNumberInput(event) {
    let value = event.target.value.replace(/[^0-9.]/g, '');
    if (value !== '') {
        let parts = value.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        event.target.value = parts.join('.');
    } else {
        event.target.value = '';
    }
}

document.getElementById("carPrice").addEventListener("input", formatNumberInput);
document.getElementById("downPayment").addEventListener("input", formatNumberInput);

document.getElementById("carLoanForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // ดึงค่ามาและเอาลูกน้ำออกก่อน
    let carPrice = parseFloat(document.getElementById("carPrice").value.replace(/,/g, ''));
    let downPayment = parseFloat(document.getElementById("downPayment").value.replace(/,/g, ''));
    
    let loanAmount = carPrice - downPayment;
    let interestRate = parseFloat(document.getElementById("carInterest").value) / 100 / 12; 
    let months = parseInt(document.getElementById("carMonths").value);

    let monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, months)) / (Math.pow(1 + interestRate, months) - 1);
    
    let tableHtml = `
        <h3 class="font-bold text-lg mb-2">ตารางผ่อนชำระแบบย่อ (ทุก 6 เดือน)</h3>
        <p class="mb-4">ยอดกู้สุทธิ: ${loanAmount.toLocaleString()} บาท | ค่างวด: ${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท/เดือน</p>
        <table class="w-full text-left border-collapse border">
            <tr class="bg-gray-200">
                <th class="border p-2">งวดที่</th>
                <th class="border p-2">ค่างวด</th>
                <th class="border p-2">ดอกเบี้ย</th>
                <th class="border p-2">เงินต้น</th>
                <th class="border p-2">ยอดคงเหลือ</th>
            </tr>
    `;

    let remaining = loanAmount;
    
    for (let i = 1; i <= months; i++) {
        let interest = remaining * interestRate;
        let principal = monthlyPayment - interest;
        remaining -= principal;
        
        if (i % 6 === 0 || i === 1 || i === months) {
            tableHtml += `
                <tr>
                    <td class="border p-2">${i}</td>
                    <td class="border p-2">${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td class="border p-2">${interest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td class="border p-2">${principal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td class="border p-2">${Math.max(0, remaining).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
            `;
        }
    }
    tableHtml += `</table>`;

    let container = document.getElementById("tableContainer");
    container.innerHTML = tableHtml;
    container.classList.remove("hidden");
});