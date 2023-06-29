import { Bonus } from './Types';
import { EFFECTS } from './EffectData';


export const enum BONUSES {
  BED,
  PRESTIGE,
  HERB_BAG,
  ARRACHS_WEB_1,
  ELVENFOIL_1,
  ELIXIR_1,
  ELIXIR_2,
  CLOTHING_1,
  PLANT_ARRACHS_WEB_1
}

export enum BONUS_TYPE {
  BASE_PERCENTAGE,
  TOTAL_PERCENTAGE,
  BASE_AMOUNT,
  TOTAL_AMOUNT,
  MAX_AMOUNT,
  MAX_PERCENTAGE
}


export const bonusList: Record<number, Bonus> = {
  [BONUSES.BED]: new Bonus({
    name: "Bed",
    id: BONUSES.BED,
    unlocked: false,
    level: [0, 3],
    effects: [
      EFFECTS.BED,
    ]
  }),
  [BONUSES.PRESTIGE]: new Bonus({
    name: "Prestige",
    id: BONUSES.PRESTIGE,
    level: [0, 1],
    unlocked: false,
    effects: [
      EFFECTS.PRESTIGE,
      EFFECTS.PRESTIGE_2
    ]
  }),
  [BONUSES.HERB_BAG]: new Bonus({
    name: "Herb Bag",
    id: BONUSES.HERB_BAG,
    level: [0, 3],
    unlocked: false,
    effects: [
      EFFECTS.HERB_BAG,
      EFFECTS.HERB_BAG_SECONDARY,
    ]
  }),
  [BONUSES.ARRACHS_WEB_1]: new Bonus({
    name: "Aura of Arrach 1",
    id: BONUSES.ARRACHS_WEB_1,
    level: [0, 1],
    unlocked: false,
    effects: [
      EFFECTS.ARRACHS_WEB_1
    ]
  }),
//  [BONUSES.PLANT_ARRACHS_WEB_1]: new Bonus({
//    name: "Arrach's Insight",
//    id: BONUSES.ARRACHS_WEB_1,
//    amount: 0.08,
//    amountTotal: 0.08,
//    levelFunction: function(i: number) { return this.amount * i },
//    appliesTo: [
//      -1
//    ],
//    level: 0,
//    maxLevel: 6,
//    unlocked: true,
//    basedOn: null,
//    bType: BONUS_TYPE.BASE_PERCENTAGE,
//    description: function (): JSX.Element {
//      return React.createElement(
//        "span",
//        [],
//        "Increases your base ",
//        "regeneration by ",
//        React.createElement("span", { className: "bold" }, this.amount * 100),
//        "% per  ",
//        React.createElement("span", { className: "bold" }, " Fully Grown "),
//        React.createElement("span", { className: GetResourceColor(RESOURCES.ARRACHS_WEB) }, GetResourceName(RESOURCES.ARRACHS_WEB))
//      )
//    }
//  }),
  [BONUSES.ELVENFOIL_1]: new Bonus({
    name: "Elvenfoil Glitter 1",
    id: BONUSES.ELVENFOIL_1,
    level: [0, 1],
    unlocked: false,
    effects: [
      EFFECTS.ELVENFOIL_1
    ]
  }),
  [BONUSES.ELIXIR_1]: new Bonus({
    name: "Stamina Elixirs",
    id: BONUSES.ELIXIR_1,
    level: [0, 1],
    unlocked: false,
    effects: [
      EFFECTS.ELIXIR_1
    ]
  }),
  [BONUSES.ELIXIR_2]: new Bonus({
    name: "Mana Elixirs",
    id: BONUSES.ELIXIR_2,
    level: [0, 1],
    unlocked: false,
    effects: [
      EFFECTS.ELIXIR_2
    ]
  }),
  [BONUSES.CLOTHING_1]: new Bonus({
    name: "Clothing",
    id: BONUSES.ELIXIR_2,
    level: [0, 3],
    unlocked: false,
    effects: [
      EFFECTS.CLOTHING_1
    ]
  }),
}
