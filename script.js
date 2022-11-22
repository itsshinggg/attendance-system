"use strict";

const btn = document.querySelector(".submit-btn");
const studentName = document.querySelector('[name="name"]');
const className = document.querySelector('[name="class"]');
const password = document.querySelector('[name="password"]');
const confirmation = document.querySelector(".overlay");
const errorText = document.querySelector(".error-message");
const putURL =
  "https://ilcct0rpcf.execute-api.us-west-2.amazonaws.com/put_v1/putstudentdata";
let isConfirmed = false;
let studentInfo = [studentName, className, password];
let error = [];

const submissionHandler = function () {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    showError();

    if (error.length !== 0) {
      return;
    }

    let sName = studentName.value;
    let cName = className.value.toUpperCase();
    let pwd = password.value;

    clearText();

    postStudentInfo(sName, cName, pwd);

    confirmSubmission();
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
    showErrorMessage(error);
  }
};

const showErrorMessage = function (error) {
  errorText.classList.remove("hidden");
  errorText.innerHTML = `Please insert ${error
    .map((e) => e.at(0).toUpperCase(0) + e.slice(1))
    .join(" and ")} !`;
};

const removeErrorMessage = function () {
  errorText.classList.add("hidden");
};

const whiteBackground = function () {
  for (let input of studentInfo) {
    input.addEventListener("click", (e) => {
      e.target.classList.remove("error");
      removeErrorMessage();
    });
  }
};

const postStudentInfo = function (sName, cName, pwd) {
  let putData = {
    studentName: sName,
    className: cName,
    password: pwd,
  };

  let option = {
    method: "POST",
    body: JSON.stringify(putData),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  let request = fetch(putURL, option)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log("Error while fetching:", error));
};

const confirmSubmission = function () {
  confirmation.classList.remove("hidden");
  setTimeout(() => {
    isConfirmed = true;
  }, 100);
};

const removeConfirmation = function () {
  document.body.addEventListener("click", function () {
    if (isConfirmed) {
      confirmation.classList.add("hidden");
      isConfirmed = false;
    }
  });
};

submissionHandler();
whiteBackground();
removeConfirmation();
