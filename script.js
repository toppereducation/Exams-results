async function checkResult() {
  const admissionId = document.getElementById("admissionId").value.trim();
  const resultDiv = document.getElementById("result");

  if (!admissionId) {
    resultDiv.innerHTML = `<p class="error">Please enter an Admission ID.</p>`;
    return;
  }

  try {
    const response = await fetch("students.json");
    const students = await response.json();

    const student = students.find(s => s.id === admissionId);

    if (student) {
      let subjectsHTML = `
        <table border="1" cellspacing="0" cellpadding="5" style="margin:10px auto; border-collapse: collapse; width: 100%;">
          <tr>
            <th>Subject</th>
            <th>Obtained</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Grade</th>
          </tr>
      `;

      student.subjects.forEach(sub => {
        const percentage = ((sub.obtained / sub.total) * 100).toFixed(1);
        subjectsHTML += `
          <tr>
            <td>${sub.name}</td>
            <td>${sub.obtained}</td>
            <td>${sub.total}</td>
            <td>${percentage}%</td>
            <td>${sub.grade}</td>
          </tr>`;
      });

      subjectsHTML += "</table>";

      // Calculate overall percentage & remarks
      const overallPercentage = ((student.totalObtained / student.totalMarks) * 100).toFixed(1);
      const overallRemarks = overallPercentage >= 33 ? "Pass" : "Fail";

      resultDiv.innerHTML = `
        <h2>🏫 Topper Education School</h2>
        <h3>Exam Results 2025</h3>
        <p><b>Name:</b> ${student.name}</p>
        <p><b>Father's Name:</b> ${student.fatherName}</p>
        <p><b>Class:</b> ${student.class}</p>
        ${subjectsHTML}
        <p><b>Total Obtained:</b> ${student.totalObtained}</p>
        <p><b>Total Marks:</b> ${student.totalMarks}</p>
        <p><b>Overall Percentage:</b> ${overallPercentage}%</p>
        <p><b>Remarks:</b> ${overallRemarks}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p class="error">No record found for this Admission ID.</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">Error loading results. Please try again.</p>`;
    console.error(error);
  }
}
