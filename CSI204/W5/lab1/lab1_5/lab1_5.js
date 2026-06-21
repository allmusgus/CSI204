document.getElementById("storageForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;

    // วัตถุข้อมูลที่จะบันทึก
    let userData = { name: name, email: email, phone: phone, password: password };

    saveToLocalStorage(userData);
    this.reset(); // เคลียร์ช่องกรอกฟอร์มหลังจากบันทึกสำเร็จ
});

// ฟังก์ชันบันทึกข้อมูลลง localStorage (อ้างอิงจากโค้ดหน้ารูปภาพ 6)
function saveToLocalStorage(userData) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
}

// ฟังก์ชันดึงข้อมูลมาแสดงผลในรูปแบบตารางบนหน้าเว็บ
function displayUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userListDiv = document.getElementById("userList");

    if (users.length === 0) {
        userListDiv.innerHTML = "<p>ไม่มีข้อมูลผู้ใช้งานที่บันทึกไว้</p>";
        return;
    }

    let html = `<table>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อ</th>
                        <th>อีเมล</th>
                        <th>เบอร์โทร</th>
                    </tr>`;

    users.forEach((user, index) => {
        html += `<tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                 </tr>`;
    });

    html += `</table>`;
    userListDiv.innerHTML = html;
}

// ฟังก์ชันล้างข้อมูลใน localStorage
function clearStorage() {
    localStorage.removeItem("users");
    displayUsers();
    alert("Data cleared successfully");
}

// กำหนดปุ่ม Event และให้แสดงผลตารางทันทีเมื่อเปิดหน้าเว็บขึ้นมา
document.getElementById("clearBtn").addEventListener("click", clearStorage);
window.onload = displayUsers;