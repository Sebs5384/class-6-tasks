function testValidateFamilyMembers() {
  console.assert(validateFamilyMembers("") === "This field can't be empty", "validateFamilyMembers has failed to check if the user's input is empty");
  console.assert(validateFamilyMembers("0") === "This field cannot have a value of 0 or be negative", "validateFamilyMembers has failed to check if the user's input is 0");
  console.assert(validateFamilyMembers("01") === "This field should only contain numbers and cannot start with 0", "validateFamilyMembers has failed to check if the user's input begins with 0");
  console.assert(validateFamilyMembers("Hello") === "This field doesn't accept non-numeric values", "validateFamilyMembers has failed to check if the user's input is not a number");
  console.assert(validateFamilyMembers("333") === "This field should only contain a maximum of 2 characters", "validateFamilyMembers has failed to check if the user's input has more than 3 characters");
  console.assert(validateFamilyMembers(1) === "", "validateFamilyMembers has failed to work as expected with a single integer");
  console.assert(validateFamilyMembers("1") === "", "validateFaimlyMembers has failed to work as expected with a single string");
}

function testValidateMembersAge() {
  console.assert(JSON.stringify(validateMembersAge(["", 10])) === JSON.stringify({ 0: "This field cannot be empty", 1: "" }), "validateMembersAge has failed to check if one of the members contains an empty value");
  console.assert(JSON.stringify(validateMembersAge([3.3, 20])) === JSON.stringify({ 0: "This field doesn't accept decimals", 1: "" }), "validateMembersAge has failed to check if the user's input contains a decimal number");
  console.assert(JSON.stringify(validateMembersAge([0, 30])) === JSON.stringify({ 0: "This field cannot have a value of 0 or be a negative number", 1: "" }), "validateMembersAge has failed to check if the user's input is equal to 0");
  console.assert(JSON.stringify(validateMembersAge(["01", 40])) === JSON.stringify({ 0: "This field should only contain numbers and cannot start with 0", 01: "" }), "validateMembersAge is not handling numbers that start with 0 correctly");
  console.assert(JSON.stringify(validateMembersAge(["Hello", 50])) === JSON.stringify({ 0: "This field doesn't accept non-numeric values", 01: "" }), "validateMembersAge is not handling non-numeric values correctly");
  console.assert(JSON.stringify(validateMembersAge([3333, 60])) === JSON.stringify({ 0: "This field should only contain a maximum of 3 characters", 01: "" }), "validateMembersAge is not handling numeric values with 4 digits correctly");
  console.assert(JSON.stringify(validateMembersAge([10, 20, 30, 40, 50, 60])) === JSON.stringify({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" }), "validateMembersAge is not working properly");
}

function testFindMaximumNumber() {
  console.assert(findMaximumNumber([1, 3, 4]) === 4, "findMaximumNumber is not working as intended");
  console.assert(findMaximumNumber([-1, -3, -5]) === -1, "findMaximumNumber is not handling negative numbers correctly");
  console.assert(findMaximumNumber([3, 4, 5.5]) === 5.5, "findMaximumNumber is not handling decimal numbers correctly");
}

function testFindMinimumNumber() {
  console.assert(findMinimumNumber([1, 6, 7]) === 1, "findMaximumNumber is not working as intended");
  console.assert(findMinimumNumber([-1, 3, 5]) === -1, "findMinimumNumber is not handling negative numbers correctly");
  console.assert(findMinimumNumber([3.3, 4, 5]) === 3.3, "findMinimumNumber is not handling negative numbers correctly");
}

function testFindAverageNumber() {
  console.assert(findAverageNumber([10, 10, 10]) === 10, "findAverageNumber is not working as intended");
  console.assert(findAverageNumber([-10, -10, -10]) === -10, "findAverage is not handling negative numbers correctly");
  console.assert(findAverageNumber([3.3, 4.4, 5.5]) === 4.4, "findAverageNumber is not handling decimal numbers correctly");
}

function testGetMembers() {
  const positiveStringObject = [{ value: "3" }, { value: "4" }, { value: "5" }];
  const negativeStringObject = [{ value: "-1" }, { value: "-2" }, { value: "-3" }];
  const decimalStringObject = [{ value: "3.3" }, { value: "4.4" }, { value: "5.5" }];
  console.assert(JSON.stringify(getMembers(positiveStringObject)) === JSON.stringify([3, 4, 5]), "getMembers is not working as intended");
  console.assert(JSON.stringify(getMembers(negativeStringObject)) === JSON.stringify([-1, -2, -3]), "getMembers is not handling negative objects correctly");
  console.assert(JSON.stringify(getMembers(decimalStringObject)) === JSON.stringify([3.3, 4.4, 5.5]), "getMembers is not handling decimal objects correctly");
}

testValidateFamilyMembers();
testValidateMembersAge();
testFindMaximumNumber();
testFindMinimumNumber();
testFindAverageNumber();
testGetMembers();
