import type { BuildPathType } from "./BuildPathType";

export type GameState = {
  buildPath: BuildPathType | undefined;
  remainingAttempts: number;
  status: "standby" | "playing" | "lose" | "win";
};
