const $form = document.querySelector("#salary-calculator");

$form["button-add-member"].onclick = function () {
  createMember();
  displayCalculateButton();

  return false;
};

$form["button-remove-member"].onclick = function () {
  removeMember();

  return false;
};

$form["calculate-button"].onclick = function () {
  validateMemberSalary();

  return false;
};

function createMember() {
  const $memberList = document.querySelectorAll("#member-list input");
  let number = $memberList.length + 1;

  const $div = document.createElement("div");
  $div.className = "form-floating col-4 gy-4";

  const $input = document.createElement("input");
  $input.type = "number";
  $input.id = `member-${number}`;
  $input.name = "members";
  $input.className = "form-control";
  $input.placeholder = "member";

  const $label = document.createElement("label");
  $label.innerText = `Member #${number}`;
  $label.id = `label-${number}`;
  $label.className = "form-label text-center";

  const $strong = document.createElement("strong");
  $strong.innerText = "";
  $strong.id = `strong-${number}`;
  $strong.className = "";

  $div.appendChild($input);
  $div.appendChild($label);
  $div.appendChild($strong);

  const $members = document.querySelector("#member-list");
  $members.appendChild($div);
}

function removeMember() {
  const $errorMessage = document.querySelector("#display-error-message");
  const $memberList = document.querySelectorAll("#member-list input");
  let number = $memberList.length;
  const $member = $form.querySelector(`#member-${number}`);
  const $label = $form.querySelector(`#label-${number}`);
  const $strong = $form.querySelector(`#strong-${number}`);

  $member.remove();
  $label.remove();
  $strong.remove();

  if (number === 1) {
    hideCalculateButton();
    hideResults();
    $errorMessage.innerText = "";
  }
}

function handleSalaryError(errors) {
  const keys = Object.keys(errors);
  const $membersInput = $form.querySelectorAll("#member-list input");
  const $membersStrong = $form.querySelectorAll("#member-list strong");
  const $errorMessage = $form.querySelector("#display-error-message");
  let salaryError = 0;

  keys.forEach(function (key) {
    const input = errors[key];
    for (key in input) {
      if (input[key] !== "") {
        salaryError++;
        $membersInput[key].className = "form-control error";
        $membersStrong[key].innerText = input[key];
      } else {
        $membersInput[key].className = "form-control";
        $membersStrong[key].innerText = "";
        $errorMessage.innerText = "";
      }
    }
  });
  return salaryError;
}

function displaySalary(rate, value) {
  $form.querySelector(`#${rate}-salary`).innerText = value;
}

function hideResults() {
  $form.querySelector("#salary-results").className = "hidden";
}

function displaySalaryResults(salary) {
  $form.querySelector("#salary-results").className = "col-10 gy-2 alert alert-primary";
  displaySalary("highest", findMaximumNumber(salary));
  displaySalary("lowest", findMinimumNumber(salary));
  displaySalary("average", findAverageNumber(salary).toFixed(1));
  displaySalary("monthly", findMonthlyAverage(salary).toFixed(1));
}

function hideCalculateButton() {
  $form["calculate-button"].className = "hidden";
}

function displayCalculateButton() {
  $form["calculate-button"].className = "btn btn-primary gy-2 col-auto";
}
