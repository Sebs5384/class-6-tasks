function findMaximumNumber(number) {
  let maximumNumber = number[0];
  for (let i = 0; i < number.length; i++) {
    const $number = Number(number[i]);
    if ($number > maximumNumber) {
      maximumNumber = $number;
    }
  }
  return maximumNumber;
}

function findMinimumNumber(number) {
  let minimumNumber = number[0];
  for (let i = 0; i < number.length; i++) {
    const $number = number[i];
    if ($number > number[i]) {
      minimumNumber = $number;
    }
  }
  return minimumNumber;
}

function findAverageNumber(number) {
  let totalNumbers = 0;
  for (let i = 0; i < number.length; i++) {
    const $numbers = number[i];
    totalNumbers += $numbers;
  }
  const average = totalNumbers / number.length;
  return parseFloat(average.toFixed(1));
}

function parseMembers(members) {
  let validMembers = [];
  members.forEach((member) => {
    const parsedMembers = parseInt(member.value);
    validMembers.push(parsedMembers);
  });
  return validMembers;
}
