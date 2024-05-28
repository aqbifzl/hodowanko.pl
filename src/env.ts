import { z } from "zod";

const schema = z.object({ REACT_APP_API_URL: z.string().url() });

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment variables:", JSON.stringify(
      parsed.error.format(), null, 4
    )
  );
  process.exit(1);
}

export default parsed.data;
