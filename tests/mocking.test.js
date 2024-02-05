import { beforeEach, vi, describe, test, expect } from "vitest";
import { getPriceInCurrency, getShippingInfo, renderPage, signUp, submitOrder } from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";

vi.mock('../src/libs/currency')
vi.mock('../src/libs/shipping')
vi.mock('../src/libs/analytics')
vi.mock('../src/libs/payment')
vi.mock('../src/libs/email', async (originalImport) => {
        const originalModule = await originalImport()
        return {
            ...originalModule,
            sendEmail: vi.fn()
        }
    }
)

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
            expect(true).toBe(false)
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
        vi.mocked(getShippingQuote).mockReturnValue(null)

        const shippingInfo = getShippingInfo('US')

        expect(shippingInfo).toMatch(/unavailable/i)
    });

    test('should return shipping cost and estimated days', () => {
        vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 })

        const shippingInfo = getShippingInfo('US')

        expect(shippingInfo).toMatch('$10')
        expect(shippingInfo).toMatch(/2 Days/i)
        expect(shippingInfo).toMatch(/shipping cost: \$10 \(2 Days\)/i)
    });
});

describe('renderPage', () => {
    beforeEach(() => {
        trackPageView.mockReset();
    });

    test('should return correct content', async () => {
        const result = await renderPage()

        expect(result).toMatch(/content/i)
    });

    test('should call trackPageView', async () => {
        await renderPage()

        expect(trackPageView).toHaveBeenCalledWith('/home');
    });
});


describe('submitOrder', () => {
    beforeEach(() => {
        charge.mockReset();
    });

    test('should return success if payment is successful', async () => {
        const creditCard = '1234567890'
        const order = { totalAmount: 100 }

        vi.mocked(charge).mockResolvedValue({ status: 'succeeded' })

        const result = await submitOrder(order, creditCard)

        expect(result).toEqual({ success: true })
    });

    test('should return error if payment is failed', async () => {
        const creditCard = '1234567890'
        const order = { totalAmount: 100 }

        vi.mocked(charge).mockResolvedValue({ status: 'failed' })

        const result = await submitOrder(order, creditCard)

        expect(result).toEqual({ success: false, error: 'payment_error' })
    });

    test('should call charge with correct parameters', async () => {
        const creditCard = '1234567890'
        const order = { totalAmount: 100 }

        vi.mocked(charge).mockResolvedValue({ status: 'succeeded' })

        await submitOrder(order, creditCard)

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    });
});

describe('signUp - partial mocking example', () => {
    beforeEach(() => {
        sendEmail.mockReset();
    });

    test('should return true if email is valid', async () => {
        const email = 'jane.doe@example.com'

        expect(signUp(email)).resolves.toBe(true)

    })

    test('should return false if email is invalid', async () => {
        const email = 'jane.doe.example.com'

        expect(signUp(email)).resolves.toBe(false)
    })

    test('should call sendEmail if email is valid', async () => {
        const email = 'jane.doe@example.com'

        await signUp(email)

        expect(vi.mocked(sendEmail)).toHaveBeenCalledWith(email, 'Welcome aboard!');
    })

    test('should not call sendEmail if email is invalid', async () => {
        const email = 'jane.doe.example.com'

        await signUp(email)

        expect(vi.mocked(sendEmail)).not.toHaveBeenCalled();
    })
});
