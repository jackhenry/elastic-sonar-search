import { inferRouterOutputs } from "@trpc/server";
export declare const router: {
    <TInput extends import("@trpc/server").TRPCRouterRecord>(input: TInput): import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: false;
    }, TInput>;
    <TInput_1 extends import("@trpc/server/unstable-core-do-not-import").CreateRouterOptions>(input: TInput_1): import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: object;
        meta: object;
        errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
        transformer: false;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput_1>>;
};
export declare const publicProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<object, object, object, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker>;
export declare const searchRouter: import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: import("@trpc/server/unstable-core-do-not-import").DefaultErrorShape;
    transformer: false;
}, {
    search: import("@trpc/server/unstable-core-do-not-import").QueryProcedure<{
        input: string;
        output: import("../elastic").GroupedSearchHits;
    }>;
}>;
export type SearchRouter = typeof searchRouter;
type SearchRouterOutput = inferRouterOutputs<SearchRouter>;
export type SearchQueryOutput = SearchRouterOutput["search"];
export {};
