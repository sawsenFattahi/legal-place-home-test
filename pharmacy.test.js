import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn for Other Drugs", () => {
    const pharmacy = new Pharmacy([new Drug("Other Drug", 2, 3)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Other Drug", 1, 2),
    ]);
  });

  it("should decrease benefit twice as fast after expiration for Other Drugs", () => {
    const pharmacy = new Pharmacy([new Drug("Other Drug", 0, 5)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Other Drug", -1, 3),
    ]);
  });

  it("should not allow benefit to become negative", () => {
    const pharmacy = new Pharmacy([new Drug("Other Drug", 5, 0)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Other Drug", 4, 0),
    ]);
  });

  it("should increase benefit for Herbal Tea", () => {
    const pharmacy = new Pharmacy([new Drug("Herbal Tea", 5, 10)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Herbal Tea", 4, 11),
    ]);
  });

  it("should increase benefit twice as fast for Herbal Tea after expiration", () => {
    const pharmacy = new Pharmacy([new Drug("Herbal Tea", 0, 10)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Herbal Tea", -1, 12),
    ]);
  });

  it("should not allow benefit to exceed 50 for Herbal Tea", () => {
    const pharmacy = new Pharmacy([new Drug("Herbal Tea", 5, 50)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Herbal Tea", 4, 50),
    ]);
  });

  it("should not change benefit or expiresIn for Magic Pill", () => {
    const pharmacy = new Pharmacy([new Drug("Magic Pill", 10, 40)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Magic Pill", 10, 40),
    ]);
  });

  it("should increase benefit of Fervex as expiration date approaches", () => {
    const pharmacy = new Pharmacy([new Drug("Fervex", 11, 10)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("Fervex", 10, 11)]);
  });

  it("should increase benefit of Fervex by 2 when 10 days or less remain", () => {
    const pharmacy = new Pharmacy([new Drug("Fervex", 10, 10)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("Fervex", 9, 12)]);
  });

  it("should increase benefit of Fervex by 3 when 5 days or less remain", () => {
    const pharmacy = new Pharmacy([new Drug("Fervex", 5, 10)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("Fervex", 4, 13)]);
  });

  it("should drop Fervex benefit to 0 after expiration", () => {
    const pharmacy = new Pharmacy([new Drug("Fervex", 0, 30)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it("should decrease Dafalgan benefit twice as fast as Other Drugs", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 10, 20)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Dafalgan", 9, 18),
    ]);
  });

  it("should decrease Dafalgan benefit four times as fast after expiration", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 0, 20)]);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Dafalgan", -1, 16),
    ]);
  });

  it("should not allow Dafalgan benefit to be negative", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 10, 0)]);
    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("Dafalgan", 9, 0)]);
  });

  it("should correctly update multiple drugs at once", () => {
    const drugs = [
      new Drug("Other Drug", 5, 7),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Magic Pill", 15, 40),
      new Drug("Fervex", 5, 20),
      new Drug("Dafalgan", 10, 30),
    ];
    const pharmacy = new Pharmacy(drugs);
    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Other Drug", 4, 6),
      new Drug("Herbal Tea", 9, 6),
      new Drug("Magic Pill", 15, 40),
      new Drug("Fervex", 4, 23),
      new Drug("Dafalgan", 9, 28),
    ]);
  });
});
