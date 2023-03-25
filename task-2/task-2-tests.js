function testValidateMemberSalary() {
  console.assert(JSON.stringify(validateMembersSalary(["", 10])) === JSON.stringify({ 0: "This field cannot have a value of 0 or be empty", 1: "" }), "validateMembersSalary is not handling empty/0 values correctly");
  console.assert(JSON.stringify(validateMembersSalary([3.3, 20])) === JSON.stringify({ 0: "This field cannot have decimal values", 1: "" }), "validateMembersSalary is not handling decimal values correctly");
  console.assert(JSON.stringify(validateMembersSalary(["pepe", 30]) === JSON.stringify({ 0: "This field should only contain numbers", 1: "" })), "validateMembersSalary is not handling non-numeric values correctly");
  console.assert(JSON.stringify(validateMembersSalary([12345678, 40])) === JSON.stringify({ 0: "This field should only contain a maximum of 7 characters", 1: "" }), "validateMembersSalary is not handling values with more than 7 characters correctly");
  console.assert(JSON.stringify(validateMembersSalary([10, 20, 30, 40, 50])) === JSON.stringify({ 0: "", 1: "", 2: "", 3: "", 4: "" }), "validateMembersSalary is not working as expected");
}

function testFindMaximumNumber() {
  console.assert(findMaximumNumber([1, 2, 5, 4]) === 5, "findMaximumNumber is not working as expected");
  console.assert(findMaximumNumber([-1, -4, -3]) === -1, "findMaximumNumber is not handling negative numbers as expected");
  console.assert(findMaximumNumber([2.2, 3.3, 4.4]) === 4.4, "findMaximumNumber is not handling decimal numbers correctly");
}

function testFindMinimumNumber() {
  console.assert(findMinimumNumber([1, 2, 3, 4, 5]) === 1, "findMinimumNumber is not working as expected");
  console.assert(findMinimumNumber([-1, -3, -5]) === -5, "findMinimumNumber is not handling negative numbers correctly");
  console.assert(findMinimumNumber([1.3, 3.3, 5.5]) === 1.3, "findMinimumNumber is not handling decimal numbers correctly");
}

function testFindAverageNumber() {
  console.assert(findAverageNumber([10, 10, 10]) === 10, "findAverageNumber is not working as expected");
  console.assert(findAverageNumber([-10, -10, -10]) === -10, "findAverageNumber is not handling negative numbers correctly");
  console.assert(findAverageNumber([1.1, 2.2, 3.3]) === 2.2, "findAverageNumber is not handling decimal numbers correctly");
}

function testFindMonthlyAverage() {
  console.assert(findMonthlyAverage([3.3, 10, 10]) === 0.65, "findMonthlyAverage is not working as inteded");
  console.assert(findMonthlyAverage([-3.3, -10, -10]) === -0.65, "findMonthlyAverage is not handling negative values correctly");
  console.assert(findMonthlyAverage([3.3, 4.4]) === 0.325, "findMonthlyAverage is not handling decimal values correctly");
}

function testGetNumbers() {
  const positiveStringObject = [{ value: "10" }, { value: "20" }, { value: "30" }];
  const negativeStringObject = [{ value: "-10" }, { value: "-20" }, { value: "-30" }];
  const decimalStringObject = [{ value: "3.3" }, { value: "4.4" }, { value: "5.5" }];

  console.assert(JSON.stringify(getNumbers(positiveStringObject)) === JSON.stringify([10, 20, 30]), "getNumbers is not working as expected");
  console.assert(JSON.stringify(getNumbers(negativeStringObject)) === JSON.stringify([-10, -20, -30]), "getNumbers is not handling negative values correctly");
  console.assert(JSON.stringify(getNumbers(decimalStringObject)) === JSON.stringify([3.3, 4.4, 5.5]), "getNumber is not handling decimal values correctly");
}

testValidateMemberSalary();
testFindMaximumNumber();
testFindMinimumNumber();
testFindAverageNumber();
testFindMonthlyAverage();
testGetNumbers();
