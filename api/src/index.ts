import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { searchRouter } from "./trpc/trpc";
import cors from "cors";

const server = createHTTPServer({
  middleware: cors(),
  router: searchRouter,
});

console.log("listening on port 3000");
server.listen(3000);

export type { SearchRouter } from "./trpc/trpc";
export * from "./elastic";
