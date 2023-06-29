import { IGameData } from './Types';
import { playerData } from './PlayerData';
import { resourceList } from './ResourceData';
import { actionList } from './ActionData';
import { upgradeList } from './UpgradeData';
import { bonusList } from './BonusData';
import { plotList } from './PlotData';
import { effectList } from './EffectData';
import { spellList } from './SpellData';

const gameSpeed = 50;
export function GetTicksPerSecond() {
  return 1000 / gameSpeed;
}

export const gameData: IGameData = {
  gameSpeed: gameSpeed,
  playerData: playerData,
  actionList: actionList,
  upgradeList: upgradeList,
  resourceList: resourceList,
  bonusList: bonusList,
  plotList: plotList,
  effectList: effectList,
  spellList: spellList,
}
