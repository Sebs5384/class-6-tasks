const $form = document.querySelector("#form");

$form["quantity-submit"].onclick = function () {
  const membersQuantity = $form["members-quantity"].value;
  validateMembersQuantity(membersQuantity);

  return false;
};

$form["calculate-button"].onclick = function () {
  const $members = document.querySelectorAll(".created-members input");
  const members = getMembers($members);
  validateMemberAge(members);
};

$form["restart-form-button"].onclick = function () {
  const defaultMessage = {
    0: "Welcome dear user",
    1: "This is a small program that calculates your family oldest, youngest and average age !",
    2: "Entry the number of members your family have to begin",
  };

  hideElement("#calculation-controls", "className", "btn-toolbar gap-2 justify-content-center hidden");
  displayElement("#form-submit-buttons", "className", "btn-toolbar gap-2 justify-content-center");
  removeElements(".created-members", { 0: "" });
  updateElementText("#age-calculator-instructions div small", defaultMessage);
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
      displayElement("#form-submit-buttons", "className", "btn-toolbar gap-2 justify-content-center");
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

function displayElement(selector, attribute, value) {
  document.querySelector(selector)[attribute] = value;
}

function hideElement(selector, attribute, value) {
  document.querySelector(selector)[attribute] = value;
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
