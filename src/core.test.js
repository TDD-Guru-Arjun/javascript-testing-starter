import {describe, it, expect } from "vitest"
import { calculateDiscount, getCoupons, validateUserInput } from "./core";

describe('core', () => {
    it('getCoupons', () => {
        const coupons = getCoupons();

        expect(coupons).toBeDefined();
        expect(coupons).toBeInstanceOf(Array);
        expect(coupons).toHaveLength(2);
        expect(coupons[0]).toHaveProperty('code');
        expect(coupons[0]).toHaveProperty('discount');

        expect(coupons[0].code).toEqual(expect.any(String));
        expect(coupons[0].discount).toEqual(expect.any(Number));

        expect(coupons[0].discount).toBeCloseTo(0.2, 1);
    });

    it('should return an array of coupons', () => {
        const coupons = getCoupons();

        expect(Array.isArray(coupons)).toBe(true); // or
        expect(Array.isArray(coupons)).toBeTruthy(); // or
        expect(coupons).toBeInstanceOf(Array);

        expect(coupons.length).toBeGreaterThan(0)
        expect(coupons).toEqual([
            { code: 'SAVE20NOW', discount: 0.2 },
            { code: 'DISCOUNT50OFF', discount: 0.5 },
        ])
    })

    it('should return an array of valid coupon codes', () => {
        const coupons = getCoupons();

        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string'); // or
            expect(coupon.code).toEqual(expect.any(String));
            expect(coupon.code).toBeTruthy();
        })
    })

    it('should return an array of valid discounts', () => {
        const coupons = getCoupons();

        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number'); // or
            expect(coupon.discount).toEqual(expect.any(Number));
            expect(coupon.discount).toBeGreaterThan(0);
            expect(coupon.discount).toBeLessThan(1);
        })
    })

    describe('calculateDiscount', () => {
        const errorMessage = /invalid/i;

        it('should return discounted price if given valid price', () => {
            expect(calculateDiscount(100, 'SAVE10')).toBe(90);
            expect(calculateDiscount(100, 'SAVE20')).toBe(80);
        })

        it('should return "Invalid price" if given invalid price', () => {
            // expect(calculateDiscount(-100, 'SAVE10')).toBe('Invalid price');
            expect(calculateDiscount(-100, 'SAVE10')).toMatch(errorMessage);
            expect(calculateDiscount('100', 'SAVE10')).toMatch(errorMessage);
        })

        it('should handle non-string discount code', () => {
            expect(calculateDiscount(100, undefined)).toMatch(errorMessage);
            expect(calculateDiscount(100, 10)).toMatch(errorMessage);
        })

        it('should handle invalid discount code', () => {
            expect(calculateDiscount(100, 'SAVE30')).toBe(100);
            expect(calculateDiscount(1000, 'SAVE40')).toBe(1000);
        })
    })

    describe('validateUserInput', () => {
        const invalidUsername = 'Invalid username';
        const invalidAge = 'Invalid age';
        const errorMessage = 'Invalid username, Invalid age'

        it('should return "Validation successful" if given valid input', () => {
            expect(validateUserInput('john', 20)).toBe('Validation successful');
        })

        it('should return "Invalid username" if given username is not string', () => {
            expect(validateUserInput(30, 20)).toBe(invalidUsername);
        })

        it('should return "Invalid username" if given username is less than 3 characters', () => {
            expect(validateUserInput('jo', 20)).toBe(invalidUsername);
        })

        it('should return "Invalid username" if given username is greater than 15 characters', () => {
            expect(validateUserInput('A'.repeat(30), 20)).toBe(invalidUsername);
        })

        it('should return "Invalid age" if given age is not number', () => {
            expect(validateUserInput('john', '20')).toBe(invalidAge);
        })

        it('should return "Invalid age" if given age is less than 18', () => {
            expect(validateUserInput('john', 10)).toBe(invalidAge);
        })

        it('should return "Invalid username, Invalid age" if given both invalid username and age', () => {
            expect(validateUserInput('jo', 10)).toBe(errorMessage);
            expect(validateUserInput(3, 2)).toBe(errorMessage);
        })
    });
});
