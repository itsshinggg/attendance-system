"use strict";
const getURL =
  "https://ilcct0rpcf.execute-api.us-west-2.amazonaws.com/get_v1/getstudentdata";
const participants = document.getElementById("studentList");
const studentTotal = document.getElementById("studentsTotal");

async function fetchStudentsList() {
  try {
    const resStudent = await fetch(getURL);
    const dataStudent = await resStudent.json();
    const items = dataStudent.Items;
    studentTotal.innerHTML = `Signed-in Students: ${items.length}`;
    await displayData(items);
  } catch {
    console.error("Error while fetching:");
  }
}

async function displayData(items) {
  let names = [];
  for (let i = 0; i < items.length; i++) {
    names.push([
      items[i].studentName.S,
      items[i].className.S,
      items[i].password.S,
    ]);
  }
  names = names.sort((a, b) => b[0].localeCompare(a[0]));

  for (let i = 0; i < names.length; i++) {
    participants.insertAdjacentHTML(
      "afterend",
      `<tr>
        <td>${names[i][0]}</td>
        <td>${names[i][1]}</td>
        <td>${names[i][2]}</td>
      </tr>`
    );
  }
}

fetchStudentsList();
