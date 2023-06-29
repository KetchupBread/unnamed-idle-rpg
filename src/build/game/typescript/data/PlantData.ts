import { Plant } from './Types';
import { RESOURCES } from './ResourceData';
import { BONUSES } from './BonusData';

export const enum PLANTS {
  EMPTY_PLOT,
  COMMON_HERB,
  ELVENFOIL,
  DEMON_SPROUT,
  ARRACHS_WEB,
  WORMS_TOOTH,
}

export const plantList: Record<number, Plant> = {
  [PLANTS.EMPTY_PLOT]: new Plant({
    name: "Empty Plot",
    id: [PLANTS.EMPTY_PLOT],
    color: "brown",
    description: function () { return "Tilled empty soil, ready to have something planted in it" },
    unlocked: true,
    costs: [0, 0],
    effects: [],
    rewards: [],
    requirements: [],
    growth: [0, 0],
  }),
  [PLANTS.COMMON_HERB]: new Plant({
    name: "Common Herb",
    id: [PLANTS.COMMON_HERB],
    color: "green-dark",
    description: function() {
      if (this.growth[0] < 50) {
        return "The ground is damp, there is something planted here";
      } else if (this.growth[0] >= 50 && this.growth[0] < 150) {
        return "A small seedling breaks the surface of the soil";
      } else if (this.growth[0] >= 150 && this.growth[0] != this.growth[1]) {
        return "Leaves are starting to show, the herb is almost full grown"
      } else if (this.growth[0] == this.growth[1]){
        return "A fully grown common herb";
      }
    },
    unlocked: true,
    costs: [],
    effects: [],
    rewards: [
      [RESOURCES.HERB, 3, 5]
    ],
    requirements: [],
    growth: [0, 250],
    growthRate: 20,
  }),
  [PLANTS.ELVENFOIL]: new Plant({
    name: "Elvenfoil",
    id: [PLANTS.ELVENFOIL],
    color: "elvenfoil",
    description: function() { return "" },
    unlocked: true,
    costs: [
      [RESOURCES.SEED, 1],
      [RESOURCES.GOLD, 10]
    ],
    effects: [],
    rewards: [
      [RESOURCES.ELVENFOIL, 1, 2],
      [RESOURCES.GOLD, 5, 10]
    ],
    requirements: [],
    growth: [0, 250],
    growthRate: 20,
  }),
  [PLANTS.DEMON_SPROUT]: new Plant({
    name: "Demon Sprout",
    id: [PLANTS.DEMON_SPROUT],
    color: "demon-sprout",
    description: function() { return "" },
    unlocked: true,
    costs: [],
    effects: [],
    rewards: [
      [RESOURCES.DEMON_SPROUT, 1, 2],
      [RESOURCES.BLOOD, 5, -1]
    ],
    requirements: [],
    growth: [0, 250],
    growthRate: 20,
  }),
  [PLANTS.ARRACHS_WEB]: new Plant({
    name: "Arrachs Web",
    id: [PLANTS.ARRACHS_WEB],
    color: "arrachs-web",
    description: function() { return "" },
    unlocked: true,
    costs: [],
    effects: [
      [BONUSES.PLANT_ARRACHS_WEB_1]
    ],
    rewards: [
      [RESOURCES.ARRACHS_WEB, 1, 2],
      [RESOURCES.CLOTH, 1, 3]
    ],
    requirements: [],
    growth: [0, 250],
    growthRate: 200,
  }),
  [PLANTS.WORMS_TOOTH]: new Plant({
    name: "Worms Tooth",
    id: [PLANTS.WORMS_TOOTH],
    color: "worms-tooth",
    description: function() { return "" },
    unlocked: true,
    costs: [],
    effects: [],
    rewards: [
      [RESOURCES.WORMS_TOOTH, 1, 2],
      [RESOURCES.SEED, 1, 2]
    ],
    requirements: [],
    growth: [0, 250],
    growthRate: 20,
  }),
}
