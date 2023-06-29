import { RESOURCES } from "./ResourceData"
export const enum FISHING_SPOTS {
  VILLAGE_RIVER
}

const pondList = {
  [FISHING_SPOTS.VILLAGE_RIVER]: {
    name: "River by the Village",
    id: FISHING_SPOTS.VILLAGE_RIVER,
    rewards: [
      [RESOURCES.RUNE, 1, 1, 0.005],
      [RESOURCES.GOLD, 10, 10, 0.045],
      [RESOURCES.GOLD, 1, 3, 0.1],
      [RESOURCES.FISH, 1, 1, 0.85],
    ],
  }
}
