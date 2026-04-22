document.getElementById("signupForm").addEventListener("submit", signup);

function signup(e){
    e.preventDefault();

    const userData = {
        name: document.getElementById("Name_of_Student").value,
        enrolment: document.getElementById("Enrollment_Number").value,
        semester: parseInt(document.getElementById("Semester").value),
        branch: document.getElementById("Branch").value,
        email: document.getElementById("College_Email").value,
        password: document.getElementById("Password").value
    };

    fetch("https://devops-attendance-backend-8pri.onrender.com/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);

        // redirect to login after signup
        window.location.href = "index.html";
    })
    .catch(err => {
        console.log(err);
        alert("Signup failed ❌");
    });
}



function goToLogin(){
    window.location.href = "index.html";
}
