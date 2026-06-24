document.getElementById("loanAmount").addEventListener("input", function(e) {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    if(value) {
        let parts = value.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        e.target.value = parts.join('.');
    }
});

document.getElementById("loanForm").addEventListener("submit", function(event) {
    event.preventDefault();
    generateAmortizationTable();
});

function generateAmortizationTable() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value.replace(/,/g, ''));
    let interestRate = parseFloat(document.getElementById("interestRate").value) / 100 / 12;
    let months = parseInt(document.getElementById("months").value);

    // สูตร PMT
    let monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, months)) / (Math.pow(1 + interestRate, months) - 1);

    let tableHtml = `<table class="w-full text-left border-collapse border">
                        <thead class="bg-gray-200 sticky top-0">
                            <tr>
                                <th class="border p-2">งวดที่</th>
                                <th class="border p-2">ค่างวด</th>
                                <th class="border p-2">ดอกเบี้ย</th>
                                <th class="border p-2">เงินต้น</th>
                                <th class="border p-2">ยอดคงเหลือ</th>
                            </tr>
                        </thead>
                        <tbody>`;

    let remaining = loanAmount;
    let totalInterest = 0;

    // ใช้ for loop ในการสร้างตาราง
    for (let i = 1; i <= months; i++) {
        let interest = remaining * interestRate;
        let principal = monthlyPayment - interest;
        remaining -= principal;
        totalInterest += interest;

        tableHtml += `
            <tr>
                <td class="border p-2 text-center">${i}</td>
                <td class="border p-2">${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td class="border p-2">${interest.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td class="border p-2">${principal.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td class="border p-2">${Math.max(0, remaining).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
            </tr>
        `;
    }

    tableHtml += `</tbody></table>`;

    document.getElementById("amortizationTable").innerHTML = tableHtml;
    
    let summaryHtml = `
        <p><strong>ค่างวดต่อเดือน:</strong> ${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
        <p><strong>รวมเงินที่ต้องชำระ:</strong> ${(monthlyPayment * months).toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
        <p class="text-red-600"><strong>ดอกเบี้ยรวม:</strong> ${totalInterest.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
    `;
    
    let summaryDiv = document.getElementById("summary");
    summaryDiv.innerHTML = summaryHtml;
    summaryDiv.classList.remove("hidden");
}