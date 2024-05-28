import { type z } from "zod";
import { type newUserReq } from "../zod/request";
import {
  idRes, msgRes, userRes 
} from "../zod/response";
import { type updateUserReq } from "../zod/request";
import { fetchJson } from "./request";

export const restoreFromId = async (idToRestore: string) =>
  await fetchJson<z.infer<typeof userRes>>(
    `/user/${idToRestore}`,{}, userRes
  );

export const saveUser = async (newUser: z.infer<typeof newUserReq>) =>
  await fetchJson<z.infer<typeof idRes>>(
    "/user", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json", }
    }, idRes
  );

export const updateUser = async (userData: z.infer<typeof updateUserReq>) =>
  await fetchJson<z.infer<typeof msgRes>>(
    "/user", {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json", }
    }, msgRes
  );
