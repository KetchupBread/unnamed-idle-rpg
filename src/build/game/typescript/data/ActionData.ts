import React from 'react';
import { Action, REQUIREMENT_TYPE, REWARD_TYPE } from './Types';
import { RESOURCES, GetResourceColor, GetResourceName } from './ResourceData';
import { UPGRADES } from './UpgradeData';

export const enum ACTIONS {
  BEG,
  HELP_ON_FARM,
  BREW_ELIXIR,
  WEAVE_CLOTH,
  OVEREXERT,
  TRAIN,
  INFUSE_ELVENFOIL,
  INFUSE_DEMON_SPROUT,
  INFUSE_WORMS_TOOTH,
  INFUSE_ARRACHS_WEB,
  SEARCH_FOR_SEEDS,
  DEBUG,
  DEBUG_2,
}

export enum ACTION_TAGS {
  BASIC,
  MAGICAL,
  HERBOLOGY
}

export const GetActionTagName = (tag: number): string => {
  switch(tag) {
    case ACTION_TAGS.BASIC: return "Basic";
    case ACTION_TAGS.MAGICAL: return "Magical";
    case ACTION_TAGS.HERBOLOGY: return "Herbology";
    default: return "";
  }
}

export const actionListWithTags: Record<number, () => number[]> = {
  [ACTION_TAGS.BASIC]: function() {
    return Object.values(actionList).filter((action) => action.tag == ACTION_TAGS.BASIC).map((action) => action.id);
  },
  [ACTION_TAGS.MAGICAL]: function() {
    return Object.values(actionList).filter((action) => action.tag == ACTION_TAGS.MAGICAL).map((action) => action.id);
  },
  [ACTION_TAGS.HERBOLOGY]: function() {
    return Object.values(actionList).filter((action) => action.tag == ACTION_TAGS.HERBOLOGY).map((action) => action.id);
  }
}

export const actionList: Record<number, Action> = {
  [ACTIONS.BEG]: new Action({
    name: "Beg",
    id: ACTIONS.BEG,
    tag: ACTION_TAGS.BASIC,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Beg for ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.GOLD) }, GetResourceName(RESOURCES.GOLD)),
        " on the street"
      )
    },
    costs: [
      [RESOURCES.STAMINA, 5]
    ],
    requirements: [],
    unlocked: true,
    level: 1,
    experience: [0, 10],
    experiencePerAction: 1,
    levelFunction: function() {
      return this.rewards = this.rewards.map((reward: number[]) => {
        reward[3] = reward[2] + (this.level * 0.5);
        return reward;
      })
    },
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.GOLD, 1, 1, 1]
    ]
  }),
  [ACTIONS.HELP_ON_FARM]: new Action({
    name: "Help Local Farmer",
    id: ACTIONS.HELP_ON_FARM,
    tag: ACTION_TAGS.BASIC,
    description: () => "Help a local farmer with his fields",
    costs: [
      [RESOURCES.STAMINA, 15]
    ],
    requirements: [],
    unlocked: true,
    level: 1,
    experience: [0, 25],
    experiencePerAction: 1,
    levelFunction: function () {
      return this.rewards = this.rewards.map((reward: number[]) => {
        reward[3] = reward[2] + this.level;
        reward[4] *= 2;
        return reward;
      })
    },
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.GOLD, 3, 3, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.HERB, 1, 1, 0.5],
      [REWARD_TYPE.RESOURCE, RESOURCES.SEED, 1, 1, 0.1],
      [REWARD_TYPE.RESOURCE, RESOURCES.RUNE, 1, 1, 0.01]
    ]
  }),
  [ACTIONS.BREW_ELIXIR]: new Action({
    name: "Brew Elixir",
    id: ACTIONS.BREW_ELIXIR,
    tag: ACTION_TAGS.MAGICAL,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Attempt to brew a powerful ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.ELIXIR) }, GetResourceName(RESOURCES.ELIXIR)),
      )
    },
    costs: [
      [RESOURCES.HERB, 5],
      [RESOURCES.MANA, 10],
      [RESOURCES.ARRACHS_WEB, 1],
      [RESOURCES.ELVENFOIL, 1],
      [RESOURCES.WORMS_TOOTH, 1],
      [RESOURCES.DEMON_SPROUT, 1],
    ],
    requirements: [
      [REQUIREMENT_TYPE.RESOURCE, RESOURCES.HERB, 1],
      [REQUIREMENT_TYPE.RESOURCE, RESOURCES.MANA, 1]
    ],
    unlocked: false,
    level: 1,
    experience: [0, 1],
    experiencePerAction: 1,
    levelFunction: function() {
      // Level 2 Brew Elixir adds Prestige as a reward
      if (this.level == 2) {
        this.rewards.push([REWARD_TYPE.RESOURCE, RESOURCES.PRESTIGE, 1, 1, 1]);
      }
      return this.rewards = this.rewards.map((reward: number[]) => {
        if (reward[1] != RESOURCES.PRESTIGE) {
          reward[3] = (reward[2] * this.level);
          reward[4] = reward[4] + 0.125;
        }
        return reward;
      })
    },
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.ELIXIR, 1, 1, 0.75]
    ]
  }),
  [ACTIONS.WEAVE_CLOTH]: new Action({
    name: "Weave Cloth",
    id: ACTIONS.WEAVE_CLOTH,
    tag: ACTION_TAGS.BASIC,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Weave ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.CLOTH) }, GetResourceName(RESOURCES.CLOTH)),
        " at a loom"
      )
    },
    costs: [
      [RESOURCES.HERB, 3]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.PURCHASE_LOOM],
    ],
    unlocked: false,
    level: 1,
    experience: [0, 100],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.CLOTH, 1, 1, 1]
    ]
  }),
  [ACTIONS.TRAIN]: new Action({
    name: "Train",
    id: ACTIONS.TRAIN,
    tag: ACTION_TAGS.BASIC,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Increase your ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.STAMINA) }, GetResourceName(RESOURCES.STAMINA)),
        " through exercise"
      )
    },
    costs: [
      [RESOURCES.STAMINA, 10]
    ],
    requirements: [],
    unlocked: true,
    level: 1,
    experience: [0, 50],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.MAX_RESOURCE, RESOURCES.STAMINA, 1, 5, 1]
    ]
  }),
  [ACTIONS.OVEREXERT]: new Action({
    name: "Overexert Yourself",
    id: ACTIONS.OVEREXERT,
    tag: ACTION_TAGS.BASIC,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Overexert yourself sacrificing ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.STAMINA) }, "Stamina"),
        " for ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.BLOOD) }, "Blood"),
      )
    },
    costs: [
      [RESOURCES.STAMINA, 1],
    ],
    requirements: [
      [REQUIREMENT_TYPE.RESOURCE, RESOURCES.STAMINA, 20]
    ],
    unlocked: false,
    level: 1,
    experience: [0, 50],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.BLOOD, 1, 1, 1]
    ]
  }),
  [ACTIONS.INFUSE_ELVENFOIL]: new Action({
    name: "Infuse Elvenfoil",
    id: ACTIONS.INFUSE_ELVENFOIL,
    tag: ACTION_TAGS.HERBOLOGY,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Infuse a common herb into an ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.ELVENFOIL) }, "Elvenfoil"),
        " through a basic incantation"
      )
    },
    costs: [
      [RESOURCES.HERB, 1],
      [RESOURCES.GOLD, 25],
      [RESOURCES.MANA, 10]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.UNLOCK_MANA]
    ],
    unlocked: false,
    level: 1,
    experience: [0, 50],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.ELVENFOIL, 1, 1, 1]
    ]
  }),
  [ACTIONS.INFUSE_ARRACHS_WEB]: new Action({
    name: "Infuse Arrach's Web",
    id: ACTIONS.INFUSE_ARRACHS_WEB,
    tag: ACTION_TAGS.HERBOLOGY,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Infuse a common herb into an ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.ARRACHS_WEB) }, "Arrach's Web"),
        " through a basic incantation"
      )
    },
    costs: [
      [RESOURCES.HERB, 8],
      [RESOURCES.MANA, 10]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.UNLOCK_MANA]
    ],
    unlocked: false,
    level: 1,
    experience: [0, 50],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.ARRACHS_WEB, 1, 1, 1]
    ]
  }),
  [ACTIONS.INFUSE_WORMS_TOOTH]: new Action({
    name: "Infuse Worm's Tooth",
    id: ACTIONS.INFUSE_WORMS_TOOTH,
    tag: ACTION_TAGS.HERBOLOGY,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Infuse a common herb into a ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.WORMS_TOOTH) }, "Worm's Tooth"),
        " through a basic incantation"
      )
    },
    costs: [
      [RESOURCES.HERB, 1],
      [RESOURCES.GOLD, 25],
      [RESOURCES.MANA, 10]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.UNLOCK_MANA]
    ],
    unlocked: false,
    level: 1,
    experience: [0, 50],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.WORMS_TOOTH, 1, 1, 1]
    ]
  }),
  [ACTIONS.INFUSE_DEMON_SPROUT]: new Action({
    name: "Infuse Demon Sprout",
    id: ACTIONS.INFUSE_DEMON_SPROUT,
    tag: ACTION_TAGS.HERBOLOGY,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "Infuse a common herb into a ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.DEMON_SPROUT) }, "Demon Sprout"),
        " through a basic incantation"
      )
    },
    costs: [
      [RESOURCES.HERB, 1],
      [RESOURCES.BLOOD, 10],
      [RESOURCES.MANA, 10]
    ],
    requirements: [
      [REQUIREMENT_TYPE.UPGRADE, UPGRADES.UNLOCK_MANA]
    ],
    unlocked: false,
    level: 1,
    experience: [0, 50],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.DEMON_SPROUT, 1, 1, 1]
    ]
  }),
  [ACTIONS.SEARCH_FOR_SEEDS]: new Action({
    name: "Search for Seeds",
    id: ACTIONS.SEARCH_FOR_SEEDS,
    tag: ACTION_TAGS.HERBOLOGY,
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Search through your ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.HERB) }, GetResourceName(RESOURCES.HERB) ),
        " to find seeds"
      )
    },
    costs: [
      [RESOURCES.HERB, 2],
    ],
    requirements: [
      [REQUIREMENT_TYPE.RESOURCE, RESOURCES.HERB, 0],
      [REQUIREMENT_TYPE.RESOURCE, RESOURCES.SEED, 0]
    ],
    unlocked: false,
    level: 1,
    experience: [0, 100],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.SEED, 1, 1, 0.5]
    ],
  }),
  [ACTIONS.DEBUG]: new Action({
    name: "TEST",
    id: ACTIONS.DEBUG,
    tag: ACTION_TAGS.BASIC,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "TEST ACTION",
      )
    },
    costs: [],
    requirements: [],
    unlocked: true,
    level: 1,
    experience: [0, 50],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.STAMINA, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.HERB, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.RUNE, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.SEED, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.ARRACHS_WEB, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.DEMON_SPROUT, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.WORMS_TOOTH, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.ELVENFOIL, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.ELIXIR, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.PRESTIGE, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.MANA, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.BLOOD, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.GOLD, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.CLOTH, 1, 100, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.FISH, 1, 100, 1],
    ]
  }),
  [ACTIONS.DEBUG_2]: new Action({
    name: "TEST_2",
    id: ACTIONS.DEBUG_2,
    tag: ACTION_TAGS.BASIC,
    description: (): JSX.Element => {
      return React.createElement(
        "span",
        [],
        "TEST ACTION",
      )
    },
    costs: [],
    requirements: [],
    unlocked: true,
    level: 1,
    experience: [0, 50],
    experiencePerAction: 1,
    rewards: [
      [REWARD_TYPE.RESOURCE, RESOURCES.STAMINA, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.HERB, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.RUNE, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.SEED, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.ARRACHS_WEB, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.DEMON_SPROUT, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.WORMS_TOOTH, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.ELVENFOIL, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.ELIXIR, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.PRESTIGE, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.MANA, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.BLOOD, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.GOLD, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.CLOTH, 1, -1, 1],
      [REWARD_TYPE.RESOURCE, RESOURCES.FISH, 1, -1, 1],
    ]
  }),
}
