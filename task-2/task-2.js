const $form = document.querySelector("#salary-calculator");

$form["button-add-member"].onclick = function () {
  createMember();
  displayCalculateButton();
};

$form["button-remove-member"].onclick = function () {
  removeMember();
};

$form["calculate-button"].onclick = function () {
  const $members = $form.querySelectorAll(".input-list");
  const numbers = getNumbers($members);
  displaySalary("highest", findMaximumNumber(numbers));
  displaySalary("lowest", findMinimumNumber(numbers));
  displaySalary("average", findAverage(numbers));
  displaySalary("monthly", findMonthlyAverage(numbers).toFixed(1));

  displayResults();
};

function createMember() {
  const $memberList = document.querySelectorAll(".input-list");
  let number = $memberList.length + 1;
  const $input = document.createElement("input");
  $input.className = "input-list";
  $input.type = "number";
  $input.id = `member-${number}`;
  $input.placeholder = `Entry member-${number} salary`;

  const $br = document.createElement("br");
  $br.id = `br-${number}`;

  const $label = document.createElement("label");
  $label.innerText = `Family member #${number}`;
  $label.id = `label-${number}`;

  const $members = document.querySelector("#members");
  $members.appendChild($label);
  $members.appendChild($input);
  $members.appendChild($br);
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
    hideCalculateButton();
  }
}

function displaySalary(rate, value) {
  $form.querySelector(`#${rate}-salary`).innerText = value;
}

function hideResults() {
  $form.querySelector("#evaluate-results").className = "hidden";
}

function displayResults() {
  $form.querySelector("#evaluate-results").className = "";
}

function hideCalculateButton() {
  $form["calculate-button"].className = "hidden";
}

function displayCalculateButton() {
  $form["calculate-button"].className = "";
}
