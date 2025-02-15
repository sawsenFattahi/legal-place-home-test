export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefit(
    drug,
    changeRate,
    expiredRate = changeRate,
    benefitIsNull = false,
  ) {
    drug.expiresIn -= 1;

    if (benefitIsNull) {
      drug.benefit = 0;
    } else {
      drug.benefit = Math.min(
        50,
        Math.max(
          0,
          drug.benefit + (drug.expiresIn < 0 ? expiredRate : changeRate),
        ),
      );
    }
  }

  applyBenefitRules(drug) {
    const rules = {
      "Herbal Tea": () => this.updateBenefit(drug, 1, 2),
      Fervex: () => {
        if (drug.expiresIn < 1) {
          this.updateBenefit(drug, 0, 0, true);
        } else {
          this.updateBenefit(
            drug,
            drug.expiresIn < 6 ? 3 : drug.expiresIn < 11 ? 2 : 1,
          );
        }
      },
      Dafalgan: () => this.updateBenefit(drug, -2, -4),
      "Magic Pill": () => {},
    };
    (rules[drug.name] || (() => this.updateBenefit(drug, -1, -2)))();
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => this.applyBenefitRules(drug));
    return this.drugs;
  }
}
