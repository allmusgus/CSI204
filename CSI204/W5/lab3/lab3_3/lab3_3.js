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

document.getElementById("prevUnit").addEventListener("input", formatNumberInput);
document.getElementById("currUnit").addEventListener("input", formatNumberInput);

document.getElementById("electricForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let prevUnit = parseFloat(document.getElementById("prevUnit").value.replace(/,/g, ''));
    let currUnit = parseFloat(document.getElementById("currUnit").value.replace(/,/g, ''));
    
    if (currUnit < prevUnit) {
        alert("หน่วยปัจจุบันต้องมากกว่าหรือเท่ากับหน่วยก่อนหน้า");
        return;
    }

    let usedUnit = currUnit - prevUnit;
    let ftRate = 0.5;
    let energyCost = 0;

    if (usedUnit <= 150) {
        energyCost = usedUnit * 3.25;
    } else if (usedUnit <= 400) {
        energyCost = (150 * 3.25) + ((usedUnit - 150) * 4.22);
    } else {
        energyCost = (150 * 3.25) + (250 * 4.22) + ((usedUnit - 400) * 4.42);
    }

    let ftCost = usedUnit * ftRate;
    let totalBeforeVat = energyCost + ftCost;
    let vat = totalBeforeVat * 0.07;
    let total = totalBeforeVat + vat;

    let res = document.getElementById("billResult");
    res.innerHTML = `
        <h3 class="font-bold border-b pb-2">สรุปบิลค่าไฟ</h3>
        <p class="mt-2">หน่วยที่ใช้: ${usedUnit.toLocaleString()} หน่วย</p>
        <p>ค่าพลังงานไฟฟ้า: ${energyCost.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
        <p>ค่า Ft (0.5 บ./หน่วย): ${ftCost.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
        <p>รวมเงินก่อนภาษี: ${totalBeforeVat.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
        <p>ภาษีมูลค่าเพิ่ม (7%): ${vat.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
        <p class="font-bold text-xl text-red-600 mt-2">รวมยอดสุทธิ: ${total.toLocaleString(undefined, {minimumFractionDigits: 2})} บาท</p>
    `;
    res.classList.remove("hidden");
});