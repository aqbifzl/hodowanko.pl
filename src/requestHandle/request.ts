import { type z, ZodError } from "zod";
import { errorRes } from "../zod/response";

export const fetchJson = async <T>(
  path: string,
  options: RequestInit,
  successType: z.ZodTypeAny,
): Promise<T> => {
  const response = await fetch(
    path, options
  );

  if (!response.ok) {
    const errorResponse = await response.json() as { error: string };
    try{
      errorRes.parse(errorResponse);
    }catch(err){
      throw new Error(`Nieznany błąd, kod: ${response.statusText}`);
    }
    throw new Error(`${errorResponse.error}`);
  }

  const data: unknown = await response.json();

  try {
    successType.parse(data);
    return data as T;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(`Błąd podczas walidacji odpowiedzi: ${error.name}`);
    } else {
      throw new Error("Nieznany błąd podczas walidacji odpowiedzi");
    }
  }
};
