async function searchStudent() {
    const id = document.getElementById("studentId").value;
    const response = await fetch("students.json");
    const students = await response.json();

    const student = students.find(s => s.id === id);

    const detailsDiv = document.getElementById("studentDetails");
    const printBtn = document.getElementById("printBtn");

    if (student) {
        // Calculate totals
        let totalMarks = 0, obtainedMarks = 0;

        // Helper to get grade based on %
        function getGrade(percentage) {
            if (percentage >= 90) return { grade: "A+", remarks: "Pass" };
            if (percentage >= 80) return { grade: "A", remarks: "Pass" };
            if (percentage >= 70) return { grade: "B", remarks: "Pass" };
            if (percentage >= 60) return { grade: "C", remarks: "Pass" };
            if (percentage >= 50) return { grade: "D", remarks: "Pass" };
            return { grade: "F", remarks: "Fail" };
        }

        // Build subjects table
        let subjectsTable = `
            <table border="1" cellspacing="0" cellpadding="5">
                <tr>
                    <th>Subject</th>
                    <th>Total Marks</th>
                    <th>Marks Obtained</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                </tr>
        `;

        student.subjects.forEach(sub => {
            totalMarks += sub.totalMarks;
            obtainedMarks += sub.marksObtained;

            let subPercentage = ((sub.marksObtained / sub.totalMarks) * 100).toFixed(2);
            let { grade } = getGrade(subPercentage);

            subjectsTable += `
                <tr>
                    <td>${sub.name}</td>
                    <td>${sub.totalMarks}</td>
                    <td>${sub.marksObtained}</td>
                    <td>${subPercentage}%</td>
                    <td>${grade}</td>
                </tr>
            `;
        });

        subjectsTable += `</table>`;

        // Overall percentage, grade, remarks
        const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);
        const { grade, remarks } = getGrade(percentage);

        // Show student details
        detailsDiv.innerHTML = `
            <h2>${student.name} (ID: ${student.id})</h2>
            <p><strong>Father Name:</strong> ${student.fatherName}</p>
            <p><strong>Class:</strong> ${student.class}</p>
            ${subjectsTable}
            <p><strong>Total Marks:</strong> ${totalMarks}</p>
            <p><strong>Marks Obtained:</strong> ${obtainedMarks}</p>
            <p><strong>Percentage:</strong> ${percentage}%</p>
            <p><strong>Grade:</strong> ${grade}</p>
            <p><strong>Remarks:</strong> ${remarks}</p>
        `;

        printBtn.style.display = "block";
    } else {
        detailsDiv.innerHTML = '<p style="color:red;">Student not found</p>';
        printBtn.style.display = "none";
    }
}
