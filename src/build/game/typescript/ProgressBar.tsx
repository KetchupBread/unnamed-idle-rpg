import React from 'react';

export const ProgressBar: React.FC<{ color: string, fill: number }> = ({ ...props }) => {
  const fillStyles = {
    width: `${props.fill}%`,
    transition: 'width ease-in',
    height: '10px',
  }

  return (
    <div className='progress-bar-bg'>
      <div className={ `progress-bar-fill ${ props.color }-b` } style={ fillStyles }></div>
    </div>
  )
}
