import { IPlot, Plant } from './Types';
import { plantList, PLANTS } from './PlantData';

export const enum PLOTS {
  PLOT_0,
  PLOT_1,
  PLOT_2,
  PLOT_3,
  PLOT_4,
  PLOT_5,
}

export const plotList: Record<number, IPlot> = {
  [PLOTS.PLOT_0]: {
    unlocked: true,
    fullyGrown: false,
    plant: new Plant(plantList[PLANTS.EMPTY_PLOT])
  },
  [PLOTS.PLOT_1]: {
    unlocked: true,
    fullyGrown: false,
    plant: new Plant(plantList[PLANTS.EMPTY_PLOT])
  },
  [PLOTS.PLOT_2]: {
    unlocked: false,
    fullyGrown: false,
    plant: new Plant(plantList[PLANTS.ELVENFOIL])
  },
  [PLOTS.PLOT_3]: {
    unlocked: false,
    fullyGrown: false,
    plant: new Plant(plantList[PLANTS.DEMON_SPROUT])
  },
  [PLOTS.PLOT_4]: {
    unlocked: false,
    fullyGrown: false,
    plant: new Plant(plantList[PLANTS.ARRACHS_WEB])
  },
  [PLOTS.PLOT_5]: {
    unlocked: false,
    fullyGrown: false,
    plant: new Plant(plantList[PLANTS.WORMS_TOOTH])
  }
}
