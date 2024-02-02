import {describe, vi, it, expect } from "vitest"
import { fizzBuzz, max } from "./intro"

describe('max', () => {
    it('should return the b if b > a', () => {
        const actualResult = max(1, 2)
        expect(actualResult).toBe(2)
    })

    it('should return the a if a > b', () => {
        const actualResult = max(10, 2)
        expect(actualResult).toBe(10)
    })

    it('should return the a or b if both are same', () => {
        const actualResult = max(3, 3)
        expect(actualResult).toBe(3)
    })
})

describe('fizzBuzz', () => {
    it('should return FizzBuzz if n is divisible by both 3 and 5', () => {
        const actualResult = fizzBuzz(15)
        expect(actualResult).toBe("FizzBuzz")
    })

    it('should return Fizz if n is divisible by 3', () => {
        const actualResult = fizzBuzz(6)
        expect(actualResult).toBe("Fizz")
    })

    it('should return Buzz if n is divisible by 5', () => {
        const actualResult = fizzBuzz(10)
        expect(actualResult).toBe("Buzz")
    })
})