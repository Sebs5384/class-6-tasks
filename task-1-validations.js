function validateFamilyMembers(members) {
  if (members === "0") {
    return "This field cannot have a value of 0";
  }
  if (!/^[1-9][0-9]*$/.test(members)) {
    return "This field should only contain numbers";
  }
  if (!/^.{1,2}$/.test(members)) {
    return "This field should only contain a maximum of 2 characters";
  }
  return "";
}

function validateMembersAge(members) {
  const errorObject = {};
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    if (member === 0) {
      errorObject[i] = "This field cannot have a value of 0";
    } else if (!/^[1-9][0-9]*$/.test(member)) {
      errorObject[i] = "This field should only contain numbers and cannot start with 0";
    } else if (!/^.{1,3}$/.test(member)) {
      errorObject[i] = "This field should only contain a maximum of 3 characters";
    } else {
      errorObject[i] = "";
    }
  }
  return errorObject;
}

function validateMembersQuantity(membersQuantity) {
  const membersQuantityError = validateFamilyMembers(membersQuantity);

  const quantityError = {
    "members-quantity": membersQuantityError,
  };
  const isSuccessful = handleMembersErrors(quantityError) === 0;
  if (isSuccessful) {
    createMembers(membersQuantity);
    displayButtons();
  }
  return false;
}

function validateMemberAge() {
  const $members = document.querySelectorAll(".created-members input");
  const members = parseMembers($members);
  const membersAgeError = validateMembersAge(members);

  const ageError = {
    members: membersAgeError,
  };
  const isSuccessful = handleAgeErrors(ageError) === 0;
  if (isSuccessful) {
    displayCalculatedResults(members);
  }
}
