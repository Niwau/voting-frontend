import { Option } from "./models";

export enum Powerup {
  DoubleVote = 1,
  BlockVote = 2,
  RevealVotes = 3,
}

export interface User {
  username: string;
}

export interface Room {
  code: string;
  theme: string;
  options: Option[];
  users: User[];
}

export interface CreateRoomResponse {
  code: string;
}

export interface CreateRoomParams {
  theme: string;
  options: string[];
}

export interface JoinRoomMessage {
  code: string;
  username: string;
  powerup: Powerup;
}
