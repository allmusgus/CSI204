document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value;
    
    let errors = [];

    if (name === "") {
        errors.push("โปรดกรอกชื่อ");
    }
    if (email === "" || !email.includes("@")) {
        errors.push("โปรดกรอกอีเมลให้ถูกต้อง");
    }
    if (phone === "" || phone.length !== 10) {
        errors.push("โปรดกรอกเบอร์โทรให้ถูกต้อง (10 หลัก)");
    }
    if (password.length < 6) {
        errors.push("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }

    alert("Registration successful!");
    return true;
});