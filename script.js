document.getElementById("checkResult").addEventListener("click", function () {
    const studentId = document.getElementById("studentId").value;
    const resultDiv = document.getElementById("result");

    fetch("students.json")
        .then(response => response.json())
        .then(data => {
            const student = data.find(s => s.id === studentId);

            if (student) {
                // Student info (name, father name, class)
                let resultHTML = `
                    <h3>${student.name} (ID: ${student.id})</h3>
                    <p><strong>Father's Name:</strong> ${student.fatherName}</p>
                    <p><strong>Class:</strong> ${student.class}</p>
                    <table border="1" cellpadding="5" cellspacing="0">
                        <tr>
                            <th>Subject</th>
                            <th>Obtained</th>
                            <th>Total</th>
                            <th>Percentage</th>
                            <th>Grade</th>
                        </tr>
                `;

                let totalObtained = 0;
                let totalMarks = 0;

                student.subjects.forEach(subject => {
                    totalObtained += subject.obtained;
                    totalMarks += subject.total;
                    const percentage = ((subject.obtained / subject.total) * 100).toFixed(1);

                    let grade = "";
                    if (percentage >= 80) grade = "A";
                    else if (percentage >= 70) grade = "B";
                    else if (percentage >= 60) grade = "C";
                    else if (percentage >= 50) grade = "D";
                    else grade = "F";

                    resultHTML += `
                        <tr>
                            <td>${subject.name}</td>
                            <td>${subject.obtained}</td>
                            <td>${subject.total}</td>
                            <td>${percentage}%</td>
                            <td>${grade}</td>
                        </tr>
                    `;
                });

                const overallPercentage = ((totalObtained / totalMarks) * 100).toFixed(1);
                const remarks = overallPercentage >= 50 ? "Pass ✅" : "Fail ❌";

                resultHTML += `
                    </table>
                    <p><strong>Total Obtained:</strong> ${totalObtained}</p>
                    <p><strong>Total Marks:</strong> ${totalMarks}</p>
                    <p><strong>Overall Percentage:</strong> ${overallPercentage}%</p>
                    <p><strong>Remarks:</strong> ${remarks}</p>
                `;

                resultDiv.innerHTML = resultHTML;
            } else {
                resultDiv.innerHTML = "<p style='color:red;'>Student not found!</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching student data:", error);
            resultDiv.innerHTML = "<p style='color:red;'>Error loading data!</p>";
        });
});
