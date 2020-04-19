import { Game, Config } from '@/types';

class GameConfig implements Config {
  private settings: Game;

  constructor(settings: Game) {
    this.settings = settings;
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
    const { income } = this.settings;
    return `-i ${income} 0 1`;
  }

  getTaxParam() {
    const { tax } = this.settings;
    return `-tax ${tax / 100} 0 1`;
  }

  getInitialFundingParam() {
    const { initialFunding } = this.settings;
    return `-sc ${initialFunding} 0 1`;
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
