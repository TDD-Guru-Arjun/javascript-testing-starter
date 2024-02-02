import {describe, it, expect } from "vitest"
import { calculateAverage, factorial, fizzBuzz, max } from "./intro"

describe('max', () => {
    it('should return the b if b > a', () => {
        expect(max(1, 2)).toBe(2)
    })

    it('should return the a if a > b', () => {
        expect(max(10, 2)).toBe(10)
    })

    it('should return the a or b if both are same', () => {
        expect(max(3, 3)).toBe(3)
    })
})

describe('fizzBuzz', () => {
    it('should return FizzBuzz if n is divisible by both 3 and 5', () => {
        expect(fizzBuzz(15)).toBe("FizzBuzz")
    })

    it('should return Fizz if n is divisible by 3', () => {
        expect(fizzBuzz(6)).toBe("Fizz")
    })

    it('should return Buzz if n is divisible by 5', () => {
        expect(fizzBuzz(10)).toBe("Buzz")
    })

    it('should return stringyfied n if n is not divisible by 3 or 5', () => {
        const n = 7
        expect(fizzBuzz(n)).toBe(n.toString())
    })
})

describe('calculateAverage', () => {
    it('should return NaN if arg is an empty array', () => {
        expect(calculateAverage([])).toBe(NaN)
    });

    it('should return NaN if arg is not an array', () => {
        expect(calculateAverage(1)).toBe(NaN)
    });

    it('should return the average of the numbers in the array', () => {
        expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3)
    });

    it('should return the number if the array has only one number', () => {
        expect(calculateAverage([1])).toBe(1)
    });
 })

 describe('factorial', () => {
    it('should return 1 if the arg is 0', () => {
        expect(factorial(0)).toBe(1);
    });

    it('should return 1 if the arg is 1', () => {
        expect(factorial(1)).toBe(1);
    });

    it('should return the factorial for the given the arg', () => {
        expect(factorial(3)).toBe(6);
        expect(factorial(6)).toBe(720);
    });

    it('should return NaN if the given the arg < 0', () => {
        expect(factorial(-2)).toBe(NaN);
    });
  })
