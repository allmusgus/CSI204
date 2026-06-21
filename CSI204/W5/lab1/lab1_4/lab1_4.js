document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าจอเมื่อกด Submit

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;

    let errors = [];

    // เงื่อนไขการตรวจสอบ (Validation)
    if (name === "") {
        errors.push("Please enter your name");
    }

    if (email === "" || !email.includes("@")) {
        errors.push("Please enter a valid email address");
    }

    if (phone === "" || phone.length !== 10) {
        errors.push("Please enter a valid 10-digit phone number");
    }

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }

    // ตรวจสอบผลลัพธ์
    if (errors.length > 0) {
        alert(errors.join("\n")); // แจ้งเตือนข้อผิดพลาดทั้งหมดที่มี
        return false;
    }

    alert("Registration successful!");
    return true;
});