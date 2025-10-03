async function getResult() {
  const admissionId = document.getElementById("admissionId").value.trim();
  const resultDiv = document.getElementById("result");

  // Clear previous result
  resultDiv.innerHTML = "";

  if (admissionId === "") {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter Admission ID.</p>";
    return;
  }

  try {
    const response = await fetch("students.json");
    const students = await response.json();

    const student = students.find(s => s.admissionId === admissionId);

    if (student) {
      // Show student result
      resultDiv.innerHTML = `
        <h2>${student.name}</h2>
        <p><strong>Admission ID:</strong> ${student.admissionId}</p>
        <p><strong>Class:</strong> ${student.class}</p>
        <p><strong>Total Marks:</strong> ${student.totalMarks}</p>
        <p><strong>Grade:</strong> ${student.grade}</p>
        <p><strong>Remarks:</strong> ${student.remarks}</p>
      `;
    } else {
      resultDiv.innerHTML = "<p style='color:red;'>No record found for this Admission ID.</p>";
    }
  } catch (error) {
    console.error("Error loading student data:", error);
    resultDiv.innerHTML = "<p style='color:red;'>Unable to load student data.</p>";
  }
}
