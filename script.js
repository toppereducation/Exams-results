document.getElementById("checkBtn").addEventListener("click", function () {
    const id = document.getElementById("studentId").value.trim();
    const resultContainer = document.getElementById("result");

    fetch("students.json")
        .then(response => response.json())
        .then(data => {
            const student = data.find(s => s.id === id);

            if (!student) {
                resultContainer.innerHTML = `<p style="color:red;">Result not found for ID: ${id}</p>`;
                return;
            }

            // Student info
            let output = `
                <h3>${student.name} (ID: ${student.id})</h3>
                <p><strong>Father's Name:</strong> ${student.fatherName}</p>
                <p><strong>Class:</strong> ${student.class}</p>
                <table border="1" cellspacing="0" cellpadding="5">
                    <tr>
                        <th>Subject</th>
                        <th>Obtained</th>
                        <th>Total</th>
                        <th>Percentage</th>
                        <th>Grade</th>
                    </tr>
            `;

            let totalObtained = 0, totalMarks = 0;
            student.subjects.forEach(sub => {
                totalObtained += sub.obtained;
                totalMarks += sub.total;
                let percent = ((sub.obtained / sub.total) * 100).toFixed(1);
                let grade =
                    percent >= 90 ? "A+" :
                    percent >= 80 ? "A" :
                    percent >= 70 ? "B" :
                    percent >= 60 ? "C" :
                    percent >= 50 ? "D" : "F";

                output += `
                    <tr>
                        <td>${sub.name}</td>
                        <td>${sub.obtained}</td>
                        <td>${sub.total}</td>
                        <td>${percent}%</td>
                        <td>${grade}</td>
                    </tr>
                `;
            });

            let overallPercent = ((totalObtained / totalMarks) * 100).toFixed(1);
            let remarks = overallPercent >= 50 ? "Pass ✅" : "Fail ❌";

            output += `
                </table>
                <p><strong>Total Obtained:</strong> ${totalObtained}</p>
                <p><strong>Total Marks:</strong> ${totalMarks}</p>
                <p><strong>Overall Percentage:</strong> ${overallPercent}%</p>
                <p><strong>Remarks:</strong> ${remarks}</p>
            `;

            resultContainer.innerHTML = output;
        })
        .catch(error => {
            resultContainer.innerHTML = `<p style="color:red;">Error loading data</p>`;
            console.error(error);
        });
});
