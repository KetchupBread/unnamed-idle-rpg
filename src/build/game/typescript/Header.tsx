import React from 'react';

export const Header: React.FC<{ gameSpeed: number }> = ({ ...props }) => {
  return (
    <div className='header-container'>
      <span>Game Speed: { (1000 / (props.gameSpeed)).toFixed(2) } ticks per second</span>
    </div>
  );
}
