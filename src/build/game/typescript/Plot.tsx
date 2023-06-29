import React, { useContext, useState } from 'react';
import { useFloating, useHover, flip, shift, offset } from '@floating-ui/react';

import { GameContext } from './App';
import { ProgressBar } from './ProgressBar';
import { PLANTS, plantList } from './data/PlantData';
import { GetResourceColor, GetResourceName } from './data/ResourceData';
import { Plant as PlantType, IGameContext, IPlot } from './data/Types';

export const Plot: React.FC<{ plant: PlantType, pId: number }> = ({ ...props }): JSX.Element => {
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

  useHover(context);

  const ChangePlant = () => {
    const nextPlots: Record<number, IPlot> = gameData.plots;

    nextPlots[props.pId].plant = new PlantType(plantList[PLANTS.COMMON_HERB]);

    gameData.setPlots(nextPlots);
  }

  const HarvestPlant = () => {
      const nextResources = gameData.resources;
      const nextPlots: Record<number, IPlot> = gameData.plots;
      let rewardAmount  = 0;

      props.plant.rewards.forEach(([resource, min, max]: number[]) => {
        if (max == -1) nextResources[resource].increment(min);
        else {
          rewardAmount = Math.floor(Math.random() * (max - min + 1)) + min;
          nextResources[resource].increment(rewardAmount);
          rewardAmount = 0;
        }
      })

      nextPlots[props.pId].plant = new PlantType(plantList[PLANTS.EMPTY_PLOT]);
      nextPlots[props.pId].fullyGrown = false;

      gameData.setResources(nextResources);
      gameData.setPlots(nextPlots);
  }

  const HandleClick = () => {
    if (props.plant.isFullyGrown() && props.plant.id != PLANTS.EMPTY_PLOT) {
      HarvestPlant();
    } else {
      ChangePlant();
    }
  }


  const GetGrowthState = () => {
    if (props.plant.growth[1] == 0) return null;

    if (props.plant.isFullyGrown()) return <p className='bold plant-text'>Fully Grown</p>;
    else if (props.plant.growth[1] > 0) return (<p className='bold plant-text'>{ props.plant.growth[0].toFixed(2) }/{ props.plant.growth[1].toFixed(2) }</p>)
  }

  const FormatReward = ([resource, min, max]: number[], index: number) => {
    let rewardDescription: JSX.Element | null = null;

    if (max == -1) {
      rewardDescription = (
        <p className='tooltip-line' key={ `${props.plant.name} ${index} const` }>
          <span className='bold'>{ min }</span> <span className={ GetResourceColor(resource) }> { GetResourceName(resource) }</span>
        </p>
      )
    } else {
      rewardDescription = (
        <p className='tooltip-line' key={ `${props.plant.name} ${index} variable` }>
          <span className='bold'>{ min } to { max }</span> <span className={ GetResourceColor(resource) }> { GetResourceName(resource) }</span>
        </p>
      )
    }
    return rewardDescription;
  }


  return (
    <>
      <div ref={ refs.setReference } className={ `plant` } onClick={ () => HandleClick() }>
        <p className={ `bold ${ props.plant.color } plant-text` }>
          { props.plant.id == PLANTS.EMPTY_PLOT
            ? <span>{ props.plant.name }</span>
            : <span>{ '\u26B6'} { props.plant.name } { '\u26B6' }</span>
          }
        </p>
        { GetGrowthState() }
        <ProgressBar
          color={ props.plant.color }
          fill={ props.plant.id == PLANTS.EMPTY_PLOT
            ? 100
            : (props.plant.growth[0] / props.plant.growth[1]) * 100 } />
      </div>
      { showTooltip &&
        <div
          className='tooltip'
          ref={ refs.setFloating }
          style={ floatingStyles }
        >
          <div className='tooltip-header'>
            <p className='tooltip-line'>
              <span className={ `bold tooltip-h ${props.plant.color}` }>{ props.plant.name }</span>
            </p>
          </div>

          { props.plant.description()
            ? <p className='tooltip-line italic'>{ props.plant.description() }</p>
            : null
          }

          { props.plant.id == PLANTS.EMPTY_PLOT
            ? null
            : <>
              <hr />
              <p className='tooltip-line'>Time to Harvest: { ((props.plant.growth[1] - props.plant.growth[0]) / props.plant.growthRate).toFixed(2) }s</p>
              <p className='tooltip-line'>Growth Rate: { props.plant.growthRate }/s</p>
              <hr />
            </>
          }


          { props.plant.rewards.length > 0 &&
            <>
              <p className='tooltip-line'>Harvest:</p>
              { props.plant.rewards.map((reward: number[], index: number) => FormatReward(reward, index)) }
            </>
          }
        </div>
      }
    </>
  )
}
