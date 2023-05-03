const $form = document.querySelector("#form");

$form["quantity-submit"].onclick = function () {
  const existingMembers = $form.members;
  if (!existingMembers) {
    const membersQuantity = $form["members-quantity"].value;
    validateMembersQuantity(membersQuantity);
  }

  return false;
};

$form["calculate-button"].onclick = function () {
  const $members = document.querySelectorAll(".created-members input");
  const members = getMembers($members);
  validateMemberAge(members);
};

$form["reset-form-button"].onclick = function () {
  hideButtons();
  removeMembers();
  hideResults();
};

function createMembers(quantity) {
  const $container = document.createElement("div");
  $container.className = "created-members row justify-content-center";

  for (let i = 0; i < quantity; i++) {
    const $div = document.createElement("div");
    $div.className = "form-floating col-5";

    const $input = document.createElement("input");
    $input.type = "number";
    $input.name = "members";
    $input.className = "form-control";
    $input.placeholder = "members";

    const $label = document.createElement("label");
    $label.innerText = `Family member number #${i + 1}`;
    $label.className = "form-label text-center";

    const $error = document.createElement("strong");
    $error.innerText = "";
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
  const $errors = document.querySelector("#errors");
  $errors.innerText = "";

  keys.forEach(function (key) {
    const error = errors[key];
    if (error) {
      membersErrorQuantity++;
      $form[key].className = "form-control error";
      const $error = document.createElement("li");
      $error.innerText = error;
      $errors.appendChild($error);
    } else {
      $form[key].className = "form-control";
    }
  });
  return membersErrorQuantity;
}

function handleAgeErrors(errors) {
  const keys = Object.keys(errors);
  const $membersInput = document.querySelectorAll(".created-members input");
  const $membersStrong = document.querySelectorAll(".created-members strong");

  let membersAgeError = 0;
  keys.forEach(function (key) {
    const input = errors[key];
    for (key in input) {
      if (input[key] !== "") {
        membersAgeError++;
        $membersInput[key].className = "error";
        $membersStrong[key].innerText = input[key];
      } else {
        $membersInput[key].className = "";
        $membersStrong[key].innerText = "";
      }
    }
  });
  return membersAgeError;
}

function displayCalculatedResults($members) {
  const $results = document.querySelector("#display-results");
  $results.className = "";
  $results.innerText = `The youngest member in your family is ${findMinimumNumber($members)} years old while the oldest is ${findMaximumNumber($members)} and the average age of the whole family is ${findAverageNumber($members)}`;
}

function displayButtons() {
  document.querySelector("#buttons").className = "";
}

function hideButtons() {
  document.querySelector("#buttons").className = "hidden";
}

function hideResults() {
  document.querySelector("#display-results").className = "hidden";
}

function removeMembers() {
  const $createdMembers = document.querySelector(".created-members");
  $createdMembers.remove();
}
