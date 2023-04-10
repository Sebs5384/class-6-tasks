const $form = document.querySelector("#salary-calculator");

$form["button-add-member"].onclick = function () {
  createMember();
  displayCalculateButton();
};

$form["button-remove-member"].onclick = function () {
  removeMember();
};

$form["calculate-button"].onclick = function () {
  validateMemberSalary();
};

function createMember() {
  const $memberList = document.querySelectorAll(".created-members input");
  let number = $memberList.length + 1;
  const $input = document.createElement("input");
  $input.type = "number";
  $input.id = `member-${number}`;
  $input.name = "members";
  $input.className = "";
  $input.placeholder = `Entry member-${number} salary`;

  const $br = document.createElement("br");
  $br.id = `br-${number}`;

  const $label = document.createElement("label");
  $label.innerText = `Family member #${number}`;
  $label.id = `label-${number}`;

  const $strong = document.createElement("strong");
  $strong.innerText = "";
  $strong.id = `strong-${number}`;
  $strong.className = "";

  const $members = document.querySelector("#members");
  $members.appendChild($label);
  $members.appendChild($input);
  $members.appendChild($strong);
  $members.appendChild($br);
}

function removeMember() {
  const $errorMessage = document.querySelector("#display-error-message");
  const $memberList = document.querySelectorAll(".created-members input");
  let number = $memberList.length;
  const $member = $form.querySelector(`#member-${number}`);
  const $br = $form.querySelector(`#br-${number}`);
  const $label = $form.querySelector(`#label-${number}`);
  const $strong = $form.querySelector(`#strong-${number}`);

  $member.remove();
  $br.remove();
  $label.remove();
  $strong.remove();
  validateMemberSalary();

  if (number === 1) {
    hideCalculateButton();
    hideResults();
    $errorMessage.innerText = "";
  }
}

function handleSalaryError(errors) {
  const keys = Object.keys(errors);
  const $membersInput = $form.querySelectorAll(".created-members input");
  const $membersStrong = $form.querySelectorAll(".created-members strong");
  const $errorMessage = $form.querySelector("#display-error-message");
  let salaryError = 0;
  keys.forEach(function (key) {
    const input = errors[key];
    for (key in input) {
      if (input[key] !== "") {
        salaryError++;
        $membersInput[key].className = "error";
        $membersStrong[key].innerText = input[key];
      } else {
        $membersInput[key].className = "";
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
