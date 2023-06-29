import React, { useContext, useState } from 'react';
import { GameContext } from './App';
import {
  IGameContext,
  Pond as PondType
} from './data/Types';

export const Pond: React.FC<PondType> = ({ ...props }) => {
  const gameData = useContext(GameContext) as IGameContext;
  return (
    <>
    </>
  )
}
