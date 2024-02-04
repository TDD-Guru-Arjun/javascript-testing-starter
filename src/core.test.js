import {describe, it, expect } from "vitest"
import { calculateDiscount, canDrive, getCoupons, isPriceInRange, isValidUsername, validateUserInput } from "./core";

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
            expect(validateUserInput('jane', 10)).toBe(invalidAge);
        })

        it('should return "Invalid age" if given age is greater than 110', () => {
            expect(validateUserInput('jane', 120)).toBe(invalidAge);
        })

        it('should return "Invalid username, Invalid age" if given both invalid username and age', () => {
            expect(validateUserInput('jo', 10)).toBe(errorMessage);
            expect(validateUserInput(3, 2)).toBe(errorMessage);
        })
    });

    describe('isPriceInRange', () => {
        it('should return true if price is in range', () => {
            expect(isPriceInRange(100, 50, 150)).toBe(true);
        })

        it('should return false if price is not in range', () => {
            expect(isPriceInRange(100, 150, 200)).toBe(false);
            expect(isPriceInRange(300, 150, 200)).toBe(false);
        })

        it('should return true if price is equal to min', () => {
            expect(isPriceInRange(100, 100, 200)).toBe(true);
        })

        it('should return true if price is equal to max', () => {
            expect(isPriceInRange(200, 100, 200)).toBe(true);
        })
    })

    describe('isValidUsername', () => {
        const minLength = 5;
        const maxLength = 15;

        it('should return true if username is in range', () => {
            expect(isValidUsername('j'.repeat(minLength + 1))).toBe(true);
            expect(isValidUsername('j'.repeat(maxLength - 1))).toBe(true);
        })

        it('should return false if username is not in range', () => {
            expect(isValidUsername('j'.repeat(minLength - 1))).toBe(false);
            expect(isValidUsername('A'.repeat(maxLength + 1))).toBe(false);
        })

        it('should return true if username is equal to min', () => {
            expect(isValidUsername('j'.repeat(minLength))).toBe(true);
        })

        it('should return true if username is equal to max', () => {
            expect(isValidUsername('j'.repeat(maxLength))).toBe(true);
        })

        it('should return false if username is not string', () => {
            expect(isValidUsername(maxLength)).toBe(false);
            expect(isValidUsername(null)).toBe(false);
            expect(isValidUsername(undefined)).toBe(false);
            expect(isValidUsername({})).toBe(false);
            expect(isValidUsername([])).toBe(false);
            expect(isValidUsername("")).toBe(false);
        })
    });

    describe('canDrive without parameterized', () => {
        const countries = {US: 'US', UK: 'UK', INVALID: "UNKNOWN"}

        it('should return true if age is greater than or equal to legal driving age', () => {
            expect(canDrive(18, countries.US)).toBe(true);
            expect(canDrive(21, countries.UK)).toBe(true);
        })

        it('should return false if age is less than legal driving age', () => {
            expect(canDrive(15, countries.US)).toBe(false);
            expect(canDrive(10, countries.UK)).toBe(false);
        })

        it('should return true if age is equal to the minimum legal driving age', () => {
            expect(canDrive(15, countries.US)).toBe(false);
            expect(canDrive(10, countries.UK)).toBe(false);
        })

        it('should throw invalid age error if age is not a number', () => {
            expect(canDrive('18', countries.US)).toMatch(/invalid/i);
            expect(canDrive('21', countries.UK)).toMatch(/invalid/i);
        })

        it('should throw invalid country code error if country code is unknown', () => {
            expect(canDrive(18, countries.INVALID)).toMatch(/invalid/i);
        });
    });

    describe('canDrive with parameterized', () => {
        const countries = {US: 'US', UK: 'UK', INVALID: "UNKNOWN"}

        it.each([
            {age: 18, countryCode: countries.US, expected: true},
            {age: 21, countryCode: countries.UK, expected: true},
            {age: 15, countryCode: countries.US, expected: false},
            {age: 10, countryCode: countries.UK, expected: false},
            {age: 16, countryCode: countries.US, expected: true},
            {age: 17, countryCode: countries.UK, expected: true},
            {age: '18', countryCode: countries.US, expected: 'Invalid age'},
            {age: '21', countryCode: countries.UK, expected: 'Invalid age'},
            {age: 18, countryCode: countries.INVALID, expected: 'Invalid country code'},
        ])
        ('should return $expected if age is $age and country code is $countryCode',
        ({age, countryCode, expected}) => {
            expect(canDrive(age, countryCode)).toBe(expected);
        })
    });
})
