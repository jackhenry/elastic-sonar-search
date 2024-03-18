import { test, describe, beforeEach } from "node:test";
import assert from "node:assert";
import dotenv from "dotenv";

import { Environment, getSetOfAllIds } from "./helpers";
import { sync } from "../src/sync";
import {
  SonarClientFunc,
  SonarDocument,
  getSonarClient,
} from "../src/sonar/sonar-client";

dotenv.config({
  path: ".env.test",
});

describe("sync", () => {
  beforeEach(async () => {
    await Environment.reset();
  });

  test("entities inserted match actual documents in elastic after sync", async (t) => {
    const client = await Environment.getElasticTestClient();
    // Delete all the search indices beforehand
    await client.indices.delete({ index: "search-*" });
    const sonarClient = await getSonarClient();
    // Mock all the graphql queries in the sonar client so the return values you can looked at
    const mockGraphQLRequestFns = Object.keys(sonarClient).map((fnName) =>
      t.mock.method(sonarClient, fnName as keyof typeof sonarClient)
    );
    // Sync between sonar api and elastic
    await sync();
    // Go through each mock function, get the results.
    const results = mockGraphQLRequestFns
      .flatMap((mockFn) => mockFn.mock.calls)
      .flatMap((call) => call.result);
    const resolvedResults = await Promise.all(results);
    // Go through each mock fn result, get all entities, map them to a list of the sonar unique ids for each entity inserted
    const actualSonarIds = resolvedResults
      .flatMap((r) => r?.result.entities as SonarDocument<SonarClientFunc>[])
      .map((entity) => entity.sonar_unique_id);
    const setActualSonarIds = new Set(actualSonarIds);
    // Now get all the sonar unique ids directly from the elastic instance
    const setFetchedSonarIds = await getSetOfAllIds(client);
    // Ensure that the count of inserted entities matches what was received directly from elastic
    assert.equal(
      setFetchedSonarIds.size,
      setActualSonarIds.size,
      "Document count of Elastic instance does not match insertion count."
    );
    // Ensure that the two sets of sonar_unique_id are equal
    const elasticHasAllSonarIds = [...actualSonarIds].every((id) =>
      setFetchedSonarIds.has(id)
    );
    assert.ok(
      elasticHasAllSonarIds,
      "Set of sonar_unique_id from Elastic does not equal the set of inserted"
    );
  });
});
