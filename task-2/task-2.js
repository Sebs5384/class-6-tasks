document.querySelector("#button-add-member").onclick = function () {
  addNewMember();
  createCalculateButton();
};

document.querySelector("#button-remove-member").onclick = function () {
  removeMember();
};

document.querySelector("#calculate-button").onclick = function () {
  salaryResults();
};

function addNewMember() {
  createMember();
}

function salaryResults() {
  calculateResults();
}

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

function calculateResults() {
  const $salaryList = document.querySelectorAll(".input-list");
  const $results = document.querySelector("#salary-results");

  let highestSalary = Number($salaryList[0].value);
  let lowestSalary = Number($salaryList[0].value);
  let salarySum = 0;
  let existingMembers = 0;
  for (let i = 0; i < $salaryList.length; i++) {
    if ($salaryList[i].value !== "") {
      let salary = Number($salaryList[i].value);

      if (salary < lowestSalary) {
        lowestSalary = salary;
      } else if (salary > highestSalary) {
        highestSalary = salary;
      }
      salarySum += salary;
      existingMembers++;

      const average = salarySum / existingMembers;
      const monthlyAverage = average / 12;
      $results.innerText = `The highest salary is ${highestSalary}, the lowest is ${lowestSalary} the anual average is ${average.toFixed(1)} and the monthly average is ${monthlyAverage.toFixed(2)}`;
    } else if (existingMembers === 0) {
      $results.innerText = `Introduce valid numbers`;
    }
  }
}

