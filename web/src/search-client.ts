import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { SearchRouter } from "@elastic-sonar-search/api";

export function getSearchClient() {
  const client = createTRPCClient<SearchRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000",
      }),
    ],
  });

  return client;
}
