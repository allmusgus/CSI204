let studentName = "Jay M. Lee";
let isGraduated = false;
let scores = [85, 90, 78, 92];
let studentInfo = { id: "68001234", major: "CSI" };

let numStr = "100";
let floatStr = "45.50";
let parsedInt = parseInt(numStr);
let parsedFloat = parseFloat(floatStr);
let strFromNum = String(scores[0]);

let totalScore = scores.reduce((sum, score) => sum + score, 0);
let avgScore = totalScore / scores.length;

console.log("Student Name:", studentName, "- Type:", typeof studentName);
console.log("Is Graduated:", isGraduated, "- Type:", typeof isGraduated);
console.log("Parsed Integer:", parsedInt, "- Type:", typeof parsedInt);

let outputDiv = document.getElementById("output");
outputDiv.innerHTML = `
    <p><strong>ชื่อ:</strong> ${studentName}</p>
    <p><strong>รหัสนักศึกษา:</strong> ${studentInfo.id}</p>
    <p><strong>สถานะการจบการศึกษา:</strong> ${isGraduated}</p>
    <p><strong>คะแนนเฉลี่ย:</strong> ${avgScore.toFixed(2)}</p>
    <hr class="my-2">
    <p><strong>ทดสอบแปลงข้อมูล:</strong> ข้อความ "100" แปลงเป็นตัวเลขได้ ${parsedInt} (Type: ${typeof parsedInt})</p>
`;