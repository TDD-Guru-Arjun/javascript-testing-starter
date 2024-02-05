import { vi, describe, test, expect } from "vitest";
import { getPriceInCurrency, getShippingInfo } from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";

vi.mock('../src/libs/currency')
vi.mock('../src/libs/shipping')


describe('Test suite', () => {
    test('mock example 01 return value', () => {
        const greet = vi.fn()
        greet.mockReturnValue('Hello World')

        const result = greet()
        console.log(result)
    });

    test('mock example 01 return resolved promise', () => {
        const greet = vi.fn()
        greet.mockResolvedValue('mock resolved promise')

        greet().then(result => console.log(result))
    });

    test('mock example 01 return resolved promise using async/await', async () => {
        const greet = vi.fn()
        greet.mockResolvedValue('mock resolved promise async/await')

        const result = await greet()
        console.log(result)
    });

    test('mock example 01 return rejected promise', () => {
        const greet = vi.fn()
        greet.mockRejectedValue('mock rejected promise')

        greet().catch(result => console.log(result))
    });

    test('mock example 01 return rejected promise using async/await', async () => {
        const greet = vi.fn()
        greet.mockRejectedValue('mock rejected promise async/await')

        try {
            await greet()
        } catch (error) {
            console.log(error)
        }
    });

    test('mock sendText', () => {
        const sendText = vi.fn()
        // sendText.mockImplementation(() => 'ok')
        sendText.mockReturnValue('ok')

        const result = sendText('message')
        console.log(result)

        expect(sendText).toHaveBeenCalledWith('message')
        expect(sendText).toHaveBeenCalledTimes(1)
        expect(result).toBe('ok')
    })
});

describe('getPriceInCurrency', () => {
    test('should return price in target currency', () => {

        vi.mocked(getExchangeRate).mockReturnValue(1.2)

        const result = getPriceInCurrency(100, 'EUR')

        expect(getExchangeRate).toHaveBeenCalledWith('USD', 'EUR')
        expect(result).toBe(120)
    })
});

describe('getShippingInfo', () => {
    test('should return "Shipping Unavailable" if quote can not be fetched', () => {
        // vi.mocked(getShippingQuote).mockReturnValue(null)

        const shippingInfo = getShippingInfo('US')

        expect(shippingInfo).toMatch(/unavailable/i)
    });

    test('should return shipping cost and estimated days', () => {
        vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 })

        const shippingInfo = getShippingInfo('US')

        expect(shippingInfo).toMatch('Shipping Cost: $10 (2 Days)')
    });
});
