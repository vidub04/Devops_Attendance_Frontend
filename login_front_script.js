// Redirect to Signup Page
function goToSignup() {
    window.location.href = "signup.html";
}

// LOGIN FUNCTION
function login(event) {
    event.preventDefault(); // stop form refresh

    // Get input values
    const enrolment = document.getElementById("Enrollment_Number").value.trim();
    const password = document.getElementById("Password").value.trim();

    // Basic validation
    if (!enrolment || !password) {
        alert("Please enter all fields");
        return;
    }

    // Call backend API
    fetch("https://devops-attendance-backend-8pri.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            enrolment: parseInt(enrolment),
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Login response:", data);

        if (data.message.toLowerCase().includes("success")) {

            // 🔥 MOST IMPORTANT LINE (connects login → dashboard)
            localStorage.setItem("enrolment_number", enrolment);

            // Optional: store name if backend sends it
            if (data.student && data.student.name) {
                localStorage.setItem("student_name", data.student.name);
            }

            alert("Login successful ✅");

            // Redirect to dashboard
            window.location.href = "dashboard.html";

        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Server Error ❌");
    });
}
