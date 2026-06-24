document.getElementById("profileForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let profile = {
        name: document.getElementById("pName").value,
        email: document.getElementById("pEmail").value,
        phone: document.getElementById("pPhone").value,
        theme: document.getElementById("pTheme").value
    };
    // บันทึกแบบ JSON ลง LocalStorage
    localStorage.setItem("userProfile", JSON.stringify(profile));
    window.location.href = "lab4_1b.html"; // เปลี่ยนหน้า
});