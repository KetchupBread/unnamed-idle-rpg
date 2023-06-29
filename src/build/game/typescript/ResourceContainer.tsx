import React, { useContext, useState } from 'react';

import { GameContext } from './App';
import { Resource } from './Resource';
import { IGameContext } from './data/Types';
import { GetResourceTagName } from './data/ResourceData';

export const ResourceContainer: React.FC<{ resources: number[], tag: string }> = ({ ...props }): JSX.Element => {
  const gameData = useContext(GameContext) as IGameContext;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div key={ 'resource-tag-container ' + props.tag } className='resource-tag-container'>
      <h3 className='resource-header' onClick={ () => setIsOpen(!isOpen) }>
        <span className='resource-tag-name'>{ GetResourceTagName(parseInt(props.tag)) }</span> <span className='resource-arrow'>{ isOpen ? '\u25B2' : '\u25BC' }</span>
      </h3>
      { isOpen && <div className='resource'>
        { props.resources.map((resource) => {
          if (gameData.resources[resource].unlocked) {
            return ( <Resource key={ gameData.resources[resource].name } { ...gameData.resources[resource]} />)
          }
        }) }
      </div> }
    </div>
  )

}
