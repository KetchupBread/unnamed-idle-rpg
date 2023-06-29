import React from 'react';
import { RESOURCES, GetResourceColor, GetResourceName } from './ResourceData';
import { Spell, Resource } from './Types';

export const enum SPELLS {
  INVIGORATE
}

export enum SPELL_TAGS {
  BASIC
}

export const GetSpellTagName = (tag: number): string => {
  switch(tag) {
    case SPELL_TAGS.BASIC: return 'Basic';
    default: return '';
  }
}

export const spellListWithTags: Record<number, () => number[]> = {
  [SPELL_TAGS.BASIC]: function() {
    return Object.values(spellList).filter((spell) => spell.tag == SPELL_TAGS.BASIC).map((spell) => spell.id);
  },
}

export const spellList: Record<number, Spell> = {
  [SPELLS.INVIGORATE]: new Spell({
    name: "Invigorate",
    id: SPELLS.INVIGORATE,
    description: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Use your mental prowess to increase your physical recovery"
      )
    },
    effectDescription: function(): JSX.Element {
      return React.createElement(
        "span",
        [],
        "Increases your base ",
        React.createElement("span", { className: GetResourceColor(RESOURCES.STAMINA) }, GetResourceName(RESOURCES.STAMINA)),
        " regeneration by ",
        React.createElement("span", { className: "bold" }, 0.5),
      )
    },
    tag: SPELL_TAGS.BASIC,
    duration: [0, 10],
    activateEffectFunction: function(resourceList: Record<number, Resource>) {
      resourceList[RESOURCES.STAMINA].incrementRateBase(0.5);
      return;
    },
    deactivateEffectFunction: function(resourceList: Record<number, Resource>) {
      resourceList[RESOURCES.STAMINA].incrementRateBase(-0.5);
      return;
    },
    active: false,
    costs: [
      [RESOURCES.STAMINA, 0]
    ],
    unlocked: true,
  })
}
