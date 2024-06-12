export enum Powerup {
  DoubleVote = 1,
  RevealVotes = 2,
}

export interface CreateRoomResponse {
  code: string;
}

export interface CreateRoomPayload {
  theme: string;
  options: string[];
}

export interface JoinRoomPayload {
  code: string;
  username: string;
  powerup: Powerup;
}

export type User = {
  username: string;
  socket: string;
  selectedOption?: number;
  powerup: Powerup;
  isOwner: boolean;
};

export interface Option {
  id: number;
  value: string;
  votes: number;
}

export interface Room {
  code: string;
  theme: string;
  options: Option[];
  users: User[];
  status: "waiting" | "voting" | "stopped";
}

export interface VotePayload {
  code: string;
  option: number;
  powerup?: Powerup;
}

export interface EventResponse {
  success: boolean;
  message: string;
}

export interface ClientToServerEvents {
  "room:join": (
    payload: JoinRoomPayload,
    response: (response: EventResponse) => void
  ) => void;
  "room:get": (code: string) => void;
  "room:create": (
    payload: CreateRoomPayload,
    response: (response: EventResponse & { code: string }) => void
  ) => void;
  "room:leave": (code: string) => void;
  "room:start": (code: string) => void;
  vote: (payload: VotePayload) => void;
  "room:stop": (code: string) => void;
}

export interface ServerToClientEvents {
  "room:update": (room: Room) => void;
  "room:start": () => void;
  "room:stop": () => void;
}
