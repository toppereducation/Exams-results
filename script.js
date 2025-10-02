async function checkResult() {
  const id = document.getElementById("admissionId").value.trim();
  const container = document.getElementById("studentData");

  try {
    const response = await fetch("students.json"); // load JSON
    const results = await response.json();

    const student = results[id];
    if (student) {
      let totalObt = 0, totalMax = 0;
      let table = `<h3>${student.name} (ID: ${id})</h3>
                   <table border="1" cellpadding="8" cellspacing="0" width="100%">
                   <tr style="background:#007acc; color:white;">
                     <th>Subject</th><th>Obtained</th><th>Total</th>
                     <th>Percentage</th><th>Grade</th>
                   </tr>`;
      
      for (let sub in student.subjects) {
        let [obt, max] = student.subjects[sub];
        totalObt += obt; 
        totalMax += max;
        let percent = ((obt / max) * 100).toFixed(1);
        let grade = percent >= 80 ? "A" : percent >= 60 ? "B" : percent >= 40 ? "C" : "F";

        table += `<tr>
                    <td>${sub}</td>
                    <td>${obt}</td>
                    <td>${max}</td>
                    <td>${percent}%</td>
                    <td>${grade}</td>
                  </tr>`;
      }

      let overall = ((totalObt / totalMax) * 100).toFixed(1);
      let remarks = overall >= 40 ? "Pass ✅" : "Fail ❌";

      table += `</table>
                <h3>Total Obtained: ${totalObt}</h3>
                <h3>Total Marks: ${totalMax}</h3>
                <h3>Overall Percentage: ${overall}%</h3>
                <h3>Remarks: ${remarks}</h3>`;
      container.innerHTML = table;
    } else {
      container.innerHTML = `<p style="color:red; text-align:center;">⚠️ No record found for ID: ${id}</p>`;
    }
  } catch (err) {
    container.innerHTML = `<p style="color:red;">⚠️ Error loading data.</p>`;
    console.error(err);
  }
}
