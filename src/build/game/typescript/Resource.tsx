import React, { useContext, useState } from 'react';
import { useFloating, useHover, flip, shift, offset } from '@floating-ui/react';

import { GameContext } from './App';
import { Bonus } from './Bonus';
import { Resource as ResourceType, IGameContext } from './data/Types';

export const Resource: React.FC<ResourceType> = ({ ...props }): JSX.Element => {
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

  return (
    <>
      <div ref={ refs.setReference } className='resource-container'>
        <span className={ `bold ${props.color}` }>{ props.name }</span>
        <span className='align-center'>{ props.amount.toFixed(2) }{ props.amountMax == Infinity ? null :  `/${props.amountMax.toFixed(2)}` }</span>
        <span className='align-right'>{ props.rate > 0 ? props.rate.toFixed(2) + '/s' : null }</span>
      </div>

      { showTooltip && <div className='tooltip' ref={ refs.setFloating } style={ floatingStyles }>
        <div className='tooltip-header'>
          <p className={ `tooltip-line bold tooltip-h ${props.color}` }>{ props.name }</p>
          <p className='tooltip-line'><span className='bold'>Capacity</span>: { props.amountMax.toFixed(2) }</p>
        </div>

        <div className='tooltip-2-col'>
          { props.description() ? <p className='tooltip-line italic'>{ props.description() }</p> : null }
          <p className='tooltip-line align-right'><span className='bold'>Base Rate</span>: { props.rateBase.toFixed(2) }/s</p>
        </div>
        <hr />

        { props.bonuses.length > 0 &&
          <>
            <p className='tooltip-line'>Bonuses:</p>
            { props.bonuses.map((bonus: number) => {
              return (<Bonus bonus={ gameData.bonuses[bonus] } resource={ props.id } key={ gameData.bonuses[bonus].name }/>);
            }) }
            <hr />
          </>
        }

        <p className='tooltip-line align-right'><span className='bold'>Total Rate</span>: { props.rate.toFixed(2) }/s</p>
      </div> }
    </>
  );
}
