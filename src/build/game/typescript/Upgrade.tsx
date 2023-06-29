import React, { useContext, useState } from 'react';
import { useFloating, useHover, flip, shift, offset } from '@floating-ui/react';

import { GameContext } from './App';
import {
  Resource as ResourceType,
  Upgrade as UpgradeType,
  Bonus as BonusType,
  Effect as EffectType,
  IGameContext,
} from './data/Types';
import { UPGRADE_TYPE } from './data/UpgradeData';
import { GetResourceColor, GetResourceName } from './data/ResourceData';

export const Upgrade: React.FC<UpgradeType> = ({ ...props }): JSX.Element => {
  const gameData = useContext(GameContext) as IGameContext;

  const [ showTooltip, setShowTooltip ] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: showTooltip,
    onOpenChange: setShowTooltip,
    placement: 'bottom-end',
    middleware: [
      flip(),
      shift(),
      offset(5)
    ]
  });

  const FormatResults = ([resultType, resultId, effectToAdd]: number[], index: number): JSX.Element | null => {
    switch (resultType) {
      case UPGRADE_TYPE.BONUS: {
        let tooltipHeader: JSX.Element | null = null;

        gameData.bonuses[resultId].level[0] == 0
          ? tooltipHeader = (
              <p className='tooltip-line'>Unlocks the <span className='bold'>{ gameData.bonuses[resultId].name }</span> bonus</p>
            )
          : tooltipHeader = (
              <p className='tooltip-line'>Increases the level of the <span className='bold'>{ gameData.bonuses[resultId].name }</span> bonus</p>
            )

        return (
          <div key={ resultId + index }>
            <div className='tooltip-header'>
              { tooltipHeader }
              <p className='tooltip-line'><span className='bold'>Level</span>: { gameData.bonuses[resultId].level[0] }/{ gameData.bonuses[resultId].level[1] }</p>
            </div>
            { gameData.bonuses[resultId].effects.map((effect) => {
              return (
                <>
                  <p className='tooltip-line' key={ "effect" + effect}> - { gameData.effects[effect].description() }</p>
                  <p className='tooltip-line'>&nbsp; Applies to:</p>
                  { gameData.effects[effect].appliesTo.map((resource) => {
                    if (resource == -1) return (<p key={ `${resource} + ${effect}` } className='tooltip-line bonus-description'>&nbsp; - <span className='bold'>All Resources</span></p>)
                    return (<p key={ `${resource} + ${effect}` } className='tooltip-line bonus-description'>&nbsp; - <span className={ GetResourceColor(resource) }>{ GetResourceName(resource) }</span></p>)
                  }) }
                </>
              )
            }) }
          </div>
        )
      }
      case UPGRADE_TYPE.ADD_EFFECT: {
        return (
          <div key={ resultId + index }>
            <p className='tooltip-line'>Augments the <span className='bold'>{ gameData.bonuses[resultId].name }</span> bonus adding the following: </p>
              <p className='tooltip-line'> - { gameData.effects[effectToAdd].description() }</p>
              <p className='tooltip-line'>&nbsp; Applies to:</p>
              { gameData.effects[effectToAdd].appliesTo.map((resource) => {
                if (resource == -1) return (<p key={ `${ resource } tooltip-line` } className='tooltip-line bonus-description'>&nbsp; - <span className='bold'>All Resources</span></p>)
                return (<p key={ `${ resource } tooltip-line` } className='tooltip-line bonus-description'>&nbsp; - <span className={ GetResourceColor(resource) }>{ GetResourceName(resource) }</span></p>)
              }) }
          </div>
        )
      }
      case UPGRADE_TYPE.RESOURCE: {
        return (
          <div key={ resultId + index + 'Unlock Resource' }>
            <p className='tooltip-line' key={ `${props.name} ${resultId} ${index} unl` }>Unlocks <span className={ GetResourceColor(resultId) }>{ gameData.resources[resultId].name }</span></p>
          </div>
        )
      }
      default: return null;
    }
  }

  const buyUpgrade = () => {
    const hasResources: boolean = props.costs.every(([costId, costAmount]: number[]) => (costAmount <= gameData.resources[costId].amount));

    if (!hasResources) return;

    const nextResources: Record<number, ResourceType> = gameData.resources;
    const nextUpgrades: Record<number, UpgradeType> = gameData.upgrades;
    const nextBonuses: Record<number, BonusType> = gameData.bonuses;
    const nextEffects: Record<number, EffectType> = gameData.effects;

    nextUpgrades[props.id].purchased = true;

    props.costs.forEach(([costId, costAmount]) => nextResources[costId].increment(-costAmount));

    props.results.forEach(([effectType, resultId, effectToAdd]: number[]) => {
      if (effectType != UPGRADE_TYPE.ADD_EFFECT) return;
      if (nextBonuses[resultId].effects.includes(effectToAdd)) return;
      nextBonuses[resultId].effects.push(effectToAdd);
    });

    props.results.forEach(([effectType, resultId]: number[]) => {
      switch(effectType) {
        case UPGRADE_TYPE.BONUS: {
          nextBonuses[resultId].increaseLevel(gameData.effects);
          nextBonuses[resultId].unlock(gameData.effects);
          nextBonuses[resultId].effects.forEach((effectId: number) => {
            const currentEffect = gameData.effects[effectId];
            if (currentEffect.appliesTo[0] == -1) {
              Object.keys(nextResources).forEach((r: string) => {
                const currentResource = nextResources[parseInt(r)];
                if (!currentResource.bonuses.includes(resultId)) currentResource.bonuses.push(resultId);
                currentResource.rate = currentResource.recalculate(nextBonuses, nextEffects);
                if (currentResource.rateBase == 0) currentResource.rateBase = currentResource.recalculate(nextBonuses, nextEffects);
              });
            } else {
              currentEffect.appliesTo.forEach((resource) => {
                const currentResource = nextResources[resource];
                if (!currentResource.bonuses.includes(resultId)) currentResource.bonuses.push(resultId);
                currentResource.rate = currentResource.recalculate(nextBonuses, nextEffects);
                if (currentResource.rateBase == 0) currentResource.rateBase = currentResource.recalculate(nextBonuses, nextEffects);
              })
            }
          })
          break;
        }
        case UPGRADE_TYPE.RESOURCE: {
          nextResources[resultId].unlock();
          break;
        }
      }
    })

    gameData.setBonuses(nextBonuses);
    gameData.setResources(nextResources);
    gameData.setUpgrades(nextUpgrades);
  }

  useHover(context, { move: false });

  return (
    <>
      <p className='button' ref={ refs.setReference } onClick={ () => buyUpgrade() }>{ props.name }</p>
      { showTooltip &&
        <div className='tooltip' ref={ refs.setFloating } style={ floatingStyles }>
          <div className='tooltip-header'>
            <p className='tooltip-line'><span className='bold tooltip-h'>{ props.name }</span></p>
          </div>
          <p className='tooltip-line'><span className='italic'>{ props.description() }</span></p>
          <hr />
          { props.costs.length > 0 &&
            <>
              <p className='tooltip-line'>Costs:</p>
              { props.costs.map((cost: number[]) => {
                return (
                  <p className='tooltip-line' key={ `${props.name} ${cost[0]}`}>
                    { gameData.resources[cost[0]].amount >= cost[1]
                      ? <><span className='bold'>{ cost[1] }</span> <span className={ GetResourceColor(cost[0]) }> { GetResourceName(cost[0]) }</span></>
                      : <span className='crimson'><span className='bold'>{ cost[1] }</span> { GetResourceName(cost[0]) }</span>
                    }
                  </p>
                )
              }) }
              <hr />
            </>
          }

          { props.results.length > 0 &&
            <>
              <p className='tooltip-line'>Effects:</p>
              { props.results.map((result: number[], index: number) => {
                return FormatResults(result, index)
              }) }
            </>
          }

        </div>
      }
    </>
  )
}
