document.getElementById("resultForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const admissionId = document.getElementById("admissionId").value.trim();
  const resultDiv = document.getElementById("result");

  fetch('https://raw.githubusercontent.com/toppereducation/Exams-results/main/students.json')
    .then(response => response.json())
    .then(data => {
      const student = data.find(std => std.admissionId === admissionId);

      if (student) {
        let subjectsHTML = "";
        let totalMarks = 0;
        let totalObtained = 0;

        student.subjects.forEach(subject => {
          totalMarks += subject.total;
          totalObtained += subject.marks;

          const percentage = ((subject.marks / subject.total) * 100).toFixed(1);
          let grade = "";
          if (percentage >= 90) grade = "A+";
          else if (percentage >= 80) grade = "A";
          else if (percentage >= 70) grade = "B";
          else if (percentage >= 60) grade = "C";
          else if (percentage >= 50) grade = "D";
          else grade = "F";

          subjectsHTML += `
            <tr>
              <td>${subject.name}</td>
              <td>${subject.total}</td>
              <td>${subject.marks}</td>
              <td>${percentage}%</td>
              <td>${grade}</td>
            </tr>
          `;
        });

        const overallPercentage = ((totalObtained / totalMarks) * 100).toFixed(1);

        let overallGrade = "";
        if (overallPercentage >= 90) overallGrade = "A+";
        else if (overallPercentage >= 80) overallGrade = "A";
        else if (overallPercentage >= 70) overallGrade = "B";
        else if (overallPercentage >= 60) overallGrade = "C";
        else if (overallPercentage >= 50) overallGrade = "D";
        else if (overallPercentage >= 40) overallGrade = "E";
        else overallGrade = "F";

        const remarks = (overallGrade === "F") ? "Fail" : "Pass";

        resultDiv.innerHTML = `
          <h2>Result Details</h2>
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>Father's Name:</strong> ${student.fatherName}</p>
          <p><strong>Class:</strong> ${student.class}</p>

          <table>
            <tr>
              <th>Subject</th>
              <th>Total Marks</th>
              <th>Obtained Marks</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Remarks</th>
            </tr>
            ${subjectsHTML}
          </table>

          <p><strong>Total Marks:</strong> ${totalMarks}</p>
          <p><strong>Total Obtained:</strong> ${totalObtained}</p>
          <p><strong>Overall Percentage:</strong> ${overallPercentage}%</p>
          <p><strong>Overall Grade:</strong> ${overallGrade}</p>
          <p><strong>Remarks:</strong> ${remarks}</p>
        `;
      } else {
        resultDiv.innerHTML = `<p style="color:red;">Result not found for Admission ID ${admissionId}</p>`;
      }
    })
    .catch(error => {
      console.error("Error loading student data:", error);
      resultDiv.innerHTML = "<p style='color:red;'>Error loading data. Please try again later.</p>";
    });
});






