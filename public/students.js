async function getStudents() {
    try {
        const res = await fetch("/api/students");
        const data = await res.json();
        const studentsTable = document.getElementById("students-table");
        data.forEach((student) => {
            const tr = document.createElement("tr");
            // add headings
            const headings = [
                "Name",
                "Town/City",
                "State",
                "Pincode",
                "English",
                "Maths",
                "Science",
                "Social Science",
                "Hindi",
                "Total Marks",
                "Average",
                "Grade",
            ];

            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.townCity}</td>
                <td>${student.state}</td>
                <td>${student.pincode}</td>
                <td>${student.english}</td>
                <td>${student.maths}</td>
                <td>${student.science}</td>
                <td>${student.socialScience}</td>
                <td>${student.hindi}</td>
                <td>${student.totalMarks}</td>
                <td>${student.average}</td>
                <td>${student.grade}</td>
            `;
            studentsTable.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
}

getStudents();

function downloadCSV() {
    console.log("download csv");
    let data = "";
    const table = document.getElementById("students-table");
    for (let i = 0; i < table.rows.length; i++) {
        for (let j = 0; j < table.rows[i].cells.length; j++) {
            data = data + table.rows[i].cells[j].innerHTML + ",";
        }
        data = data + "\n";
    }
    const a = document.createElement("a");
    a.href = "data:attachment/csv," + data;
    a.target = "_Blank";
    a.download = "students.csv";
    document.body.appendChild(a);
    a.click();
}

const downloadButton = document.getElementById("download-button");

downloadButton.addEventListener("click", downloadCSV);
