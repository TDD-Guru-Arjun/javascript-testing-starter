// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) {
    return 'FizzBuzz';
  }
  if (n % 3 === 0) {
    return 'Fizz';
  }
  if (n % 5 === 0) {
    return 'Buzz';
  }
  return n.toString();
}

export function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return NaN;
  }
  return numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
}

export function factorial(n) {
  if (n < 0) {
    return NaN;
  }
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
