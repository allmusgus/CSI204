let currentTheme = 'light';

function loadProfile() {
    let profileData = localStorage.getItem("userProfile");
    let displayDiv = document.getElementById("displayProfile");
    
    if (profileData) {
        let profile = JSON.parse(profileData);
        currentTheme = profile.theme;
        displayDiv.innerHTML = `
            <p><strong>ชื่อ:</strong> ${profile.name}</p>
            <p><strong>อีเมล:</strong> ${profile.email}</p>
            <p><strong>เบอร์โทร:</strong> ${profile.phone}</p>
            <p><strong>Theme:</strong> ${profile.theme}</p>
        `;
        applyTheme(currentTheme);
    } else {
        displayDiv.innerHTML = "<p class='text-red-500'>ไม่พบข้อมูลใน LocalStorage</p>";
    }
}

function applyTheme(theme) {
    let body = document.getElementById("bodyTheme");
    let card = document.getElementById("cardTheme");
    if (theme === 'dark') {
        body.classList.remove("bg-gray-100");
        body.classList.add("bg-gray-900", "text-black");
        card.classList.remove("bg-white");
        card.classList.add("bg-gray-800", "text-black");
    } else {
        body.classList.remove("bg-gray-900", "text-white");
        body.classList.add("bg-gray-100");
        card.classList.remove("bg-gray-800", "text-white");
        card.classList.add("bg-white");
    }
}

document.getElementById("toggleThemeBtn").addEventListener("click", () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    let profileData = localStorage.getItem("userProfile");
    if (profileData) {
        let profile = JSON.parse(profileData);
        profile.theme = currentTheme;
        localStorage.setItem("userProfile", JSON.stringify(profile));
        loadProfile(); 
    }
});

document.getElementById("clearDataBtn").addEventListener("click", () => {
    localStorage.removeItem("userProfile");
    alert("ล้างข้อมูลสำเร็จ");
    loadProfile();
});

window.onload = loadProfile;