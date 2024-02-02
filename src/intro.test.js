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

  describe('matchers examples', () => {
    it('numbers', () => {
        expect(1).toBe(1)
        expect(1).not.toBe(2)
        expect(1).toBeGreaterThan(0)
        expect(1).toBeLessThan(2)
        expect(1).toBeGreaterThanOrEqual(1)
        expect(1).toBeLessThanOrEqual(1)

        expect(1).toEqual(expect.any(Number))
        expect(1).not.toEqual(expect.any(String))

        expect(1).toEqual(expect.anything())
        expect(undefined).not.toEqual(expect.anything())
    })

    it('floats', () => {
        expect(2.5).toBeCloseTo(2.2, 0)
        expect(0.1 + 0.2).toBeCloseTo(0.3, 5)

        expect(2.5).not.toBeCloseTo(2.2, 1)
    })

    it('strings', () => {
        expect('hello vitest').toMatch('hello')
        expect('hello').not.toMatch('world')

        expect('hello').toContain('h')
        expect('hello').not.toContain('w')

        expect('hello').toHaveLength(5)
        expect('hello').not.toHaveLength(4)

        expect('hello').toEqual('hello')
        expect('hello').not.toEqual('world')

        expect('hello').toEqual(expect.stringContaining('hell'))
        expect('hello').not.toEqual(expect.stringContaining('world'))

        expect('hello').toEqual(expect.stringMatching('hell'))
        expect('hello').not.toEqual(expect.stringMatching('world'))

        expect('hello').toEqual(expect.stringMatching(/hell/))
        expect('hello').not.toEqual(expect.stringMatching(/world/))

        expect('hello').toEqual(expect.stringMatching(new RegExp('hell')))
        expect('hello').not.toEqual(expect.stringMatching(new RegExp('world')))
    })

    it('arrays', () => {
        expect([1, 2, 3]).toContain(2)
        expect([1, 2, 3]).not.toContain(4)

        expect([1, 2, 3]).toHaveLength(3)
        expect([1, 2, 3]).not.toHaveLength(2)

        expect([1, 2, 3]).toEqual([1, 2, 3])
        expect([1, 2, 3]).not.toEqual([1, 2, 4])

        expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 2]))
        expect([1, 2, 3]).not.toEqual(expect.arrayContaining([1, 4]))
    })

    it('objects', () => {
        expect({a: 1}).toEqual({a: 1})
        expect({a: 1}).not.toEqual({a: 2})

        expect({a: 1, b: 2}).toMatchObject({a: 1})
        expect({a: 1, b: 2}).not.toMatchObject({c: 2})

        expect({a: 1, b: 2}).toHaveProperty('a')
        expect({a: 1, b: 2}).not.toHaveProperty('c')

        expect({a: 1, b: 2}).toEqual(expect.objectContaining({a: 1}))
        expect({a: 1, b: 2}).not.toEqual(expect.objectContaining({c: 2}))
    })
   })