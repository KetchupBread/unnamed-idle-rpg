import React, { useContext } from 'react';

import { GameContext } from './App';
import { Bonus as BonusType, EFFECT_TYPE, IGameContext } from './data/Types';

export const Bonus: React.FC<{bonus: BonusType, resource: number}> = ({ ...props}): JSX.Element => {
  const gameData = useContext(GameContext) as IGameContext;
  const formatLevel = () => {
    if (props.bonus.level[0] == props.bonus.level[1]) return (<span className='bold'>Level: MAX</span>);
    else if (props.bonus.level[1] == Infinity) return (<span><span className='bold'>Level</span>: { props.bonus.level } </span>)
    else return (<span><span className='bold'>Level</span>: { props.bonus.level[0] }/{ props.bonus.level[1] }</span>)
  }

  const formatTotal = (effect: number) => {
    const currentEffect = gameData.effects[effect];
    if (
      currentEffect.effectType == EFFECT_TYPE.BASE_AMOUNT ||
      currentEffect.effectType == EFFECT_TYPE.MAX_AMOUNT ||
      currentEffect.effectType == EFFECT_TYPE.TOTAL_AMOUNT
    ) {
      return (<p className='tooltip-line'>+<span className='bold'>{ currentEffect.amount[1].toFixed(2) }</span> Total</p>)
    } else {
      return (<p className='tooltip-line'>+<span className='bold'>{ (currentEffect.amount[1] * 100).toFixed(2) }%</span> Total</p>)
    }
  }

  return (
    <div className='bonus'>
      <div className='bonus-header'>
        <p className='tooltip-line'><span className='bold'>{ props.bonus.name }</span></p>
        <p className='tooltip-line'>{ formatLevel() }</p>
      </div>
      { props.bonus.effects.map((effect: number) => {
        const currentEffect = gameData.effects[effect];
        if (!currentEffect.appliesTo.includes(props.resource) && currentEffect.appliesTo[0] != -1) return;
        return (
          <div className='tooltip-2-col' key={ 'effect' + effect }>
            <p className='tooltip-line'> - { gameData.effects[effect].description() }</p>
            { formatTotal(effect) }
          </div>
        )
      }) }
    </div>
  )
}
