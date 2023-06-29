import { createElement } from 'react';
import { RESOURCES, GetResourceColor, GetResourceName } from './ResourceData';
import { BONUSES } from './BonusData';
import { EFFECTS } from './EffectData';
import { Upgrade, REQUIREMENT_TYPE } from './Types';

export const enum UPGRADE_TYPE {
  BONUS,
  ADD_EFFECT,
  RESOURCE
}

export const enum UPGRADES {
  BED_1,
  BED_2,
  BED_3,
  PRESTIGE,
  HERB_BAG_1,
  ARRACHS_WEB_1,
  ELVENFOIL_1,
  ELIXIR_1,
  ELIXIR_2,
  UNLOCK_MANA,
  PURCHASE_LOOM,
  CLOTHING_1,
  CLOTHING_2,
  CLOTHING_3,
}

export const upgradeList: Record<number, Upgrade> = {
  [UPGRADES.BED_1]: new Upgrade({
    name: "Straw Bed",
    id: UPGRADES.BED_1,
    description: () => "Barely better than sleeping on the floor",
    purchased: false,
    unlocked: true,
    costs: [],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.BED],
    ],
    requirements: [],
  }),
  [UPGRADES.BED_2]: new Upgrade({
    name: "Wooden Bed",
    id: UPGRADES.BED_2,
    description: () => "You can finally get a good nights rest",
    purchased: false,
    unlocked: false,
    costs: [
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.BED]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.BED_1, 1]
    ]
  }),
  [UPGRADES.BED_3]: new Upgrade({
    name: "Magical Bed",
    id: UPGRADES.BED_3,
    description: () => "Magical runes enhance the comfort",
    purchased: false,
    unlocked: false,
    costs: [
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.BED],
      [UPGRADE_TYPE.ADD_EFFECT, BONUSES.BED, EFFECTS.WELL_RESTED]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.BED_2, 1],
    ]
  }),
  [UPGRADES.PRESTIGE]: new Upgrade({
    name: "Prestige",
    id: UPGRADES.PRESTIGE,
    description: () => "Prestige",
    purchased: false,
    unlocked: true,
    costs: [
      [RESOURCES.STAMINA, 1],
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.PRESTIGE]
    ],
    requirements: []
  }),
  [UPGRADES.HERB_BAG_1]: new Upgrade({
    name: "Basic Herb Bag",
    id: UPGRADES.HERB_BAG_1,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "A small bag increases the number of ",
        createElement("span", { className: GetResourceColor(RESOURCES.HERB) }, "Herb"),
        " you can carry",
      )
    },
    purchased: false,
    unlocked: true,
    costs: [
      [RESOURCES.GOLD, 10],
      [RESOURCES.CLOTH, 5],
      [RESOURCES.HERB, 5]
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.HERB_BAG],
    ],
    requirements: []
  }),
  [UPGRADES.ARRACHS_WEB_1]: new Upgrade({
    name: "Aura of Arrach 1",
    id: UPGRADES.ARRACHS_WEB_1,
    description: () => "Remnents of Arrach exist within these herbs",
    purchased: false,
    unlocked: true,
    costs: [
      [RESOURCES.STAMINA, 1],
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.ARRACHS_WEB_1]
    ],
    requirements: []
  }),
  [UPGRADES.ELVENFOIL_1]: new Upgrade({
    name: "Elvenfoil Glitter 1",
    id: UPGRADES.ELVENFOIL_1,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "Start collecting the glitter that falls off of your ",
        createElement("span", { className: GetResourceColor(RESOURCES.ELVENFOIL) }, GetResourceName(RESOURCES.ELVENFOIL)),
      )
    },
    purchased: false,
    unlocked: true,
    costs: [
      [RESOURCES.STAMINA, 1],
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.ELVENFOIL_1]
    ],
    requirements: []
  }),
  [UPGRADES.ELIXIR_1]: new Upgrade({
    name: "Stamina Elixirs",
    id: UPGRADES.ELIXIR_1,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "Modify your ",
        createElement("span", { className: GetResourceColor(RESOURCES.ELIXIR) }, GetResourceName(RESOURCES.ELIXIR)),
        " to increase your ",
        createElement("span", { className: GetResourceColor(RESOURCES.STAMINA) }, GetResourceName(RESOURCES.STAMINA)),
        " regeneration"
      )
    },
    purchased: false,
    unlocked: false,
    costs: [
      [RESOURCES.ELIXIR, 3],
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.ELIXIR_1]
    ],
    requirements: [
      [REQUIREMENT_TYPE.RESOURCE, RESOURCES.ELIXIR, 1]
    ]
  }),
  [UPGRADES.ELIXIR_2]: new Upgrade({
    name: "Mana Elixirs",
    id: UPGRADES.ELIXIR_2,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "Modify your ",
        createElement("span", { className: GetResourceColor(RESOURCES.ELIXIR) }, GetResourceName(RESOURCES.ELIXIR)),
        " to increase your ",
        createElement("span", { className: GetResourceColor(RESOURCES.MANA) }, GetResourceName(RESOURCES.MANA)),
        " regeneration"
      )
    },
    purchased: false,
    unlocked: false,
    costs: [
      [RESOURCES.ELIXIR, 3],
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.ELIXIR_2]
    ],
    requirements: [
      [REQUIREMENT_TYPE.RESOURCE, RESOURCES.ELIXIR, 1],
      [REQUIREMENT_TYPE.RESOURCE, RESOURCES.MANA, 1]
    ]
  }),
  [UPGRADES.UNLOCK_MANA]: new Upgrade({
    name: "Basics of the Arcane",
    id: UPGRADES.UNLOCK_MANA,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "A tome that contains very basic magical incantations",
      )
    },
    purchased: false,
    unlocked: true,
    costs: [
      [RESOURCES.STAMINA, 50],
      [RESOURCES.RUNE, 1],
      [RESOURCES.HERB, 10],
      [RESOURCES.CLOTH, 10]
    ],
    results: [
      [UPGRADE_TYPE.RESOURCE, RESOURCES.MANA]
    ],
    requirements: []
  }),
  [UPGRADES.PURCHASE_LOOM]: new Upgrade({
    name: "Purchase a Loom",
    id: UPGRADES.PURCHASE_LOOM,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "Purchase a loom for all of your weaving needs",
      )
    },
    purchased: false,
    unlocked: true,
    costs: [
      [RESOURCES.GOLD, 75]
    ],
    results: [
      [UPGRADE_TYPE.RESOURCE, RESOURCES.CLOTH]
    ],
    requirements: []
  }),
  [UPGRADES.CLOTHING_1]: new Upgrade({
    name: "Basic Cloth Sandals",
    id: UPGRADES.CLOTHING_1,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "These light sandles protect your feet",
      )
    },
    purchased: false,
    unlocked: true,
    costs: [
      [RESOURCES.STAMINA, 1]
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.CLOTHING_1]
    ],
    requirements: []
  }),
  [UPGRADES.CLOTHING_2]: new Upgrade({
    name: "Basic Cloth Hat",
    id: UPGRADES.CLOTHING_2,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "This hat keeps your head cool in the sun",
      )
    },
    purchased: false,
    unlocked: false,
    costs: [
      [RESOURCES.CLOTH, 5]
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.CLOTHING_1]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.CLOTHING_1, 1]
    ]
  }),
  [UPGRADES.CLOTHING_3]: new Upgrade({
    name: "Basic Cloth Shirt",
    id: UPGRADES.CLOTHING_3,
    description: function (): JSX.Element {
      return createElement(
        "span",
        [],
        "This shirt protects you from the elements, slighty",
      )
    },
    purchased: false,
    unlocked: false,
    costs: [
      [RESOURCES.CLOTH, 7]
    ],
    results: [
      [UPGRADE_TYPE.BONUS, BONUSES.CLOTHING_1]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.CLOTHING_2, 1]
    ]
  }),
}
