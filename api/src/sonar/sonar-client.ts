import { GraphQLClient } from "graphql-request";
import { getSdk } from "../__generated__/graphql";

export type SonarClientFunc = ReturnType<typeof getSdk>[keyof ReturnType<
  typeof getSdk
>];

export type SonarDocument<Func extends SonarClientFunc> = Exclude<
  Awaited<ReturnType<Func>>["result"]["entities"][number],
  null
>;

let sonarClient: ReturnType<typeof getSdk> | undefined;

function newSonarClient() {
  const sonarEndpoint = process.env["SONAR_ENDPOINT"];
  if (!sonarEndpoint) throw new Error("SONAR_ENDPOINT not set.");
  const gqlClient = new GraphQLClient(sonarEndpoint, {
    headers: {
      Authorization: `Bearer ${process.env["SONAR_TOKEN"]}`,
    },
  });
  return getSdk(gqlClient);
}

export function getSonarClient(): ReturnType<typeof getSdk> {
  if (sonarClient === undefined) sonarClient = newSonarClient();
  return sonarClient;
}
