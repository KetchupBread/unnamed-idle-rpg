import React, { useState, useContext } from 'react';
import { useFloating, useHover, flip, shift, offset } from '@floating-ui/react';

import { GameContext } from './App';
import { Spell as SpellType, Resource as ResourceType, IGameContext } from './data/Types';
import { GetResourceColor, GetResourceName } from './data/ResourceData';

export const Spell: React.FC<SpellType> = ({ ...props }): JSX.Element => {
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

  useHover(context, { move: false });

  const doSpell = () => {
    const hasResources: boolean = props.costs.every(([costId, costAmount]: number[]) => {
      if (costAmount > gameData.resources[costId].amount) return false;
      return true;
    });

    if (hasResources) {
      const nextResources: Record<number, ResourceType> = gameData.resources;
      const nextSpells: Record<number, SpellType>  = gameData.spells;

      props.costs.forEach(([costId, costAmount]: number[]) => nextResources[costId].increment(-costAmount));

      if (nextSpells[props.id].duration[0] != 0) {
        nextSpells[props.id].deactivateEffectFunction(gameData.resources);
      }

      nextSpells[props.id].active = true;
      nextSpells[props.id].duration[0] = 0;
      nextSpells[props.id].activateEffectFunction(gameData.resources);

      gameData.setSpells(nextSpells);
      gameData.setResources(nextResources);

      return;
    }
  }

  return (
    <>
      <div
        className={ `spell-button ${ props.active ? 'active' : null }` }
        ref={ refs.setReference }
        onClick={ () => doSpell() }
      >
        <span className='spell-name'>{ props.name }</span>
        <span className='spell-duration'>{ (props.duration[0]).toFixed(2) }/{ props.duration[1] }s</span>
      </div>
      { showTooltip &&
        <div className='tooltip' ref={ refs.setFloating } style={ floatingStyles }>
          <p className='tooltip-line bold tooltip-h'>{ props.name }</p>
          <p className='tooltip-line italic'>{ props.description() }</p>
          <hr />
          { props.costs.length > 0 &&
            <>
              <p className='tooltip-line'>Costs:</p>
              { props.costs.map((cost: number[], index: number) => {
                return (
                  <p className='tooltip-line' key={ `${props.name} ${cost[0]} ${index}` }>
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
          <p className='tooltip-line'>Effect:</p>
          <p className='tooltip-line'>{ props.effectDescription() }</p>
          <hr />
          <p className='tooltip-line bold'>Duration: { props.duration[1] } seconds</p>
        </div>
      }
    </>
  )
}
