document.addEventListener("DOMContentLoaded", () => {
  const enrolmentNumber = localStorage.getItem("enrolment_number");

  if (!enrolmentNumber) {
    window.location.href = "index.html";
    return;
  }

  function updateCards(data) {
    document.getElementById("totalClasses").textContent = data.total;
    document.getElementById("attended").textContent = data.attended;
    document.getElementById("missed").textContent = data.missed;
    document.getElementById("percentage").textContent = data.percentage + "%";
  }

  function updateAlert(percentage) {
    const title = document.getElementById("alertTitle");
    const desc = document.getElementById("alertDesc");

    if (percentage < 75) {
      title.textContent = "⚠️ Attendance below 75%";
      desc.textContent = "Your attendance needs attention.";
    } else {
      title.textContent = "✅ Good Attendance";
      desc.textContent = "You're maintaining a safe attendance level.";
    }
  }

  const ctx = document.getElementById("attendanceChart");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Attendance %",
        data: [],
        borderWidth: 2,
        tension: 0.4
      }]
    },
    options: {
      responsive: true
    }
  });

  function loadDashboard(data) {
    updateCards({
      total: data.overview.total_classes,
      attended: data.overview.attended_classes,
      missed: data.overview.missed_classes,
      percentage: data.overview.attendance_percentage
    });

    updateAlert(data.overview.attendance_percentage);

    const labels = ["Mon", "Tue", "Wed", "Thu"];
    const values = [
      data.overview.attendance_percentage,
      data.overview.attendance_percentage - 5,
      data.overview.attendance_percentage + 3,
      data.overview.attendance_percentage + 2
    ];

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.update();

    document.getElementById("welcomeText").textContent = `Welcome back, ${data.student.name}`;
    document.getElementById("studentName").textContent = data.student.name;
  }

  async function fetchDashboard() {
    try {
      const response = await fetch(
        `https://devops-attendance-backend-8pri.onrender.com/student-dashboard/${enrolmentNumber}`
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.error || "Could not fetch student dashboard");
        return;
      }

      loadDashboard(data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      alert("Could not connect to backend");
    }
  }

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("enrolment_number");
      localStorage.removeItem("student_name");
      window.location.href = "index.html";
    });
  }

  fetchDashboard();
});
