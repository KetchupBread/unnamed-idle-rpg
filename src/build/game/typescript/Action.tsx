import React, { useState, useContext } from 'react';
import { useFloating, useHover, flip, shift, offset } from '@floating-ui/react';

import { GameContext } from './App';
import { GetResourceColor, GetResourceName } from './data/ResourceData';
import { Action as ActionType, Resource as ResourceType, IGameContext, REWARD_TYPE } from './data/Types';

export const Action: React.FC<ActionType> = ({ ...props }): JSX.Element => {
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

  const formatReward = (reward: number[]): JSX.Element | null => {
    let percentText: JSX.Element | null = null;

    if (reward[4] < 1) percentText = <><span className='bold'>{ reward[4] * 100 }% </span> chance for </>;

    return (
      <p className='tooltip-line' key={ `${props.name} ${reward[1]} ${reward[0]}` }>
        { percentText } <span className='bold'>{ reward[3] } { reward[0] == REWARD_TYPE.MAX_RESOURCE ? 'MAX' : null }</span> <span className={ GetResourceColor(reward[1]) }> { GetResourceName(reward[1]) }</span>
      </p>
    )
  }

  const doAction = (): boolean => {
    const hasResources: boolean = props.costs.every(([costId, costAmount]: number[]) => {
      if (costAmount > gameData.resources[costId].amount) return false;
      return true;
    });

    if (hasResources) {
      const nextResources: Record<number, ResourceType> = gameData.resources;
      const nextActions: Record<number, ActionType> = gameData.actions;
      let giveReward = true;

      props.costs.forEach(([costId, costAmount]: number[]) => nextResources[costId].increment(-costAmount));

      props.rewards.forEach(([rewardType, rewardId, , rewardAmount, rewardChance]: number[]) => {
        giveReward = true;
        if (rewardChance < 1) {
          if (rewardChance <= Math.random()){
            giveReward = false;
          }
        }

        if (giveReward) {
          if (!nextResources[rewardId].unlocked) nextResources[rewardId].unlock();
          switch (rewardType) {
            case REWARD_TYPE.RESOURCE:
              nextResources[rewardId].increment(rewardAmount);
              break;
            case REWARD_TYPE.MAX_RESOURCE:
              nextResources[rewardId].incrementMax(rewardAmount);
              break;
          }
        }
      })

      nextActions[props.id].incrementXP(props.experiencePerAction);

      gameData.setResources(nextResources);
      gameData.setActions(nextActions)
    }

    return hasResources;

  }

  useHover(context, { move: false });

  return (
    <>
      <p className='button' ref={ refs.setReference } onClick={ () => doAction() }>{ props.name }</p>
      { showTooltip &&
        <div className='tooltip' ref={ refs.setFloating } style={ floatingStyles }>
          <p className='tooltip-line bold tooltip-h'>{ props.name }</p>

          <div className='tooltip-header'>
            <p className='tooltip-line bold'>Level: { props.level }</p>
            <p className='tooltip-line bold'>{ props.experience[0] }/{ props.experience[1] }</p>
          </div>

          <p className='tooltip-line italic'>{ props.description() }</p>
          <hr />

          { props.costs.length > 0 &&
            <>
              <p className='tooltip-line'>Costs:</p>
              { props.costs.map((cost: number[], index: number) => {
                return (
                  <p className='tooltip-line' key={ `${props.name} ${cost[0]} ${index}`}>
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

          { props.rewards.length > 0 &&
            <>
              <p className='tooltip-line'>
                Rewards:
              </p>
              <p className='tooltip-line'><span className='bold'>{ props.experiencePerAction }</span> Action Experience</p>
              { props.rewards.map((reward: number[]) => formatReward(reward)) }
            </>
          }
        </div>
      }
    </>
  )
}
