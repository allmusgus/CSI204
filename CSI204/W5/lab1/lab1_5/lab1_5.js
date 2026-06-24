document.addEventListener("DOMContentLoaded", displayUsers);

document.getElementById("storageForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;

    if (name === "" || !email.includes("@") || phone.length !== 10 || password.length < 6) {
        alert("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบ (ชื่อ, อีเมลที่มี @, เบอร์โทร 10 หลัก, รหัสผ่าน 6 ตัว)");
        return;
    }

    let userData = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    saveToLocalStorage(userData);
    this.reset();
    alert("Registration successful!");
});

function saveToLocalStorage(userData) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
}

function displayUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userListDiv = document.getElementById("userList");

    if (users.length === 0) {
        userListDiv.innerHTML = "<p class='text-gray-500'>ไม่มีข้อมูลในระบบ</p>";
        return;
    }

    let html = `<table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="border p-2">ลำดับ</th>
                            <th class="border p-2">ชื่อ</th>
                            <th class="border p-2">อีเมล</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
    users.forEach((user, index) => {
        html += `<tr>
                    <td class="border p-2">${index + 1}</td>
                    <td class="border p-2">${user.name}</td>
                    <td class="border p-2">${user.email}</td>
                 </tr>`;
    });

    html += `</tbody></table>`;
    userListDiv.innerHTML = html;
}

document.getElementById("clearBtn").addEventListener("click", function clearStorage() {
    if(confirm("ต้องการล้างข้อมูลทั้งหมดหรือไม่?")) {
        localStorage.removeItem("users");
        displayUsers();
        alert("Data cleared successfully");
    }
});