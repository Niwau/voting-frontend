import axios from "axios";
import { API_URL } from "../constants";
import { io } from "socket.io-client";
import {
  CreateRoomParams,
  CreateRoomResponse,
  JoinRoomMessage,
} from "../types";

export const socket = io(API_URL);

export const api = axios.create({
  baseURL: API_URL,
});

export const createRoomRequest = async (body: CreateRoomParams) => {
  const response = await api.post("/room", body);
  return response.data as CreateRoomResponse;
};

export const joinRoomRequest = async (message: JoinRoomMessage) => {
  socket.emit("room:join", message);
};

export const getRoomRequest = async (code: string) => {
  socket.emit("room:get", code);
};

export const verifyRoomRequest = async (code: string) => {
  const response = await api.get(`/room/${code}`);
  return response.data;
};

export const verifyUsernameRequest = async (username: string, code: string) => {
  const response = await api.get(`/room/${code}/username/${username}`);
  return response.data;
};
