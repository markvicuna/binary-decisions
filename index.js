//Variables

const optionList = [];
const decisionList = [];
let decisionIndex = 0;

const addBtn = document.querySelector("#add-btn");
const rmvBtn = document.getElementsByClassName("rmv-btn");
const startBtn = document.querySelector("#start-btn");

const option1 = document.querySelector("#option-1");
const option2 = document.querySelector("#option-2");

const entryGroup = document.querySelector("#option-group");
const entries = document.getElementsByClassName("option");

const results = document.querySelector("#results");
const startView = document.querySelector("#start-view");
const decisionView = document.querySelector("#decision-view");
const resultsView = document.querySelector("#results-view");

const alertBox = document.querySelector("#alert");
const progressBar = document.querySelector("#progress");

// Class: Entry
class Entry {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  addPoint() {
    this.score++;
  }
}

// Show Alert

const showAlert = (message) => {
  alertBox.textContent = message;
  setTimeout(() => {
    alertBox.textContent = "";
  }, 3000);
};

// Add Priority
addBtn.addEventListener("click", (e) => {
  if (entryGroup.childElementCount > 9) {
    showAlert("stop it dude");
    return;
  }

  const div = document.createElement("div");
  div.classList.add("option-line");
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("option");
  input.placeholder = "Option";

  const removeButton = document.createElement("span");
  removeButton.classList.add("rmv-btn");
  removeButton.tabIndex = -1;

  div.appendChild(input);
  div.appendChild(removeButton);

  entryGroup.appendChild(div);

  if (entryGroup.childElementCount > 3) {
    for (let i = 0; i < rmvBtn.length; i++) {
      rmvBtn[i].style.display = "inline-flex";
    }
  }
});

// Remove Entry
entryGroup.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("rmv-btn")) {
    e.target.parentElement.remove();
  }
  if (entryGroup.childElementCount < 4) {
    for (let i = 0; i < rmvBtn.length; i++) {
      rmvBtn[i].style.display = "none";
    }
  }
});

// Press Start
startBtn.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].value == "") {
      showAlert("No empty fields, please.");
      return;
    }
  }

  for (let i = 0; i < entries.length; i++) {
    optionList.push(new Entry(entries[i].value));
  }

  let n = optionList.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const arr = [optionList[i], optionList[j]];
      decisionList.push(shuffle(arr));
    }
  }

  shuffle(decisionList);

  console.log(decisionList);

  startView.remove();
  decisionView.style.display = "block";

  option1.textContent = decisionList[decisionIndex][0].name;
  option2.textContent = decisionList[decisionIndex][1].name;
  progressBar.textContent = calculateProgress();
});

// Battle it out

option1.addEventListener("click", (e) => {
  optionList.find((entry) => entry.name == e.target.textContent).addPoint();
  decisionIndex++;
  compareOptions();
});

option2.addEventListener("click", (e) => {
  optionList.find((entry) => entry.name == e.target.textContent).addPoint();
  decisionIndex++;
  compareOptions();
});

// Functions
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const calculateProgress = () => {
  let increment = 100 / decisionList.length;
  return Math.round(decisionIndex * increment);
};

const loadResults = () => {
  optionList.sort((a, b) => b.score - a.score);

  const ol = document.createElement("ol");

  optionList.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry.name;
    ol.appendChild(item);
  });

  resultsView.appendChild(ol);
};

const compareOptions = () => {
  if (decisionIndex < decisionList.length) {
    option1.textContent = decisionList[decisionIndex][0].name;
    option2.textContent = decisionList[decisionIndex][1].name;
    progressBar.textContent = calculateProgress();
  } else {
    decisionView.remove();
    resultsView.style.display = "block";
    loadResults();
  }
};
