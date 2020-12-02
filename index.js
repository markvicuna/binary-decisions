//Variables

const optionList = [];
const decisionList = [];

const startView = document.querySelector("#start-view");
const decisionView = document.querySelector("#decision-view");
const resultsView = document.querySelector("#results-view");

const addBtn = document.querySelector("#add-btn");
const rmvBtn = document.getElementsByClassName("rmv-btn");
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");

const optionGroup = document.querySelector("#option-group");
const options = document.getElementsByClassName("option");

const option1 = document.querySelector("#option-1");
const option2 = document.querySelector("#option-2");

const results = document.querySelector("#results");

const progressText = document.querySelector("#progress-value");
const progressBar = document.querySelector("#progress-bar");

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

// Add Priority
addBtn.addEventListener("click", (e) => {
  if (optionGroup.childElementCount > 9) {
    showAlert(addBtn, "Add Option", "Max 10 options allowed.");
    return;
  }

  const div = document.createElement("div");
  div.classList.add("option-line");
  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("option");
  input.placeholder = "Option";

  const removeButton = document.createElement("span");
  removeButton.textContent = "x";
  removeButton.classList.add("rmv-btn");
  removeButton.tabIndex = -1;

  div.appendChild(input);
  div.appendChild(removeButton);

  optionGroup.appendChild(div);

  if (optionGroup.childElementCount > 3) {
    for (let i = 0; i < rmvBtn.length; i++) {
      rmvBtn[i].classList.remove("is-hidden");
    }
  }
});

// Remove Entry
optionGroup.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("rmv-btn")) {
    e.target.parentElement.remove();
  }
  if (optionGroup.childElementCount < 4) {
    for (let i = 0; i < rmvBtn.length; i++) {
      rmvBtn[i].classList.add("is-hidden");
    }
  }
});

// Press Start
startBtn.addEventListener("click", (e) => {
  for (let i = 0; i < options.length; i++) {
    if (options[i].value == "") {
      showAlert(startBtn, "Start", "No empty fields, please.");
      return;
    }
  }

  for (let i = 0; i < options.length; i++) {
    optionList.push(new Entry(options[i].value));
  }

  for (let i = 0; i < optionList.length; i++) {
    for (let j = i + 1; j < optionList.length; j++) {
      const arr = [optionList[i], optionList[j]];
      decisionList.push(shuffle(arr));
    }
  }

  shuffle(decisionList);

  startView.classList.add("is-hidden");
  decisionView.classList.remove("is-hidden");

  option1.textContent = decisionList[0][0].name;
  option2.textContent = decisionList[0][1].name;
});

// Battle it out

option1.addEventListener("click", (e) => {
  optionList.find((entry) => entry.name == e.target.textContent).addPoint();
  nextDecision();
});

option2.addEventListener("click", (e) => {
  optionList.find((entry) => entry.name == e.target.textContent).addPoint();
  nextDecision();
});

// Start Over Button

restartBtn.addEventListener("click", (e) => {
  window.location.reload();
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
  const totalDecisions = (optionList.length ** 2 - optionList.length) / 2;
  const increment = 100 / totalDecisions;
  return Math.round((totalDecisions - decisionList.length) * increment);
};

const loadResults = () => {
  optionList.sort((a, b) => b.score - a.score);
  let i = 1;

  optionList.forEach((entry) => {
    const div = document.createElement("div");
    div.classList.add("result-line");

    const number = document.createElement("span");
    number.classList.add("result-number");
    number.textContent = i;
    div.appendChild(number);

    const item = document.createElement("div");
    item.classList.add("result-item");
    item.textContent = entry.name;
    div.appendChild(item);

    results.appendChild(div);
    i++;
  });
};

const nextDecision = () => {
  decisionList.shift();
  if (decisionList.length > 0) {
    option1.textContent = decisionList[0][0].name;
    option2.textContent = decisionList[0][1].name;
    progressText.textContent = calculateProgress();
    progressBar.value = calculateProgress();
  } else {
    decisionView.classList.add("is-hidden");
    resultsView.classList.remove("is-hidden");
    loadResults();
  }
};

const showAlert = (button, value, message) => {
  button.textContent = message;
  button.classList.add("btn-alerted");
  setTimeout(() => {
    button.textContent = value;
    button.classList.remove("btn-alerted");
  }, 3000);
};

const reset = () => {
  //reset
};
