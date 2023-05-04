const $form = document.querySelector("#form");

$form["quantity-submit"].onclick = function () {
  const existingMembers = $form.members;
  const membersQuantity = $form["members-quantity"].value;
  const nextStep = {
    0: "The next step is to",
    1: "fill the fields below in order to calculate",
    2: "the eldest, youngest and average in your family",
  };
  hideElements("#form-submit-buttons", "className", "btn-toolbar gap-2 justify-content-center hidden");
  updateElementText("#age-calculator-instructions div small", nextStep);
  validateMembersQuantity(membersQuantity);

  return false;
};

$form["calculate-button"].onclick = function () {
  const $members = document.querySelectorAll(".created-members input");
  const members = getMembers($members);
  validateMemberAge(members);
};

$form["restart-form-button"].onclick = function () {
  hideElements("#calculation-controls", "className", "btn-toolbar gap-2 justify-content-center hidden");
  displayElements("#form-submit-buttons", "className", "btn-toolbar gap-2 justify-content-center");
  removeElements(".created-members", { 0: "" });
};

function createMembers(quantity) {
  const $container = document.createElement("div");
  $container.className = "created-members row justify-content-center";

  for (let i = 0; i < quantity; i++) {
    const $div = document.createElement("div");
    $div.className = "form-floating col-6";

    const $input = document.createElement("input");
    $input.type = "number";
    $input.name = "members";
    $input.className = "form-control";
    $input.placeholder = "members";

    const $label = document.createElement("label");
    $label.innerText = `Family member number #${i + 1}`;
    $label.className = "form-label text-center";

    const $error = document.createElement("small");
    $error.innerText = "";
    $error.style = "font-size: 10px";
    $error.id = "error-" + [i + 1];

    const $br = document.createElement("br");

    $div.appendChild($input);
    $div.appendChild($label);
    $div.appendChild($error);
    $div.appendChild($br);
    $container.appendChild($div);

    const $membersList = document.querySelector("#member-list");
    $membersList.appendChild($container);
  }
}

function handleMembersError(errors) {
  const keys = Object.keys(errors);
  let membersErrorQuantity = 0;
  const $errors = document.querySelector("#error");
  $errors.innerText = "";

  keys.forEach(function (key) {
    const error = errors[key];
    if (error) {
      membersErrorQuantity++;
      $form[key].className = "form-control error";
      const $error = document.createElement("li");
      $error.innerText = error;
      $errors.appendChild($error);
      displayElements("#form-submit-buttons", "className", "btn-toolbar gap-2 justify-content-center");
    } else {
      $form[key].className = "form-control";
    }
  });
  return membersErrorQuantity;
}

function handleAgeErrors(errors) {
  const keys = Object.keys(errors);
  const $membersInput = document.querySelectorAll(".created-members input");
  const $membersStrong = document.querySelectorAll(".created-members small");

  let membersAgeError = 0;
  keys.forEach(function (key) {
    const input = errors[key];
    for (key in input) {
      if (input[key] !== "") {
        membersAgeError++;
        $membersInput[key].className = "form-control error";
        $membersStrong[key].innerText = input[key];
      } else {
        $membersInput[key].className = "form-control";
        $membersStrong[key].innerText = "";
      }
    }
  });
  return membersAgeError;
}

function displayCalculationResults($members) {
  const $results = document.querySelector("#calculation-results");
  $results.className = "";
  $results.innerText = `The youngest member in your family is ${findMinimumNumber($members)} years old while the oldest is ${findMaximumNumber($members)} and the average age of the whole family is ${findAverageNumber($members)}`;
}

function displayElements(selector, property, value) {
  document.querySelector(`${selector}`)[`${property}`] = value;
}

function hideElements(selector, property, value) {
  document.querySelector(selector)[property] = value;
}

function removeElements(selector, elements) {
  const $elements = document.querySelectorAll(selector);
  const indices = Object.keys(elements);
  indices.forEach((index) => {
    $elements[index].remove();
  });
}

function updateElementText(selector, texts) {
  const $selectedElement = document.querySelectorAll(selector);
  const indices = Object.keys(texts);
  indices.forEach((index) => {
    $selectedElement[index].innerText = texts[index];
  });
}
