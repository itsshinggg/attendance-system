"use strict";

const participants = document.getElementById("facultyPage");

const addNames = function (sName, cName, pwd) {
  const list = document.createElement("li");
  let participantsName = document.createTextNode(stuName);
  list.appendChild(participantsName);

  console.log(list);
  console.log(participants);
  participants.appendChild(list);
};

// addNames(sName, cName, pwd);
