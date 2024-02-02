import {describe, vi, it, expect } from "vitest"
import { fizzBuzz, max } from "./intro"

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
})
