function validateMembers(members) {
  const errorObject = {};
  members.forEach((member) => {
    if (member === 0) {
      errorObject.member = "This field cannot have a value of 0";
    } else if (!/^[1-9][0-9]*$/.test(member)) {
      errorObject.member = "This field should only contain numbers";
    } else if (!/^.{1,20}$/.test(member)) {
      errorObject.member = "This field should only contain a maximum of 20 characters";
    } else {
      errorObject.member = "";
    }
  });
  return errorObject;
}
