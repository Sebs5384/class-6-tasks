const $form = document.querySelector("#salary-calculator");

document.querySelector("#button-add-member").onclick = function () {
  createMember();
  createCalculateButton();
};

document.querySelector("#button-remove-member").onclick = function () {
  removeMember();
};

document.querySelector("#calculate-button").onclick = function () {
  const $salaries = $form.querySelectorAll(".input-list");
  const salaries = getNumbers($salaries);
  displaySalaryResults(salaries);
};

function createMember() {
  const $memberList = document.querySelectorAll(".input-list");
  let number = $memberList.length + 1;
  const $input = document.createElement("input");
  $input.className = "input-list";
  $input.type = "number";
  $input.name = `member-${number}`;
  $input.placeholder = `Entry member-${number} salary`;

  const $br = document.createElement("br");
  $br.id = `br-${number}`;

  const $label = document.createElement("label");
  $label.innerText = `Family member #${number}`;
  $label.id = `label-${number}`;

  const $member = document.querySelector("#members");
  $member.appendChild($label);
  $member.appendChild($input);
  $member.appendChild($br);
}

function removeMember() {
  const $memberList = document.querySelectorAll(".input-list");
  let number = $memberList.length;
  const $member = document.querySelector(`#member-${number}`);
  const $br = document.querySelector(`#br-${number}`);
  const $label = document.querySelector(`#label-${number}`);

  $label.remove();
  $member.remove();
  $br.remove();

  if (number === 1) {
    removeCalculateButton();
  }
}

function removeCalculateButton() {
  const $calculateButton = document.querySelector("#calculate-salary-button");
  $calculateButton.remove();
}

function createCalculateButton() {
  if (!document.querySelector("#calculate-salary-button")) {
    const $calculateButton = document.createElement("button");
    $calculateButton.innerText = "Calculate";
    $calculateButton.id = "calculate-salary-button";

    const $button = document.querySelector("#calculate-button");
    $button.appendChild($calculateButton);
  }
}

function displaySalaryResults(salary) {
  const $results = document.querySelector("#salary-results");
  $results.innerText = `The highest salary is ${findMaximumNumber(salary)}, the lowest is ${findMinimumNumber(salary)} the average is ${findAverage(salary).toFixed(1)} and the monthly average is ${findMonthlyAverage(salary).toFixed(1)}`;
}
