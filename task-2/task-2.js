const $form = document.querySelector("#salary-calculator");

$form["button-add-member"].onclick = function () {
  createMember();
  displayElement('[name="calculate-button"]', "className", "btn btn-primary gy-2 col-auto");

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

  const $container = document.createElement("div");
  $container.className = "form-floating col-4 gy-4";
  $container.id = `div-${number}`;

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

  const $small = document.createElement("small");
  $small.innerText = "";
  $small.className = "";
  $small.style = "font-size: 10px";

  $container.appendChild($input);
  $container.appendChild($label);
  $container.appendChild($small);

  const $members = document.querySelector("#member-list");
  $members.appendChild($container);
}

function removeMember() {
  const $memberList = document.querySelectorAll("#member-list div");
  let number = $memberList.length;
  const $container = $form.querySelector(`#div-${number}`);
  $container.remove();

  if (number === 1) {
    hideElement("calculate-button", "className", "hidden");
    hideElement("#display-error-message", "innerText", "");
  }
}

function handleSalaryError(errors) {
  const keys = Object.keys(errors);
  const $membersInput = $form.querySelectorAll("#member-list input");
  const $membersSmall = $form.querySelectorAll("#member-list small");
  let salaryError = 0;

  keys.forEach(function (key) {
    const input = errors[key];
    for (key in input) {
      if (input[key] !== "") {
        salaryError++;
        $membersInput[key].className = "form-control error";
        $membersSmall[key].innerText = input[key];
      } else {
        $membersInput[key].className = "form-control";
        $membersSmall[key].innerText = "";
      }
    }
  });
  return salaryError;
}

function hideElement(selector, attribute, value) {
  $form.querySelector(selector).className = value;
}

function displayElement(selector, attribute, value) {
  $form.querySelector(selector)[attribute] = value;
}

function displaySalaryResults(salary) {
  $form.querySelector("#salary-results").className = "col-10 gy-2 alert alert-primary";
  displayElement("#highest-salary", "innerText", findMaximumNumber(salary));
  displayElement("#lowest-salary", "innerText", findMinimumNumber(salary));
  displayElement("#average-salary", "innerText", findAverageNumber(salary).toFixed(1));
  displayElement("#monthly-salary", "innerText", findMonthlyAverage(salary).toFixed(1));
}
