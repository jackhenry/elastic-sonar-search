import fs from "node:fs";
import { faker } from "@faker-js/faker";
import {
  SonarClientFunc,
  SonarDocument,
  getSonarClient,
} from "../src/sonar/sonar-client";
import { ElasticClient, ElasticIndex } from "../src/elastic";

type ReplacementMap<T> = { [key in keyof T]?: () => T[key] };

class Anonymizer {
  private static entity<T>(obj: T, map: ReplacementMap<T>) {
    const anonymizedFields = Object.keys(map).reduce((prev, currKey) => {
      return {
        ...prev,
        [currKey]: map[currKey](),
      };
    }, {});

    return {
      ...obj,
      ...anonymizedFields,
    } as T;
  }

  static sonarResponse<Response extends Awaited<ReturnType<SonarClientFunc>>>(
    body: Response,
    anonymizerMap: ReplacementMap<Response["result"]["entities"][number]>
  ) {
    const entities = body.result.entities.map((entity) =>
      Anonymizer.entity(entity, anonymizerMap)
    ) as Response["result"]["entities"];
    return {
      ...body,
      result: {
        ...body.result,
        entities: entities,
        // Hide entity counts
        pageInfo: {
          totalPages: 1,
          totalCount: 1000,
          page: 1,
        },
      },
    } as Response;
  }
}

async function generateMockData() {
  const client = getSonarClient();

  const networksites = await client.networksites();

  const anonymousNetworkSites = Anonymizer.sonarResponse(networksites, {
    name: () => faker.number.int({ max: 10 }) + "",
    height_in_meters: faker.number.int,
    sonar_unique_id: faker.string.uuid,
    created_at: faker.date.anytime,
    updated_at: faker.date.anytime,
    geopoint: () =>
      `${faker.location.latitude()}, ${faker.location.longitude()}`,
  });

  const accounts = await client.accounts();

  const anonymousAccounts = Anonymizer.sonarResponse(accounts, {
    name: () => faker.number.int({ max: 50 }) + "",
    activation_date: faker.date.anytime,
    next_bill_date: faker.date.anytime,
    geopoint: () =>
      `${faker.location.latitude()}, ${faker.location.longitude()}`,
    id: faker.number.int,
    sonar_unique_id: faker.string.uuid,
  });

  return {
    accounts: anonymousAccounts,
    networksites: anonymousNetworkSites,
  };
}

// Delete all the indices
await ElasticClient.instance().deleteAllIndices();

// Get mock data for network sites and accounts
const mockData = await generateMockData();
const insertPromises = Object.entries(mockData).map(async ([name, data]) => {
  const index = await ElasticIndex.create(name);
  await index.setAlias(name);
  await index.insert(data.result.entities as SonarDocument<SonarClientFunc>[]);
});

await Promise.all(insertPromises);
