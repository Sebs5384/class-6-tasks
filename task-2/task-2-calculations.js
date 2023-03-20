function findMaximumNumber(numbers) {
  let maximumNumber = numbers[0];
  numbers.forEach((number) => {
    const $number = number;
    if ($number > maximumNumber) {
      maximumNumber = $number;
    }
  });
  return maximumNumber;
}

function findMinimumNumber(numbers) {
  let minimumNumber = numbers[0];
  numbers.forEach((number) => {
    const $number = number;
    if ($number < minimumNumber) {
      minimumNumber = $number;
    }
  });
  return minimumNumber;
}

function findAverage(numbers) {
  let totalNumbers = 0;
  numbers.forEach((number) => {
    let $number = number;
    totalNumbers += $number;
  });
  const average = totalNumbers / numbers.length;
  return average;
}

function findMonthlyAverage(numbers) {
  const average = findAverage(numbers);
  return average / 12;
}

function getNumbers(numbers) {
  let validNumbers = [];
  numbers.forEach((number) => {
    const parsedNumbers = Number(number.value);
    validNumbers.push(parsedNumbers);
  });
  return validNumbers;
}
