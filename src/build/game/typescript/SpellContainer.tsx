import React, { useContext, useState } from 'react';

import { GameContext } from './App';
import { IGameContext } from './data/Types';
import { GetSpellTagName } from './data/SpellData';
import { Spell } from './Spell';

export const SpellContainer: React.FC<{ spells: number[], tag: string }> = ({ ...props }): JSX.Element => {
  const gameData = useContext(GameContext) as IGameContext;
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div key={ 'spell-tag-container ' + props.tag } className='spell-tag-container'>
      <h3 className='spell-header' onClick={ () => setIsOpen(!isOpen) }>
        <span className='spell-tag-name'>{ GetSpellTagName(parseInt(props.tag)) }</span> <span className='spell-arrow'>{ isOpen ? '\u25B2' : '\u25BC' }</span>
      </h3>
      { isOpen && <div className='spell-container'>
        { props.spells.map((spell) => {
          if (gameData.spells[spell].unlocked) {
            return ( <Spell key={ gameData.spells[spell].name } { ...gameData.spells[spell]} />)
          }
        }) }
      </div> }
    </div>
   )
}
