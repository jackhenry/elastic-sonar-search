import { getSdk } from "../__generated__/graphql";
export type SonarClientFunc = ReturnType<typeof getSdk>[keyof ReturnType<typeof getSdk>];
export type SonarDocument<Func extends SonarClientFunc> = Exclude<Awaited<ReturnType<Func>>["result"]["entities"][number], null>;
export declare function getSonarClient(): ReturnType<typeof getSdk>;
