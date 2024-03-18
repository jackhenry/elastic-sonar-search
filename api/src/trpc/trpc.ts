import { TRPCError, inferRouterOutputs, initTRPC } from "@trpc/server";
import { search } from "../elastic";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const searchRouter = router({
  search: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const result = await search(input);
    if (result === undefined || result === null) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occured, please try again later.",
      });
    }
    return result;
  }),
});

export type SearchRouter = typeof searchRouter;

type SearchRouterOutput = inferRouterOutputs<SearchRouter>;
export type SearchQueryOutput = SearchRouterOutput["search"];
