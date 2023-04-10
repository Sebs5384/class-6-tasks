function validateFamilyMembers(members) {
  if (members === "") {
    return "This field can't be empty";
  }
  if (members <= 0) {
    return "This field cannot have a value of 0 or be negative";
  }
  if (isNaN(members)) {
    return "This field doesn't accept non-numeric values";
  }
  if (members % 1 !== 0) {
    return "This field doesn't accept decimals";
  }
  if (!/^[1-9][0-9]*$/.test(members)) {
    return "This field should only contain numbers and cannot start with 0";
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
    if (member === "") {
      errorObject[i] = "This field cannot be empty";
    } else if (isNaN(member)) {
      errorObject[i] = "This field doesn't accept non-numeric values";
    } else if (member % 1 !== 0) {
      errorObject[i] = "This field doesn't accept decimals";
    } else if (member <= 0) {
      errorObject[i] = "This field cannot have a value of 0 or be a negative number";
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
  const isSuccessful = handleMembersError(quantityError) === 0;
  if (isSuccessful) {
    createMembers(membersQuantity);
    displayButtons();
  }
  return false;
}

function validateMemberAge(membersAge) {
  const membersAgeError = validateMembersAge(membersAge);

  const ageError = {
    members: membersAgeError,
  };
  const isSuccessful = handleAgeErrors(ageError) === 0;
  if (isSuccessful) {
    displayCalculatedResults(membersAge);
  }
}
