import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { SearchRouter } from "@elastic-sonar-search/types";

export function getSearchClient() {
  const client = createTRPCClient<SearchRouter>({
    links: [
      httpBatchLink({
        url: import.meta.env["FRONTEND_API_URL"] || "http://localhost:3000",
      }),
    ],
  });

  return client;
}
