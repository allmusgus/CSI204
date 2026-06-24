// ข้อมูลนักเรียน
const students = [
    { id: "001", name: "สมชาย", scores: [80, 85, 90], grade: "A" },
    { id: "002", name: "สมหญิง", scores: [70, 75, 65], grade: "C" },
    { id: "003", name: "วิชัย", scores: [95, 92, 88], grade: "A" },
    { id: "004", name: "มาลี", scores: [60, 50, 55], grade: "D" }
];

function displayStudents() {
    // ใช้ map() และ reduce()
    let tableHtml = `
        <table class="w-full text-left border-collapse border">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border p-2">รหัส</th>
                    <th class="border p-2">ชื่อ</th>
                    <th class="border p-2">คะแนนเฉลี่ย</th>
                    <th class="border p-2">เกรด</th>
                </tr>
            </thead>
            <tbody>
    `;

    tableHtml += students.map(student => {
        let avgScore = student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length;
        return `
            <tr>
                <td class="border p-2">${student.id}</td>
                <td class="border p-2">${student.name}</td>
                <td class="border p-2">${avgScore.toFixed(2)}</td>
                <td class="border p-2 font-bold ${student.grade === 'A' ? 'text-green-600' : ''}">${student.grade}</td>
            </tr>
        `;
    }).join("");

    tableHtml += `</tbody></table>`;
    document.getElementById("studentTableContainer").innerHTML = tableHtml;

    // หาคนที่ได้เกรด A ด้วย filter()
    let gradeAStudents = students.filter(s => s.grade === "A");
    let gradeAUl = document.getElementById("gradeAList");
    
    gradeAStudents.forEach(s => {
        let li = document.createElement("li");
        li.textContent = `${s.name} (รหัส: ${s.id})`;
        gradeAUl.appendChild(li);
    });
}

window.onload = displayStudents;