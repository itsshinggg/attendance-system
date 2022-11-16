"use strict";

// import { Amplify, API, graphqlOperation } from "aws-amplify";
// import awsconfig from "./aws-exports";
// Amplify.configure(awsconfig);

const btn = document.querySelector(".submit-btn");
const studentName = document.querySelector('[name="name"]');
const className = document.querySelector('[name="class"]');
const password = document.querySelector('[name="password"]');
// const participants = document.getElementById("facultyPage");

let sName;
let cName;
let pwd;
let studentInfo = [studentName, className, password];
let error = [];

const submissionHandler = function () {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    showError();

    if (error.length !== 0) {
      return;
    }

    sName = studentName.value;
    cName = className.value.toUpperCase();
    pwd = password.value;

    // addNames(sName);

    clearText();
    console.log(`Name: ${sName}, Class: ${cName}, Password: ${pwd}`);
    // return sName, cName, pwd;
  });
};

const clearText = function () {
  studentName.value = "";
  className.value = "";
  password.value = "";
};

const showError = function () {
  error = [];
  for (let info of studentInfo) {
    if (!info.value) {
      info.classList.add("error");
      error.push(info.name);
    }
  }
  if (error.length !== 0) {
    alert(
      `Please fill in ${error
        .map((e) => e.at(0).toUpperCase(0) + e.slice(1))
        .join(" and ")} please!`
    );
  }
};

const whiteBackground = function () {
  for (let input of studentInfo) {
    input.addEventListener("click", (e) => {
      e.target.classList.remove("error");
    });
  }
};

// const addNames = function (stuName) {
//   const list = document.createElement("li");
//   let participantsName = document.createTextNode(stuName);
//   list.appendChild(participantsName);

//   console.log(list);
//   console.log(participants);
//   participants.appendChild(list);
// };

submissionHandler();
whiteBackground();
