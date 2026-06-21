let studentName = "Jay M. Lee";
let studentAge = 20;
let isGraduated = false;
let scores = [85, 90, 78, 92];
let studentInfo = { id: "68001234", major: "CSI" };

let numStr = "123";
let floatStr = "45.67";
let convertedInt = parseInt(numStr);
let convertedFloat = parseFloat(floatStr);
let convertedString = String(studentAge);

let totalScore = scores.reduce((sum, score) => sum + score, 0);
let averageScore = (totalScore / scores.length).toFixed(2);

console.log("Student Name:", studentName, "Type:", typeof studentName);
console.log("Average Score:", averageScore);

let outputDiv = document.getElementById("output");
outputDiv.innerHTML = `
    <p><strong>Name:</strong> ${studentName}</p>
    <p><strong>Age:</strong> ${studentAge} (Type: ${typeof studentAge})</p>
    <p><strong>Status:</strong> ${isGraduated ? "Graduated" : "Studying"}</p>
    <p><strong>Student ID:</strong> ${studentInfo.id}</p>
    <p><strong>Average Grade:</strong> ${averageScore}</p>
    <hr>
    <p><strong>Parsed Integer:</strong> ${convertedInt} (Type: ${typeof convertedInt})</p>
`;