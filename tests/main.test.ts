import { describe, expect, it } from "vitest";

import { calculateDiscount } from "../src/main";

describe("calculateDiscount", () => {
  const errorMessage = /invalid/i;

  it("should return discounted price if given valid price", () => {
    expect(calculateDiscount(100, "SAVE10")).toBe(90);
    expect(calculateDiscount(100, "SAVE20")).toBe(80);
  });

  it("should return 'invalid/negative price' if given invalid price", () => {
    expect(calculateDiscount(-100, "SAVE10")).toMatch(errorMessage);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(100, "SAVE30")).toBe(100);
    expect(calculateDiscount(1000, "SAVE40")).toBe(1000);
  });
});
