import { Game, Config } from '@/types';

class GameConfig implements Config {
  private settings: Game;

  constructor(settings: Game) {
    this.settings = settings;
  }

  getModeParam() {
    return '-mode 0';
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
    const { income, incomeStep = 0, incomeStepNumber = 1 } = this.settings;
    return `-i ${income} ${incomeStep} ${incomeStepNumber}`;
  }

  getTaxParam() {
    const { tax, taxStep = 0, taxStepNumber = 1 } = this.settings;
    return `-tax ${tax / 100} ${taxStep} ${taxStepNumber}`;
  }

  getInitialFundingParam() {
    const { initialFunding, initialFundingStep = 0, initialFundingStepNumber = 1 } = this.settings;
    return `-sc ${initialFunding} ${initialFundingStep} ${initialFundingStepNumber}`;
  }

  getBuyingRangeParam() {
    return '-br 0.5 0 1';
  }

  getUpgradingRangeParam() {
    return '-ur 0.5 0 1';
  }

  getTradingRangeParam() {
    return '-tr 0.5 0 1';
  }

  getCommand() {
    const parameters: string[] = [
      this.getModeParam(),
      this.getGameParam(),
      this.getPlayerParam(),
      this.getRoundParam(),
      this.getIncomeParam(),
      this.getTaxParam(),
      this.getInitialFundingParam(),
      this.getBuyingRangeParam(),
      this.getUpgradingRangeParam(),
      this.getTradingRangeParam(),
    ];
    return `python monopoly.py ${parameters.join(' ')}`;
  }
}

export default function getGameCommand(game: Game) {
  return new GameConfig(game).getCommand();
}
