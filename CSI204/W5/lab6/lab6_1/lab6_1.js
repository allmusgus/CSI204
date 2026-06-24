// โค้ดอ้างอิงจากตัวอย่างในเอกสาร
function convert() {
    let type = document.getElementById("convertType").value;
    let value = parseFloat(document.getElementById("inputValue").value);
    let result = 0;
    let resDiv = document.getElementById("result");

    if (isNaN(value)) {
        resDiv.innerHTML = "กรุณากรอกตัวเลข";
        resDiv.classList.remove("hidden");
        return;
    }

    switch(type) {
        case "kgToLb":
            result = value * 2.20462;
            resDiv.innerHTML = `${value} กิโลกรัม = ${result.toFixed(3)} ปอนด์`;
            break;
        case "cToF":
            result = (value * 9/5) + 32;
            resDiv.innerHTML = `${value} องศาเซลเซียส = ${result.toFixed(3)} องศาฟาเรนไฮต์`;
            break;
        case "kmToMi":
            result = value * 0.621371;
            resDiv.innerHTML = `${value} กิโลเมตร = ${result.toFixed(3)} ไมล์`;
            break;
        default:
            resDiv.innerHTML = "กรุณาเลือกประเภทการแปลง";
    }
    
    resDiv.classList.remove("hidden");
}