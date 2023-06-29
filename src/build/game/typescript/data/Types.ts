import React from 'react';

export const enum REWARD_TYPE {
  RESOURCE,
  MAX_RESOURCE,
}

export enum BONUS_TYPE {
  BASE_PERCENTAGE,
  TOTAL_PERCENTAGE,
  BASE_AMOUNT,
  TOTAL_AMOUNT,
  MAX_AMOUNT,
  MAX_PERCENTAGE
}

export enum EFFECT_TYPE {
  BASE_PERCENTAGE,
  TOTAL_PERCENTAGE,
  BASE_AMOUNT,
  TOTAL_AMOUNT,
  MAX_AMOUNT,
  MAX_PERCENTAGE
}

export enum REQUIREMENT_TYPE {
  RESOURCE,
  UPGRADE
}

export interface IPlot {
  fullyGrown: boolean,
  unlocked: boolean,
  plant: Plant,
}

export interface IPlayerData {
  name: string;
  plantsGrown: number;
  gardenUnlocked: boolean;
}

export interface IGameData {
  gameSpeed: number,
  playerData: IPlayerData,
  bonusList: Record<number, Bonus>,
  actionList: Record<number, Action>,
  upgradeList: Record<number, Upgrade>,
  resourceList: Record<number, Resource>,
  effectList: Record<number, Effect>
  plotList: Record<number, IPlot>,
  spellList: Record<number, Spell>,
}

export interface IGameContext {
  gameSpeed: number,
  setActions: React.Dispatch<Record<number, Action>>,
  setResources: React.Dispatch<Record<number, Resource>>,
  setUpgrades: React.Dispatch<Record<number, Upgrade>>,
  setBonuses: React.Dispatch<Record<number, Bonus>>,
  setPlots: React.Dispatch<Record<number, IPlot>>,
  setEffects: React.Dispatch<Record<number, Effect>>,
  setPlayer: React.Dispatch<IPlayerData>,
  setSpells: React.Dispatch<Record<number, Spell>>,
  resources: Record<number, Resource>,
  actions: Record<number, Action>,
  upgrades: Record<number, Upgrade>,
  bonuses: Record<number, Bonus>,
  plots: Record<number, IPlot>,
  player: IPlayerData,
  effects: Record<number, Effect>
  spells: Record<number, Spell>
}

export interface IPond {
  name: string;
  rewards: number[][];
}

export class Pond implements IPond {
  public name: string;
  public rewards: number[][];

  public roll = () => {
    let rewardGiven = false;
    let rewardAmount = 0;
    let reward: number[] | null = null;

    const roll = Math.random();

    this.rewards.forEach(([resource, min, max, chance]: number[]) => {
      if (rewardGiven) return;

      if (chance < roll) {
        rewardGiven = true;
        rewardAmount = Math.floor(Math.random() * (max - min + 1)) + min;
        reward = [resource, rewardAmount];
      }
    })

    return reward;
  }
}

export interface IResource {
  name: string;
  id: number;
  color: string;
  description: () => string | JSX.Element;
  amount: number;
  amountMax: number;
  amountMaxBase: number;
  rate: number;
  rateBase: number;
  ratePercent: number;
  rateAdditive: number;
  unlocked: boolean;
  bonuses: number[];
  tag: number;
}

export class Resource implements IResource {
  public name: string;
  public id: number;
  public color: string;
  public description: () => string | JSX.Element;
  public amount: number;
  public amountMax: number;
  public amountMaxBase: number;
  public rate: number;
  public rateBase: number;
  public ratePercent: number;
  public rateAdditive: number;
  public unlocked: boolean;
  public bonuses: number[];
  public tag: number;

  constructor({ ...parameters }: IResource) {
    this.name = parameters.name;
    this.id = parameters.id;
    this.color = parameters.color;
    this.description = parameters.description;
    this.amount = parameters.amount;
    parameters.amountMax == -1 ? this.amountMax = Infinity : this.amountMax = parameters.amountMax;
    this.amountMaxBase = this.amountMax;
    this.rate = parameters.rate;
    this.rateBase = parameters.rateBase;
    this.ratePercent = parameters.ratePercent;
    this.rateAdditive = parameters.rateAdditive;
    this.unlocked = parameters.unlocked;
    this.bonuses = parameters.bonuses;
    this.tag = parameters.tag;
  }

   unlock = () => {
    return this.unlocked = true;
  }

  public increment = (i: number, gameSpeed?: number) => {
    if (gameSpeed) i = i / ( 1000 / gameSpeed );

    if (this.amount <= this.amountMax) {
      if (this.amount + i> this.amountMax) {
        return {
          ...this,
          amount: this.amount = this.amountMax
        };
      } else if (this.amount + i <= 0) {
        return {
          ...this,
          amount: this.amount = 0
        }
      } else {
        return {
          ...this,
          amount: this.amount += i
        };
      }
    } else {
      return this;
    }
  }

  public incrementRateBase = (i: number) => {
    this.rateBase += i;
  }

  public incrementRate = (i: number) => {
    this.rate += i;
  }

  public incrementMax = (i: number) => {
    if (this.amountMax + i < this.amountMaxBase) {
      return {
        ...this,
        amountMax: this.amountMax,
        amountMaxBase: this.amountMaxBase
      }
    }
    return {
      ...this,
      amountMax: this.amountMax += i,
      amountMaxBase: this.amountMaxBase += i
    }
  }

  public recalculate = (bonusList: Record<number, Bonus>, effectList: Record<number, Effect>) => {
    let baseBonusAmount = 0;
    let baseBonusPercentage = 0;

    let totalBonusAmount = 0;
    let totalBonusPercentage = 0;

    let maxBonusAmount = 0;
    let maxBonusPercentage = 0;

    let newRate = 0;

    this.bonuses.forEach((bonus: number) => {
      bonusList[bonus].effects.forEach((effect: number) => {
        const currentEffect = effectList[effect];
        if (!currentEffect.appliesTo.includes(this.id) && currentEffect.appliesTo[0] != -1) return;
        switch (currentEffect.effectType) {
          case EFFECT_TYPE.MAX_AMOUNT:
            maxBonusAmount += currentEffect.amount[1];
            break;
          case EFFECT_TYPE.MAX_PERCENTAGE:
            maxBonusPercentage += currentEffect.amount[1];
            break;
        }
      });
    });

    this.amountMax = (this.amountMaxBase + maxBonusAmount) * (maxBonusPercentage + 1);

    // Base Calculations occur before the base rate is set
    this.bonuses.forEach((bonus) => {
      bonusList[bonus].effects.forEach((effect) => {
        const currentEffect: Effect = effectList[effect];
        if (!currentEffect.appliesTo.includes(this.id) && currentEffect.appliesTo[0] != -1) return;
        switch (currentEffect.effectType) {
          case EFFECT_TYPE.BASE_AMOUNT:
            baseBonusAmount += currentEffect.amount[1];
            break;
          case EFFECT_TYPE.BASE_PERCENTAGE:
            baseBonusPercentage += currentEffect.amount[1];
            break;
        }
      });
    });

    newRate = (this.rateBase + baseBonusAmount) * (baseBonusPercentage + 1);

    // Normal Rate Calculation
    newRate = (newRate * this.ratePercent) + this.rateAdditive;

    // Total Calculations occur after base rate has been calculated
    this.bonuses.forEach((bonus) => {
      bonusList[bonus].effects.forEach((effect) => {
        const currentEffect: Effect = effectList[effect];
        if (!currentEffect.appliesTo.includes(this.id) && currentEffect.appliesTo[0] != -1) return;
        switch (currentEffect.effectType) {
          case EFFECT_TYPE.TOTAL_AMOUNT:
            totalBonusAmount += currentEffect.amount[1];
            break;
          case EFFECT_TYPE.TOTAL_PERCENTAGE:
            totalBonusPercentage += currentEffect.amount[1];
            break;
        }
      });
    });

    return this.rate = (newRate + totalBonusAmount) * (totalBonusPercentage + 1);
  }
}

export interface IEffect {
  name: string;
  id: number;
  appliesTo: number[];
  basedOn: number | null;
  effectType: number;
  level: number;
  amount: number[];
  levelFunction: (i: number) => number;
  description: () => JSX.Element | string;
}

export class Effect implements IEffect {
  public name: string;
  public id: number;
  public appliesTo: number[];
  public basedOn: number | null;
  public effectType: number;
  public level: number;
  public amount: number[];
  public levelFunction: (i: number) => number;
  public description: () => JSX.Element | string;
  constructor ({ ...parameters }: IEffect) {
    this.name = parameters.name;
    this.id = parameters.id,
    this.appliesTo = [...parameters.appliesTo],
    this.basedOn = parameters.basedOn;
    this.effectType = parameters.effectType;
    this.level = parameters.level;
    this.amount = [...parameters.amount];
    this.levelFunction = parameters.levelFunction;
    this.description = parameters.description;
  }

  recalculate = (i: number) => {
    if (this.basedOn) return this.amount[1] = this.levelFunction(i);
    else return this.amount[1] = this.levelFunction(i);
  }
}


export interface IBonus {
  name: string;
  id: number;
  unlocked: boolean;
  effects: number[];
  level: number[];
}

export class Bonus implements IBonus {
  public name: string;
  public id: number;
  public unlocked: boolean;
  public effects: number[];
  public level: number[];

  constructor({ ...parameters }: IBonus) {
    this.name = parameters.name;
    this.id = parameters.id;
    this.unlocked = parameters.unlocked;
    this.effects = [...parameters.effects];
    this.level = [...parameters.level];
  }


  unlock = (effectData: Record<number, Effect>) => {
    if (this.level[0] == 0) {
      this.unlocked = true;
      this.effects.forEach((effect) => {
        effectData[effect].level += 1;
        effectData[effect].recalculate(0);
      })
      return true;
    }
    return false;
  }

  increaseLevel = (effectData: Record<number, Effect>) => {
    if (this.level[0] < this.level[1]) {
      this.level[0] += 1;
      this.effects.forEach((effect) => {
        effectData[effect].level += 1;
        effectData[effect].recalculate(0);
      })
    }
  }
}

export interface IAction {
  name: string,
  id: number,
  tag: number,
  description: () => string | JSX.Element,
  costs: number[][],
  requirements: number[][],
  unlocked: boolean,
  level: number,
  experience: number[],
  experiencePerAction: number,
  rewards: number[][],
  levelFunction: () => number[][]
}

export class Action implements IAction{
  public name: string;
  public id: number;
  public tag: number;
  public description: () => string | JSX.Element;
  public costs: number[][];
  public requirements: number[][];
  public unlocked: boolean;
  public level: number;
  public experience: number[];
  public experiencePerAction: number;
  public rewards: number[][];
  public levelFunction: () => number[][];

  constructor({ ...parameters }) {
    this.name = parameters.name;
    this.tag = parameters.tag;
    this.id = parameters.id;
    this.unlocked = parameters.unlocked;
    this.description = parameters.description;
    this.costs = parameters.costs;
    this.requirements = parameters.requirements;
    this.level = parameters.level;
    this.experience = parameters.experience;
    this.experiencePerAction = parameters.experiencePerAction;
    this.rewards = parameters.rewards;
    this.levelFunction = parameters.levelFunction ? parameters.levelFunction : function() {
    return parameters.rewards.map((reward: number[]) => {
      reward[3] *= 2;
      reward[4] *= 2;
      return reward;
    })
  };
  }

  public incrementXP = (i: number) => {
    this.experience[0] += i;
    if (this.experience[0] >= this.experience[1]) {
      this.levelUp();
    }
  }

  public levelUp = () => {
    this.experience[0] -= this.experience[1];
    this.experience[1] *= (this.level * 20);
    this.level += 1;
    this.rewards = this.levelFunction();
  }

  public hasRequirements = (
    upgradeList: Record<number, Upgrade>,
    resourceList: Record<number, Resource>,
  ) => {
    let requirementsFlag = true;
    this.requirements.forEach((requirement) => {
      switch (requirement[0]) {
        case (REQUIREMENT_TYPE.UPGRADE): {
          if (upgradeList[requirement[1]].purchased) break;
          return requirementsFlag = false;
        }
        case (REQUIREMENT_TYPE.RESOURCE): {
          if (resourceList[requirement[1]].amount >= requirement[2] && resourceList[requirement[1]].unlocked) break;
          return requirementsFlag = false;
        }
      }
    });
    if (!requirementsFlag) return;
    return this.unlocked = true;
  }
}

export interface IUpgrade {
   name: string;
   id: number;
   description: () => string | JSX.Element;
   purchased: boolean;
   unlocked: boolean;
   costs: number[][];
   results: number[][];
   requirements: number[][];
}

export class Upgrade implements IUpgrade {
  public name: string;
  public id: number;
  public description: () => string | JSX.Element;
  public purchased: boolean;
  public unlocked: boolean;
  public costs: number[][];
  public results: number[][];
  public requirements: number[][];

  constructor({ ...parameters }) {
    this.name = parameters.name;
    this.id = parameters.id;
    this.description = parameters.description;
    this.purchased = parameters.purchased;
    this.unlocked = parameters.unlocked;
    this.costs = parameters.costs;
    this.results = parameters.results;
    this.requirements = parameters.requirements;
  }

  public hasRequirements = (upgradeList: Record<number, Upgrade>, resourceList: Record<number, Resource>) => {
    let requirementsFlag = true;
    this.requirements.forEach(([requirementType, requirementId, requirementAmount]) => {
      switch (requirementType) {
        case (REQUIREMENT_TYPE.UPGRADE): {
          if (upgradeList[requirementId].purchased) break;
          return requirementsFlag = false;
        }
        case (REQUIREMENT_TYPE.RESOURCE): {
          if (resourceList[requirementId].amount >= requirementAmount) break;
          return requirementsFlag = false;
        }
      }
    });
    if (!requirementsFlag) return this.unlocked = false;
    return this.unlocked = true;
  }
}

export interface ISpell {
  name: string;
  id: number;
  description: () => string | JSX.Element;
  effectDescription: () => string | JSX.Element;
  tag: number;
  duration: number[];
  costs: number[][];
  activateEffectFunction: (resourceList: Record<number, Resource>) => void;
  deactivateEffectFunction: (resourceList: Record<number, Resource>) => void;
  active: boolean;
  unlocked: boolean;
}

export class Spell implements ISpell {
  public name: string;
  public id: number;
  public description: () => string | JSX.Element;
  public effectDescription: () => string | JSX.Element;
  public tag: number;
  public duration: number[];
  public costs: number[][];
  public activateEffectFunction: (resourceList: Record<number, Resource>) => void;
  public deactivateEffectFunction: (resourceList: Record<number, Resource>) => void;
  public active: boolean;
  public unlocked: boolean;

  constructor({ ...parameters }) {
    this.name = parameters.name;
    this.id = parameters.id;
    this.tag = parameters.tag;
    this.description = parameters.description;
    this.effectDescription = parameters.effectDescription;
    this.costs = [...parameters.costs];
    this.duration = [...parameters.duration];
    this.activateEffectFunction = parameters.activateEffectFunction;
    this.deactivateEffectFunction = parameters.deactivateEffectFunction;
    this.active = parameters.active;
    this.unlocked = parameters.unlocked;
  }

  public increment = (i: number, gameSpeed?: number) => {
    if (gameSpeed) i = i / (1000 / gameSpeed);
    if (this.duration[0] <= this.duration[1]) {
      if (this.duration[0] <= this.duration[1]) {
        if (this.duration[0] + i > this.duration[1]) {
          this.duration = [0, this.duration[1]]
          this.active = false;
        } else if (this.duration[0] + i <= 0) {
          this.duration = [0, this.duration[1]]
        } else {
          this.duration = [this.duration[0] += i, this.duration[1]]
        }
      }
    }
  }
}

export interface IPlant {
  name: string;
  id: number;
  description: () => string | JSX.Element;
  unlocked: boolean;
  costs: number[][];
  effects: number[][];
  requirements: number[][];
  rewards: number[][];
  amountGrown: number;
  growth: number[];
  growthRate: number;
}

export class Plant implements IPlant {
  public name: string;
  public id: number;
  public description: () => string | JSX.Element;
  public color: string;
  public unlocked: boolean;
  public costs: number[][];
  public effects: number[][];
  public requirements: number[][];
  public rewards: number[][];
  public amountGrown: number;
  public growth: number[];
  public growthRate: number;

  constructor({ ...parameters }) {
    this.name = parameters.name;
    this.id = parameters.id;
    this.description = parameters.description;
    this.color = parameters.color;
    this.unlocked = parameters.unlocked;
    this.costs = [...parameters.costs];
    this.effects = [...parameters.effects];
    this.requirements = [...parameters.requirements];
    this.amountGrown = parameters.amountGrown ? parameters.amountGrown: 0;
    this.growth = [...parameters.growth];
    this.growthRate = parameters.growthRate ? parameters.growthRate : 1;
    this.rewards = parameters.rewards;
  }

  public isFullyGrown = () => {
    return this.growth[0] == this.growth[1];
  }

  public hasRequirements = (upgradeList: Record<number, Upgrade>, resourceList: Record<number, Resource>) => {
    let requirementsFlag = true;
    this.requirements.forEach(([requirementType, requirementId, requirementAmount]) => {
      switch (requirementType) {
        case (REQUIREMENT_TYPE.UPGRADE): {
          if (upgradeList[requirementId].purchased) break;
          return requirementsFlag = false;
        }
        case (REQUIREMENT_TYPE.RESOURCE): {
          if (resourceList[requirementId].amount >= requirementAmount) break;
          return requirementsFlag = false;
        }
      }
    });
    if (!requirementsFlag) return this.unlocked = false;
    return this.unlocked = true;
  }

//  public applyBonuses = (bonusList: Record<number, Bonus>) => {
//    if (this.isFullyGrown()) {
//
//    }
//  }

  public increment = (i: number, gameSpeed?: number) => {
    if (gameSpeed) i = i / (1000 / gameSpeed);
    if (this.growth[0] <= this.growth[1]) {
      if (this.growth[0] + i > this.growth[1]) {
        this.growth = [this.growth[1], this.growth[1]]
      } else if ( this.growth[0] + i <= 0 ) {
        this.growth = [0, this.growth[1]]
      } else {
        this.growth = [this.growth[0] += i, this.growth[1]]
      }
    }
  }
}
