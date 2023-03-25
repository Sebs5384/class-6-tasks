function validateMembersSalary(members) {
  const errorObject = {};
  members.forEach((member, i) => {
    if (member <= 0) {
      errorObject[i] = "This field cannot have a value of 0 or be empty";
    } else if (member % 1 !== 0) {
      errorObject[i] = "This field cannot have decimal values";
    } else if (!/^[1-9][0-9]*$/.test(member)) {
      errorObject[i] = "This field should only contain numbers";
    } else if (!/^.{1,7}$/.test(member)) {
      errorObject[i] = "This field should only contain a maximum of 7 characters";
    } else {
      errorObject[i] = "";
    }
  });
  return errorObject;
}

function validateMemberSalary() {
  const $members = $form.querySelectorAll(".created-members input");
  const $salary = getNumbers($members);
  const membersSalaryError = validateMembersSalary($salary);
  const $errorMessage = document.querySelector("#display-error-message");

  const salaryError = {
    members: membersSalaryError,
  };

  const isSuccessful = handleSalaryError(salaryError) === 0;
  if (isSuccessful) {
    displaySalary("highest", findMaximumNumber($salary));
    displaySalary("lowest", findMinimumNumber($salary));
    displaySalary("average", findAverageNumber($salary).toFixed(1));
    displaySalary("monthly", findMonthlyAverage($salary).toFixed(1));

    displayResults();
  } else {
    const $errorList = $form.members;
    const errors = [];
    for (let i = 0; i < $errorList.length; i++) {
      if ($errorList[i].className !== "") {
        errors.push($errorList[i].id);
      }
    }
    $errorMessage.innerText = `There's an invalid value at ${errors}`;
  }
}
