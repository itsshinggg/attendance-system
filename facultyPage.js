"use strict";
const getURL =
  "https://ilcct0rpcf.execute-api.us-west-2.amazonaws.com/get_v1/getstudentdata";

const participants = document.getElementById("student-list");

async function fetchStudentsList() {
  try {
    const resStudent = await fetch(getURL);
    const dataStudent = await resStudent.json();
    const items = dataStudent.Items;
    await console.log(items);
    await showData(items);
  } catch {
    console.error("Error while fetching:");
  }
}

async function showData(items) {
  for (let i = 0; i < items.length; i++) {
    let studentName = items[i].studentName.S;
    let className = items[i].className.S;
    let password = items[i].password.S;

    participants.insertAdjacentHTML(
      "afterend",
      `<tr>
        <td>${studentName}</td>
        <td>${className}</td>
        <td>${password}</td>
      </tr>`
    );
  }
}

fetchStudentsList();
