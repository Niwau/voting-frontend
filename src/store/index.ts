import { create } from "zustand";
import { Powerup } from "../types";

type State = {
  code: string;
  username: string;
  powerup: Powerup;
  setCode: (code: string) => void;
  setUsername: (username: string) => void;
  setPowerup: (powerup: Powerup) => void;
};

export const useJoinRoomState = create<State>((set) => ({
  code: "",
  username: "",
  powerup: Powerup.BlockVote,
  setCode: (code: string) => set({ code }),
  setUsername: (username: string) => set({ username }),
  setPowerup: (powerup: Powerup) => set({ powerup }),
}));
