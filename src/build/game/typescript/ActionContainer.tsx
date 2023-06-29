import React, { useContext, useState } from 'react';

import { GameContext } from './App';
import { Action } from './Action';
import { IGameContext } from './data/Types';
import { GetActionTagName } from './data/ActionData';

export const ActionContainer: React.FC<{ actions: number[], tag: string }> = ({ ...props }): JSX.Element => {
  const gameData = useContext(GameContext) as IGameContext;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div key={ 'action-tag-container ' + props.tag } className='action-tag-container'>
      <h3 className='action-header' onClick={ () => setIsOpen(!isOpen) }>
        <span className='action-tag-name'>{ GetActionTagName(parseInt(props.tag)) }</span> <span className='action-arrow'>{ isOpen ? '\u25B2' : '\u25BC' }</span>
      </h3>
      { isOpen && <div className='action-container'>
        { props.actions.map((action) => {
          if (gameData.actions[action].unlocked) {
            return ( <Action key={ gameData.actions[action].name } { ...gameData.actions[action]} />)
          }
        }) }
      </div> }
    </div>
  )

}
