import React, { createContext, useEffect, useState } from 'react';

import { ResourceContainer } from './ResourceContainer';
import { ActionContainer } from './ActionContainer';
import { SpellContainer } from './SpellContainer';
import { Header } from './Header';
import { Upgrade } from './Upgrade';
import { Plot } from './Plot';
import {
  Resource as ResourceType,
  Bonus as BonusType,
  Action as ActionType,
  Upgrade as UpgradeType,
  Effect as EffectType,
  Spell as SpellType,
  IGameContext,
  IPlot,
  IPlayerData
} from './data/Types';
import { PLANTS } from './data/PlantData';
import { playerData } from './data/PlayerData';
import { gameData } from './data/GameData';
import { GetActionTagName, actionListWithTags } from './data/ActionData';
import { GetResourceTagName, resourceListWithTags } from './data/ResourceData';
import { GetSpellTagName, spellListWithTags } from './data/SpellData';

export const GameContext = createContext<IGameContext | null>(null);
export const App: React.FC = (): JSX.Element => {
  const [resources, setResources] = useState<Record<number, ResourceType>>(gameData.resourceList);
  const [bonuses, setBonuses] = useState<Record<number, BonusType>>(gameData.bonusList);
  const [upgrades, setUpgrades] = useState<Record<number, UpgradeType>>(gameData.upgradeList);
  const [actions, setActions] = useState<Record<number, ActionType>>(gameData.actionList);
  const [effects, setEffects] = useState<Record<number, EffectType>>(gameData.effectList);
  const [plots, setPlots] = useState<Record<number, IPlot>>(gameData.plotList);
  const [player, setPlayer] = useState<IPlayerData>(gameData.playerData);
  const [spells, setSpells] = useState<Record<number, SpellType>>(gameData.spellList);

  const [gameSpeed] = useState<number>(gameData.gameSpeed);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setUpgrades((prev) =>
        Object.values(prev).map((upgrade) => {
          upgrade.hasRequirements(upgrades, resources);
          return upgrade;
        })
      );

      setActions((prev) =>
        Object.values(prev).map((action) => {
          action.hasRequirements(upgrades, resources);
          return action;
        })
      );

      setEffects((prev) =>
        Object.values(prev).map((effect) => {
          if (effect.basedOn) effect.recalculate(resources[effect.basedOn].amount);
          return effect;
        })
      );

      if (playerData.gardenUnlocked) {
        setPlots((prev) =>
          Object.values(prev).map((plot) => {
            if (!plot.unlocked) return plot;
            if (plot.fullyGrown) return plot;
            if (plot.plant.id == PLANTS.EMPTY_PLOT) return plot;

            if (plot.plant.isFullyGrown()) {
              const nextPlayer: IPlayerData = player;
              nextPlayer.plantsGrown += 1;
              plot.fullyGrown = true;
              setPlayer(nextPlayer);
            } else {
              plot.plant.increment(plot.plant.growthRate, gameSpeed);
            }
            return plot;
          })
        );
      }

      setResources((prev) =>
        Object.values(prev).map((resource) => {
          if (resource.unlocked) {
            resource.rate = resource.recalculate(bonuses, effects);
            return resource.increment(resource.rate, gameSpeed);
          }
          return resource;
        })
      );

      setSpells((prev) =>
        Object.values(prev).map((spell) => {
          if (spell.active) {
            spell.increment(1, gameSpeed);
            if (spell.duration[0] == 0) {
              spell.deactivateEffectFunction(resources);
            }
          }
          return spell;
        })
      );
    }, gameSpeed);

    return () => clearInterval(gameLoop);
  }, []);

  return (
    <GameContext.Provider value={{ gameSpeed, setActions, setBonuses, setEffects, setResources, setPlayer, setSpells, setUpgrades, setPlots, actions, bonuses, resources, upgrades, plots, player, effects, spells }}>
    <div className='game-screen'>
      <Header gameSpeed={ gameSpeed }/>
      <main className='panels'>
        <div className='panel'>
          <h3 className='panel-header'> Resources </h3>
          <div className='panel-resources'>
            { Object.entries(resourceListWithTags).map(([tag, resourcesTags]) => {
              const orderedResources = resourcesTags().filter(resource => resources[resource].unlocked);
              if (!orderedResources.length) return;
              return (<ResourceContainer key={ 'Resources ' + GetResourceTagName(parseInt(tag)) } resources={ orderedResources } tag={ tag } />)
            }) }
          </div>
        </div>
        <div className='panel'>
          <h3 className='panel-header'> Actions </h3>
          <div className='panel-actions'>
            { Object.entries(actionListWithTags).map(([tag, actionTags]) => {
              const orderedActions = actionTags().filter(action => actions[action].unlocked);
              if (!orderedActions.length) return;
              return (<ActionContainer key={ 'Actions ' + GetActionTagName(parseInt(tag)) } actions={ orderedActions } tag={ tag }/>)
            }) }
          </div>
        </div>
        <div className='panel'>
          <h3 className='panel-header'> Shop </h3>
          <div className='panel-upgrades'>
            { Object.entries(upgrades).map(([, upgrade]) => {
              if (upgrade.unlocked && !upgrade.purchased) return (<Upgrade key={ `${upgrade.name}` } { ...upgrade} />)
            }) }
          </div>
        </div>
        <div className='panel'>
          <h3 className='panel-header'> Spellbook</h3>
          <div className='panel-spellbook'>
            { Object.entries(spellListWithTags).map(([tag, spellTags]) => {
              const orderedSpells = spellTags().filter(spell => spells[spell].unlocked);
              if (!orderedSpells.length) return;
              return (<SpellContainer key={ 'Spells ' + GetSpellTagName(parseInt(tag)) } spells={ orderedSpells } tag={ tag }/>)
            }) }
          </div>
        </div>
        <div className='panel'></div>
        { playerData.gardenUnlocked &&
          <div className='panel garden'>
            <h3 className='panel-header'> Garden - Plants Grown: { player.plantsGrown }</h3>
            <div className='panel-garden'>
              { Object.entries(plots).map(([key, plot]) => {
                if (plot.unlocked) return (<Plot key={ 'Plot ' + key } plant={ plot.plant } pId={ Number(key) }/>);
              }) }
            </div>
          </div>
        }
      </main>
    </div>
    </GameContext.Provider>
  );
}
