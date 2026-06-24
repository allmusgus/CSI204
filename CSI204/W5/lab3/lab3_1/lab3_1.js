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

document.getElementById("salary").addEventListener("input", formatNumberInput);
document.getElementById("loanAmount").addEventListener("input", formatNumberInput);

document.getElementById("homeLoanForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let salary = parseFloat(document.getElementById("salary").value.replace(/,/g, ''));
    let loanAmount = parseFloat(document.getElementById("loanAmount").value.replace(/,/g, ''));
    let interestRate = parseFloat(document.getElementById("interestRate").value) / 100 / 12; 
    let years = parseInt(document.getElementById("years").value);
    let months = years * 12;

    let maxLoan = salary * 200; 
    if (loanAmount > maxLoan) {
        alert(`วงเงินกู้สูงสุดคือ ${(maxLoan).toLocaleString()} บาท (200 เท่าของเงินเดือน)`);
        return;
    }

    let monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, months)) / (Math.pow(1 + interestRate, months) - 1);
    
    if (isFinite(monthlyPayment)) {
        let resultDiv = document.getElementById("result");
        resultDiv.classList.remove("hidden");
        resultDiv.innerHTML = `
            <h3 class="font-bold text-lg border-b pb-2">สรุปสินเชื่อบ้าน</h3>
            <p class="mt-2">วงเงินกู้: ${loanAmount.toLocaleString()} บาท</p>
            <p>ระยะเวลา: ${years} ปี (${months} เดือน)</p>
            <p class="font-bold text-blue-700 text-xl mt-2">ค่างวดต่อเดือน: ${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</p>
            <p>รวมชำระทั้งสิ้น: ${(monthlyPayment * months).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</p>
            <p class="text-red-600">ดอกเบี้ยรวม: ${((monthlyPayment * months) - loanAmount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} บาท</p>
        `;
    }
});