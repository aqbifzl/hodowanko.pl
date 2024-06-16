import { type z } from "zod";
import { insertInput } from "../zod/activity";
import { msgRes } from "../zod/response";
import { fetchJson } from "./request";

export const insertActivity = async (insertObject: z.infer<typeof insertInput>) =>
  await fetchJson<z.infer<typeof msgRes>>(
    "/activity", {
      method: "POST",
      body: JSON.stringify(insertObject),
      headers: { "Content-Type": "application/json", }
    }, msgRes
  );
