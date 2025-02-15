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

  updateBenefitFervex(drug) {
    drug.expiresIn -= 1;
    if (drug.expiresIn < 1) {
      return (drug.benefit = 0);
    }
    if (drug.expiresIn < 6) {
      return (drug.benefit = Math.min(50, (drug.benefit += 3)));
    }
    if (drug.expiresIn < 11) {
      return (drug.benefit = Math.min(50, (drug.benefit += 2)));
    }
    return (drug.benefit = Math.min(50, (drug.benefit += 1)));
  }

  updateBenefitHerbalTea(drug) {
    drug.expiresIn -= 1;
    if (drug.expiresIn < 1) {
      return (drug.benefit = Math.min(50, (drug.benefit += 2)));
    }
    return (drug.benefit = Math.min(50, (drug.benefit += 1)));
  }
  decreaseBenefitStandard(drug) {
    drug.expiresIn -= 1;
    return (drug.benefit =
      drug.expiresIn > 0
        ? Math.max(0, drug.benefit - 1)
        : Math.max(0, drug.benefit - 2));
  }

  applyBenefitRules(drug) {
    const rules = {
      standardDrugs: () =>
        drug.benefit > 0 && this.decreaseBenefitStandard(drug),
      "Herbal Tea": () => this.updateBenefitHerbalTea(drug),
      Fervex: () => this.updateBenefitFervex(drug),
      "Magic Pill": () => drug,
    };
    (rules[drug.name] || rules.standardDrugs)();
  }
  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      this.applyBenefitRules(drug);
    });
    return this.drugs;
  }
}
