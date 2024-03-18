import { ElasticIndex } from "./elastic/elastic-index";
import { getSonarClient } from "./sonar/sonar-client";
import type { SonarClientFunc, SonarDocument } from "./sonar/sonar-client";

export async function populateIndex(
  index: ElasticIndex,
  fn: SonarClientFunc,
  page = 1
) {
  // Get result from GraphQL query
  const { result } = await fn({
    paginator: {
      page,
      records_per_page: 1000,
    },
  });
  // Bulk insert entties from result into index
  await index.insert(result.entities as SonarDocument<typeof fn>[]);

  /**
   * Check if there are more results to fetch. If there is and the environment variable FULL_SYNC = 0, fetch next page.
   */
  if (result.pageInfo.totalCount > page * 1000) {
    await populateIndex(index, fn, page + 1);
  }
}

/**
 * Iterates through each sonar GraphQL query and fetches the first page. This is a helper function for integration tests.
 */
export async function extractSonarTestData() {
  const sonarClient = getSonarClient();

  const extractionPromises = Object.entries(sonarClient).map(
    async ([, graphQLQuery]) =>
      graphQLQuery({
        paginator: {
          page: 1,
          records_per_page: 1000,
        },
      })
  );

  return await Promise.all(extractionPromises);
}

/**
 * Migrates data from Sonar api to the elastic instance
 */
export async function sync(
  graphQLRequestClient?: ReturnType<typeof getSonarClient>
) {
  const sonarClient = graphQLRequestClient || getSonarClient();
  // Iterate through every query, fetch the data, and populate the index
  const migrationPromises = Object.entries(sonarClient).map(
    async ([name, graphQLQuery]) => {
      const index = await ElasticIndex.create(name);
      await populateIndex(index, graphQLQuery);
      // Since the index name created by ElasticIndex.create() is randomly generated, create a static/known alias
      await index.setAlias(name);
    }
  );

  return await Promise.all(migrationPromises);
}
