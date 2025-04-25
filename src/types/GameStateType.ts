import type { BuildPathType } from "./BuildPathType";
import type { Item } from "./ItemType";

export type GameState = {
  drawnItem: Item | null;
  buildPath: BuildPathType | null;
  remainingAttempts: number;
  status: "standby" | "playing" | "lose" | "win";
};
