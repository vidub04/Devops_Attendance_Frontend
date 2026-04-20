// Show Signup Page
function goToSignup() {
    window.location.href = "signup.html";
}

// 🔐 LOGIN FUNCTION
function login(event) {
    event.preventDefault();

    const enrolmentNumber = document.getElementById("Enrollment_Number").value;
    const password = document.getElementById("Password").value;

    fetch("https://devops-attendance-backend-8pri.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            enrolment: parseInt(enrolmentNumber),
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response:", data); // 🔍 debug

        if (data.message && data.message.toLowerCase().includes("success")) {

            // ✅ STORE WITH CORRECT KEY (MATCH DASHBOARD)
            localStorage.setItem("enrolment_number", enrolmentNumber);

            // redirect
            window.location.href = "dashboard.html";

        } else {
            alert(data.message || "Login failed");
        }
    })
    .catch(error => {
        alert("Server Error ❌");
        console.log(error);
    });
}