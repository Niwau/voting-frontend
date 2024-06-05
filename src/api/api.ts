import axios from "axios";
import { API_URL } from "../constants";
import { io, Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  CreateRoomPayload,
  CreateRoomResponse,
  ServerToClientEvents,
} from "../types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(API_URL);

export const api = axios.create({
  baseURL: API_URL,
});

export const createRoomRequest = async (body: CreateRoomPayload) => {
  const response = await api.post("/room", body);
  return response.data as CreateRoomResponse;
};
