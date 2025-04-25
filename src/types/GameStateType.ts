import type { BuildPathType } from "@/types/BuildPathType";
import type { Item } from "@/types/ItemType";

export type GameState = {
  drawnItem: Item | null;
  buildPath: BuildPathType | null;
  remainingAttempts: number;
  status: "standby" | "playing" | "lose" | "win";
};
