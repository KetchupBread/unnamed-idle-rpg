import { Resource } from './Types';

export enum RESOURCE_TAGS {
  PHYSICAL,
  ITEM,
  MENTAL,
  BASIC,
  MATERIAL,
  MAGICAL,
  HERB,
  SPECIAL,
  DIVINE
}

export const enum RESOURCES {
  STAMINA,
  GOLD,
  HERB,
  ARRACHS_WEB,
  DEMON_SPROUT,
  WORMS_TOOTH,
  ELVENFOIL,
  ELIXIR,
  MANA,
  BLOOD,
  RUNE,
  CLOTH,
  PRESTIGE,
  SEED,
  AMBROSIA,
  FISH
}

export const GetResourceTagName = (tag: number): string => {
  switch (tag) {
    case RESOURCE_TAGS.PHYSICAL: return "Physical";
    case RESOURCE_TAGS.ITEM: return "Items";
    case RESOURCE_TAGS.MENTAL: return "Mental";
    case RESOURCE_TAGS.BASIC: return "Basic";
    case RESOURCE_TAGS.MATERIAL: return "Materials";
    case RESOURCE_TAGS.MAGICAL: return "Magical";
    case RESOURCE_TAGS.DIVINE: return "Divine";
    case RESOURCE_TAGS.HERB: return "Herb";
    default: return "";
  }
}

export const GetResourceName = (id: number) => {
  if (!resourceList[id].unlocked) return "???";
  return resourceList[id].name;
}

export const GetResourceColor = (id: number) => {
  return resourceList[id].color;
}


export const resourceListWithTags: Record<number, () => number[]> = {
  [RESOURCE_TAGS.PHYSICAL]: function() {
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.PHYSICAL).map((resource) => resource.id);
  },
  [RESOURCE_TAGS.ITEM]: () =>{
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.ITEM).map((resource) => resource.id);
  },
  [RESOURCE_TAGS.MENTAL]: function(){
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.MENTAL).map((resource) => resource.id);
  },
  [RESOURCE_TAGS.BASIC]: function(){
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.BASIC).map((resource) => resource.id);
  },
  [RESOURCE_TAGS.MATERIAL]: function(){
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.MATERIAL).map((resource) => resource.id);
  },
  [RESOURCE_TAGS.MAGICAL]: function(){
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.MAGICAL).map((resource) => resource.id);
  },
  [RESOURCE_TAGS.HERB]: function(){
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.HERB).map((resource) => resource.id);
  },
  [RESOURCE_TAGS.SPECIAL]: function(){
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.SPECIAL).map((resource) => resource.id);
  },
  [RESOURCE_TAGS.DIVINE]: function(){
    return Object.values(resourceList).filter((resource) => resource.tag == RESOURCE_TAGS.DIVINE).map((resource) => resource.id);
  },
}

export const resourceList: Record<number, Resource> = {
  [RESOURCES.STAMINA]: new Resource({
    name: "Stamina",
    id: RESOURCES.STAMINA,
    color: "green",
    description: () => "Physical endurance",
    amount: 0,
    amountMax: 10,
    amountMaxBase: 0,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: true,
    bonuses: [],
    tag: RESOURCE_TAGS.PHYSICAL,
  }),
  [RESOURCES.GOLD]: new Resource({
    name: "Gold",
    id: RESOURCES.GOLD,
    color: "yellow",
    description: function (): JSX.Element | string {
      if (this.amount < 100) {
        return "You are poor";
      } else {
        return "You are not as poor"
      }
    },
    amount: 0,
    amountMax: 100,
    amountMaxBase: 100,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: true,
    bonuses: [],
    tag: RESOURCE_TAGS.ITEM,
  }),
  [RESOURCES.HERB]: new Resource({
    name: "Herb",
    id: RESOURCES.HERB,
    color: "green-dark",
    description: () => "Leafy",
    amount: 0,
    amountMax: 5,
    amountMaxBase: 5,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.HERB,
  }),
  [RESOURCES.ARRACHS_WEB]: new Resource({
    name: "Arrachs Web",
    id: RESOURCES.ARRACHS_WEB,
    color: "arrachs-web",
    description: () => "A silky eight leafed herb, it glows faintly",
    amount: 0,
    amountMax: 5,
    amountMaxBase: 5,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.HERB,

  }),
  [RESOURCES.DEMON_SPROUT]: new Resource({
    name: "Demon Sprout",
    id: RESOURCES.DEMON_SPROUT,
    color: "demon-sprout",
    description: () => "Leafy",
    amount: 0,
    amountMax: 5,
    amountMaxBase: 5,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.HERB,
  }),
  [RESOURCES.WORMS_TOOTH]: new Resource({
    name: "Worm's Tooth",
    id: RESOURCES.WORMS_TOOTH,
    color: "worms-tooth",
    description: () => "Leafy",
    amount: 0,
    amountMax: 5,
    amountMaxBase: 5,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.HERB,
  }),
  [RESOURCES.ELVENFOIL]: new Resource({
    name: "Elvenfoil",
    id: RESOURCES.ELVENFOIL,
    color: "elvenfoil",
    description: () => "A shimmering herb",
    amount: 0,
    amountMax: 5,
    amountMaxBase: 5,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.HERB,
  }),
  [RESOURCES.SEED]: new Resource({
    name: "Seed",
    id: RESOURCES.SEED,
    color: "seed",
    description: () => "",
    amount: 0,
    amountMax: 1,
    amountMaxBase: 1,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.HERB
  }),
  [RESOURCES.ELIXIR]: new Resource({
    name: "Elixir",
    id: RESOURCES.ELIXIR,
    color: "purple",
    description: () => "A powerful tonic",
    amount: 0,
    amountMax: 3,
    amountMaxBase: 3,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.MAGICAL
  }),
  [RESOURCES.MANA]: new Resource({
    name: "Mana",
    id: RESOURCES.MANA,
    color: "blue",
    description: () => "The most basic magical essence",
    amount: 0,
    amountMax: 10,
    amountMaxBase: 10,
    rate: 0.1,
    rateBase: 0.1,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.MAGICAL
  }),
  [RESOURCES.BLOOD]: new Resource({
    name: "Blood",
    id: RESOURCES.BLOOD,
    color: "crimson",
    description: () => "Life essence",
    amount: 0,
    amountMax: 3,
    amountMaxBase: 0,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: true,
    bonuses: [],
    tag: RESOURCE_TAGS.PHYSICAL,
  }),
  [RESOURCES.RUNE]: new Resource({
    name: "Rune",
    id: RESOURCES.RUNE,
    color: "runestone",
    description: () => "A gently humming stone",
    amount: 0,
    amountMax: 1,
    amountMaxBase: 1,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.MAGICAL,
  }),
  [RESOURCES.CLOTH]: new Resource({
    name: "Cloth",
    id: RESOURCES.CLOTH,
    color: "beige",
    description: () => "A bolt of finely woven cloth",
    amount: 0,
    amountMax: 10,
    amountMaxBase: 10,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.ITEM
  }),
  [RESOURCES.PRESTIGE]: new Resource({
    name: "Prestige",
    id: RESOURCES.PRESTIGE,
    color: "prestige",
    description: () => "You exude a powerful aura",
    amount: 0,
    amountMax: -1,
    amountMaxBase: -1,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: true,
    bonuses: [],
    tag: RESOURCE_TAGS.DIVINE,
  }),
  [RESOURCES.AMBROSIA]: new Resource({
    name: "Ambrosia",
    id: RESOURCES.AMBROSIA,
    color: "ambrosia",
    description: () => "Nectar of the Gods",
    amount: 0,
    amountMax: 3,
    amountMaxBase: 0,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: true,
    bonuses: [],
    tag: RESOURCE_TAGS.DIVINE
  }),
  [RESOURCES.FISH]: new Resource({
    name: "Fish",
    id: RESOURCES.FISH,
    color: "fish",
    description: () => "Fishy",
    amount: 0,
    amountMax: 10,
    amountMaxBase: 0,
    rate: 0,
    rateBase: 0,
    ratePercent: 1,
    rateAdditive: 0,
    unlocked: false,
    bonuses: [],
    tag: RESOURCE_TAGS.ITEM,
  }),
}
