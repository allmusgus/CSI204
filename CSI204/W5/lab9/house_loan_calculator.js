// เก็บข้อมูลเงินโปะแบบแยกรายเดือน { เดือนที่: จำนวนเงินโปะ }
let extraPayments = {}; 
// ตัวแปรเก็บค่าตั้งต้นเพื่อไว้เปรียบเทียบว่าประหยัดไปเท่าไหร่
let baseTotalInterest = 0;
let baseTotalMonths = 0;

function formatCurrencyInput(event) {
    let value = event.target.value.replace(/[^0-9.]/g, '');
    if(value !== '') {
        let parts = value.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        event.target.value = parts.join('.');
    } else {
        event.target.value = '';
    }
}

document.getElementById("housePrice").addEventListener("input", formatCurrencyInput);
document.getElementById("downPayment").addEventListener("input", formatCurrencyInput);

// จัดการ Toggle ของ Checkbox Refinance
document.getElementById("useRefinance").addEventListener("change", function(e) {
    let refDiv = document.getElementById("refinanceOptions");
    if(e.target.checked) {
        refDiv.classList.remove("opacity-50", "pointer-events-none");
    } else {
        refDiv.classList.add("opacity-50", "pointer-events-none");
    }
});

// ฟังก์ชันคำนวณค่างวด (PMT Formula)
function calculatePMT(principal, annualRate, months) {
    if (annualRate === 0) return principal / months;
    let r = annualRate / 100 / 12;
    return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

// เมื่อกดปุ่มคำนวณจากฟอร์มหลัก (เริ่มใหม่ทั้งหมด)
document.getElementById("mortgageForm").addEventListener("submit", function(event) {
    event.preventDefault();
    extraPayments = {}; // ล้างยอดโปะเก่า
    generateTable(true); // true = คำนวณ Base ใหม่ด้วย
});

// ฟังก์ชันหลักสำหรับสร้างตารางและคำนวณ
function generateTable(isInitialRun = false) {
    let housePrice = parseFloat(document.getElementById("housePrice").value.replace(/,/g, '')) || 0;
    let downPayment = parseFloat(document.getElementById("downPayment").value.replace(/,/g, '')) || 0;
    let initialRate = parseFloat(document.getElementById("interestRate").value) || 0;
    let years = parseInt(document.getElementById("loanYears").value);
    
    let useRefinance = document.getElementById("useRefinance").checked;
    let newRate = parseFloat(document.getElementById("newInterestRate").value) || 0;

    if (downPayment >= housePrice) {
        alert("เงินดาวน์ต้องน้อยกว่าราคาบ้านครับ");
        return;
    }

    let loanAmount = housePrice - downPayment;
    let totalMonths = years * 12;
    
    // ค่างวดตั้งต้น
    let basePMT = calculatePMT(loanAmount, initialRate, totalMonths);
    let currentPMT = basePMT;
    
    let remainingBalance = loanAmount;
    let totalInterest = 0;
    let tableBody = "";
    let actualMonths = 0;

    for (let i = 1; i <= totalMonths; i++) {
        actualMonths = i;
        let currentRate = initialRate;

        // ถ้ารีไฟแนนซ์ เริ่มปรับดอกเบี้ยในเดือนที่ 37 (ปีที่ 4)
        if (useRefinance && i >= 37) {
            currentRate = newRate;
            // เมื่อรีไฟแนนซ์ ธนาคารจะคำนวณค่างวดใหม่จากยอดคงเหลือและเวลาที่เหลือ
            if (i === 37) {
                currentPMT = calculatePMT(remainingBalance, currentRate, totalMonths - 36);
            }
        }

        let monthlyRate = currentRate / 100 / 12;
        let interestPayment = remainingBalance * monthlyRate;
        
        // ถ้าค่างวดปกติน้อยกว่าดอกเบี้ย (กรณีที่ตั้งดอกเบี้ยผิดปกติ)
        let principalPayment = currentPMT - interestPayment;
        
        // ดึงเงินโปะของงวดนี้ (ถ้ามี)
        let extra = extraPayments[i] || 0;

        // คำนวณยอดคงเหลือก่อน
        let totalPrincipalReduction = principalPayment + extra;

        // ตรวจสอบกรณีงวดสุดท้าย หรือโปะจนหมด
        if (totalPrincipalReduction >= remainingBalance) {
            principalPayment = remainingBalance - extra;
            
            if (principalPayment < 0) {
                extra = remainingBalance; // บังคับจ่ายแค่เท่าที่เหลือ
                principalPayment = 0;
            }
            
            totalPrincipalReduction = remainingBalance;
            remainingBalance = 0;
        } else {
            remainingBalance -= totalPrincipalReduction;
        }

        totalInterest += interestPayment;

        let rowClass = "border-b hover:bg-slate-50 transition";
        if (i === 37 && useRefinance) rowClass += " bg-indigo-50 border-t-2 border-indigo-300"; // ไฮไลต์จุดรีไฟแนนซ์
        if (remainingBalance === 0) rowClass += " bg-emerald-50"; // ไฮไลต์งวดที่ผ่อนจบ

        let extraValueStr = extra > 0 ? extra.toLocaleString() : "";

        tableBody += `
            <tr class="${rowClass}">
                <td class="p-3 text-center border-r font-semibold">${i}</td>
                <td class="p-3 border-r text-slate-500">${currentRate.toFixed(2)}%</td>
                <td class="p-3 border-r font-medium">${(principalPayment + interestPayment).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td class="p-3 border-r text-rose-500">${interestPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td class="p-3 border-r text-blue-600">${principalPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td class="p-2 border-r bg-emerald-50">
                    <input type="text" data-month="${i}" value="${extraValueStr}" placeholder="0" 
                           class="w-full text-right bg-transparent border-b border-emerald-300 focus:border-emerald-600 focus:outline-none font-bold text-emerald-700 extra-pay-input">
                </td>
                <td class="p-3 font-bold ${remainingBalance === 0 ? 'text-emerald-600' : 'text-slate-700'}">${remainingBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            </tr>
        `;

        if (remainingBalance <= 0) break; // ผ่อนหมดแล้วหยุดลูปทันที
    }

    // เก็บค่าตั้งต้นไว้เทียบตอนรันครั้งแรก
    if (isInitialRun) {
        baseTotalInterest = totalInterest;
        baseTotalMonths = actualMonths;
    }

    // อัปเดต UI ด้านบน
    document.getElementById("resLoanAmount").textContent = loanAmount.toLocaleString() + " ฿";
    document.getElementById("resMonthlyPayment").textContent = basePMT.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " ฿";
    document.getElementById("resTotalInterest").textContent = totalInterest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " ฿";
    document.getElementById("resActualMonths").textContent = `${Math.floor(actualMonths / 12)} ปี ${actualMonths % 12} เดือน`;

    // เช็คว่าประหยัดไปเท่าไหร่
    let badge = document.getElementById("savingBadge");
    if (!isInitialRun && (totalInterest < baseTotalInterest || actualMonths < baseTotalMonths)) {
        let savedMoney = baseTotalInterest - totalInterest;
        let savedMonths = baseTotalMonths - actualMonths;
        document.getElementById("savingText").innerHTML = `จากการโปะ/รีไฟแนนซ์ คุณประหยัดดอกเบี้ยไปได้ <strong>${savedMoney.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</strong> และผ่อนจบเร็วขึ้น <strong>${savedMonths} เดือน</strong>!`;
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }

    document.getElementById("mortgageTableBody").innerHTML = tableBody;
    document.getElementById("resultContainer").classList.remove("hidden");
}

// Event Delegation ดักจับการกรอกเงินโปะในตาราง
let tableBody = document.getElementById("mortgageTableBody");

// ดักจับตอนกำลังพิมพ์เพื่อใส่ลูกน้ำ
tableBody.addEventListener("input", function(e) {
    if (e.target.classList.contains("extra-pay-input")) {
        let value = e.target.value.replace(/[^0-9.]/g, '');
        if(value) {
            let parts = value.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            e.target.value = parts.join('.');
        }
    }
});

// ดักจับเมื่อคลิกออก หรือกด Enter เพื่อนำไปคำนวณใหม่
tableBody.addEventListener("change", function(e) {
    if (e.target.classList.contains("extra-pay-input")) {
        let month = parseInt(e.target.dataset.month);
        let val = parseFloat(e.target.value.replace(/,/g, '')) || 0;
        
        if (val > 0) {
            extraPayments[month] = val;
        } else {
            delete extraPayments[month]; // ลบออกถ้าแก้เป็น 0 หรือว่าง
        }
        
        generateTable(false); // เรียกคำนวณใหม่โดยไม่ลบ Base data
    }
});

// ปุ่มล้างเงินโปะทั้งหมด
document.getElementById("clearExtraBtn").addEventListener("click", function() {
    extraPayments = {};
    generateTable(false);
});