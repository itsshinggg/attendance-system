"use strict";

const getURL =
  "https://ilcct0rpcf.execute-api.us-west-2.amazonaws.com/get_v1/getstudentdata";

const deleteURL =
  "https://ilcct0rpcf.execute-api.us-west-2.amazonaws.com/delete_v1/deletestudentdata?id=";

const participants = document.querySelector("tbody");
const studentTotal = document.querySelector(".studentsTotal");
const refreshBtn = document.querySelector(".refresh-btn");
const classOption = document.querySelector(".select");
let names;

async function fetchStudentsList() {
  try {
    const resStudent = await fetch(getURL);
    const dataStudent = await resStudent.json();
    let items = await dataStudent.Items;
    console.log(items);
    await selectClass(items);
  } catch {
    console.error("Error while fetching:");
  }
}

async function selectClass(items) {
  return new Promise((res, rej) => {
    classOption.addEventListener("change", (e) => {
      participants.innerHTML = "";
      displayData(items, e.target.value);
      deleteData(names, e.target.value);
    });
  });
}

async function sortData(items) {
  data = [];
  for (let i = 0; i < items.length; i++) {
    if (selectedClass === items[i].className.S) {
      data.push([
        items[i].studentName.S,
        items[i].className.S,
        items[i].password.S,
        items[i].id.S,
      ]);
    }
  }
}

async function displayData(items, selectedClass) {
  names = [];
  for (let i = 0; i < items.length; i++) {
    if (selectedClass === items[i].className.S) {
      names.push([
        items[i].studentName.S,
        items[i].className.S,
        items[i].password.S,
        items[i].id.S,
      ]);
    }
  }
  studentTotal.innerHTML = `Signed-in Students: ${names.length}`;
  names = names.sort((a, b) => a[0].localeCompare(b[0]));

  for (let i = 0; i < names.length; i++) {
    participants.innerHTML += `
        <td>${names[i][0]}</td>
        <td>${names[i][1]}</td>
        <td>${names[i][2]}</td>
      `;
  }
}

async function deleteData(names) {
  refreshBtn.addEventListener("click", function () {
    let ids = names.map((name) => name[3]);
    for (let id of ids) {
      fetch(deleteURL + id, { method: "DELETE" });
    }
    // displayData(names, e.target.value);
    participants.innerHTML = "";
    studentTotal.innerHTML = "Signed-in Students: 0";
  });
}

fetchStudentsList();

/*
as long as the page does not get loaded, the table item remains displayed
*/
