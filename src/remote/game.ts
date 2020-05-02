import { Game, Config } from '@/types';

class GameConfig implements Config {
  private settings: Game;

  constructor(settings: Game) {
    this.settings = settings;
  }

  getModeParam() {
    return '-mode 2';
  }

  getGameParam() {
    const { game } = this.settings;
    return `-n ${game}`;
  }

  getPlayerParam() {
    const { player } = this.settings;
    return `-p ${player}`;
  }

  getRoundParam() {
    const { round } = this.settings;
    return `-r ${round}`;
  }

  getIncomeParam() {
    const { income, incomeStep, incomeStepNumber } = this.settings;
    if (incomeStep && incomeStepNumber) {
      return `-i ${income} ${incomeStep} ${incomeStepNumber}`;
    }
    return `-i ${income}`;
  }

  getTaxParam() {
    const { tax, taxStep, taxStepNumber } = this.settings;
    if (taxStep && taxStepNumber) {
      return `-tax ${tax / 100} ${taxStep / 100} ${taxStepNumber}`;
    }
    return `-tax ${tax / 100}`;
  }

  getPropertyTaxParam() {
    const { propertyTax, propertyTaxStep, propertyTaxStepNumber } = this.settings;
    if (propertyTaxStep && propertyTaxStepNumber) {
      return `-b_tax ${propertyTax / 100} ${propertyTaxStep / 100} ${propertyTaxStepNumber}`;
    }
    return `-b_tax ${propertyTax / 100}`;
  }

  getInitialFundingParam() {
    const { initialFunding, initialFundingStep, initialFundingStepNumber } = this.settings;
    if (initialFundingStep && initialFundingStepNumber) {
      return `-sc ${initialFunding} ${initialFundingStep} ${initialFundingStepNumber}`;
    }
    return `-sc ${initialFunding}`;
  }

  getStrategyTypeParam() {
    return '-s 0';
  }

  getStrategyScaleParam() {
    return '-s_para 0.5';
  }

  getCommand() {
    const parameters: string[] = [
      this.getModeParam(),
      this.getGameParam(),
      this.getPlayerParam(),
      this.getRoundParam(),
      this.getIncomeParam(),
      this.getTaxParam(),
      this.getPropertyTaxParam(),
      this.getInitialFundingParam(),
      this.getStrategyTypeParam(),
      this.getStrategyScaleParam(),
    ];
    return `python monopoly.py ${parameters.join(' ')}`;
  }
}

export default function getGameCommand(game: Game) {
  return new GameConfig(game).getCommand();
}
