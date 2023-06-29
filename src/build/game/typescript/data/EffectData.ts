import React from 'react';
import { Effect, EFFECT_TYPE } from "./Types"
import { RESOURCES, GetResourceColor, GetResourceName } from './ResourceData';

export const enum EFFECTS {
  BED,
  WELL_RESTED,
  PRESTIGE,
  PRESTIGE_2,
  HERB_BAG,
  HERB_BAG_SECONDARY,
  ARRACHS_WEB_1,
  ELVENFOIL_1,
  ELIXIR_1,
  ELIXIR_2,
  CLOTHING_1,
  PLANT_ARRACHS_WEB_1
}


export const effectList: Record<number, Effect> = {
  [EFFECTS.BED]: new Effect({
    name: "Bed",
    id: EFFECTS.BED,
    appliesTo: [
      RESOURCES.STAMINA,
    ],
    basedOn: null,
    effectType: EFFECT_TYPE.BASE_AMOUNT,
    level: 0,
    amount: [0.5, 0.5],
    levelFunction: function() { return this.amount[0] * this.level },
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases base regeneration by ",
        React.createElement("span", { className: "bold" }, this.amount[0]),
        " per level"
      )
    }
  }),
  [EFFECTS.WELL_RESTED]: new Effect({
    name: "Well Rested",
    id: EFFECTS.WELL_RESTED,
    appliesTo: [
      RESOURCES.STAMINA,
    ],
    basedOn: null,
    effectType: EFFECT_TYPE.BASE_PERCENTAGE,
    level: 0,
    amount: [0.15, 0.15],
    levelFunction: function() { return this.amount[0] },
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases base regeneration by ",
        React.createElement("span", { className: "bold" }, (this.amount[0] * 100)),
        "%"
      )
    },
  }),
  [EFFECTS.PRESTIGE]: new Effect({
    name: "Prestige",
    id: EFFECTS.PRESTIGE,
    appliesTo: [-1],
    basedOn: RESOURCES.PRESTIGE,
    effectType: EFFECT_TYPE.BASE_PERCENTAGE,
    level: 0,
    amount: [0.025, 0.025],
    levelFunction: function(i: number) { return this.amount[0] * i},
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases base regeneration by ",
        React.createElement("span", { className: "bold" }, this.amount[0] * 100),
        "% per ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.PRESTIGE) }, GetResourceName(RESOURCES.PRESTIGE)),
      )
    },
  }),
  [EFFECTS.PRESTIGE_2]: new Effect({
    name: "Prestious Capacity",
    id: EFFECTS.PRESTIGE_2,
    appliesTo: [-1],
    basedOn: RESOURCES.PRESTIGE,
    effectType: EFFECT_TYPE.MAX_AMOUNT,
    level: 0,
    amount: [1, 1],
    levelFunction: function(i: number) { return this.amount[0] * i},
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases your ",
        React.createElement("span", { className: "bold" }, 'MAX'),
        " capacity by ",
        React.createElement("span", { className: "bold" }, this.amount[0]),
        " per ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.PRESTIGE) }, GetResourceName(RESOURCES.PRESTIGE)),
      )
    },
  }),
  [EFFECTS.HERB_BAG]: new Effect({
    name: "Herb Bag",
    id: EFFECTS.HERB_BAG,
    appliesTo: [
      RESOURCES.HERB,
    ],
    basedOn: null,
    effectType: EFFECT_TYPE.MAX_AMOUNT,
    level: 0,
    amount: [5, 5],
    levelFunction: function() { return this.amount[0] * this.level },
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases your ",
        React.createElement("span", { className: "bold" }, "MAX"),
        " capacity by ",
        React.createElement("span", { className: "bold" }, this.amount[0]),
        " per level"
      )
    },
  }),
  [EFFECTS.HERB_BAG_SECONDARY]: new Effect({
    name: "Extra Herb Pockets",
    id: EFFECTS.HERB_BAG_SECONDARY,
    appliesTo: [
      RESOURCES.DEMON_SPROUT,
      RESOURCES.ARRACHS_WEB,
      RESOURCES.WORMS_TOOTH,
      RESOURCES.ELVENFOIL
    ],
    basedOn: null,
    effectType: EFFECT_TYPE.MAX_AMOUNT,
    level: 0,
    amount: [1, 1],
    levelFunction: function() { return this.amount[0] * this.level },
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases your ",
        React.createElement("span", { className: "bold" }, "MAX"),
        " capacity by ",
        React.createElement("span", { className: "bold" }, this.amount[0]),
        " per level"
      )
    },
  }),
  [EFFECTS.ARRACHS_WEB_1]: new Effect({
    name: "Aura of Arrach 1",
    id: EFFECTS.ARRACHS_WEB_1,
    appliesTo: [-1],
    basedOn: RESOURCES.ARRACHS_WEB,
    effectType: EFFECT_TYPE.TOTAL_PERCENTAGE,
    level: 0,
    amount: [0.008, 0.008],
    levelFunction: function(i: number) { return this.amount[0] * i },
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases total regeneration by ",
        React.createElement("span", { className: "bold" }, this.amount[0] * 100),
        "% per ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.ARRACHS_WEB) }, GetResourceName(RESOURCES.ARRACHS_WEB)),
      )
    },
  }),
  [EFFECTS.ELVENFOIL_1]: new Effect({
    name: "Elvenfoil Glitter 1",
    id: EFFECTS.ELVENFOIL_1,
    appliesTo: [RESOURCES.GOLD],
    basedOn: RESOURCES.ELVENFOIL,
    effectType: EFFECT_TYPE.TOTAL_AMOUNT,
    level: 0,
    amount: [0.25, 0.25],
    levelFunction: function(i: number) { return this.amount[0] * i },
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases total regeneration by ",
        React.createElement("span", { className: "bold" }, this.amount[0]),
        " per ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.ELVENFOIL) }, GetResourceName(RESOURCES.ELVENFOIL)),
      )
    },
  }),
  [EFFECTS.ELIXIR_1]: new Effect({
    name: "Stamina Elixers",
    id: EFFECTS.ELIXIR_1,
    appliesTo: [RESOURCES.STAMINA],
    basedOn: RESOURCES.ELIXIR,
    effectType: EFFECT_TYPE.BASE_PERCENTAGE,
    level: 0,
    amount: [0.05, 0.05],
    levelFunction: function(i: number) { return this.amount[0] * i },
    description: function (): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases base regeneration by ",
        React.createElement("span", { className: "bold" }, this.amount[0] * 100),
        "% per ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.ELIXIR) }, GetResourceName(RESOURCES.ELIXIR)),
      )
    },
  }),
  [EFFECTS.ELIXIR_2]: new Effect({
    name: "Mana Elixers",
    id: EFFECTS.ELIXIR_2,
    appliesTo: [RESOURCES.MANA],
    basedOn: RESOURCES.ELIXIR,
    effectType: EFFECT_TYPE.BASE_PERCENTAGE,
    level: 0,
    amount: [0.025, 0.025],
    levelFunction: function(i: number) { return this.amount[0] * i },
    description: function (): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases base regeneration by ",
        React.createElement("span", { className: "bold" }, this.amount[0] * 100),
        "% per ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.ELIXIR) }, GetResourceName(RESOURCES.ELIXIR)),
      )
    },
  }),
  [EFFECTS.CLOTHING_1]: new Effect({
    name: "Clothing",
    id: EFFECTS.CLOTHING_1,
    appliesTo: [RESOURCES.STAMINA],
    basedOn: null,
    effectType: EFFECT_TYPE.BASE_AMOUNT,
    level: 0,
    amount: [0.25, 0.25],
    levelFunction: function() { return this.amount[0] * this.level },
    description: function (): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases your base ",
        "regeneration by ",
        React.createElement("span", { className: "bold" }, this.amount[0]),
        " per level"
      )
    },
  }),
}
