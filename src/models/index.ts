import { z } from "zod";
import { Powerup } from "../types";

export const optionSchema = z.object({
  value: z.string().min(1, "Campo obrigatório"),
});

export const createRoomSchema = z.object({
  theme: z.string().min(1, "Campo obrigatório"),
  options: z
    .array(optionSchema)
    .min(2, "Mínimo de 2 opções")
    .max(5, "Máximo de 5 opções"),
});

export const joinRoomSchema = z.object({
  code: z.string().min(1, "Campo obrigatório"),
  username: z.string().min(1, "Campo obrigatório"),
  powerup: z.nativeEnum(Powerup, { message: "Powerup inválido" }),
});

export type Option = z.infer<typeof optionSchema>;
export type CreateRoomSchema = z.infer<typeof createRoomSchema>;
export type JoinRoomSchema = z.infer<typeof joinRoomSchema>;
