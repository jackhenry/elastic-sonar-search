import path from "node:path";
import { Client } from "@elastic/elasticsearch";
import {
  ElasticsearchContainer,
  StartedElasticsearchContainer,
} from "@testcontainers/elasticsearch";
import { sync } from "../src/sync";
import type { SearchHit } from "../src/elastic/index";

export class Environment {
  private static container: StartedElasticsearchContainer;
  private static elasticTestClient: Client;

  static async getElasticContainer() {
    if (!Environment.container) {
      Environment.container = await new ElasticsearchContainer()
        .withEnvironment({
          "path.repo": "/usr/share/elasticsearch/data/snapshots",
        })
        .withBindMounts([
          {
            source: path.resolve("./integration/snapshots"),
            target: "/usr/share/elasticsearch/data/snapshots",
          },
        ])
        .withReuse()
        .start();
      // init environment variable
      process.env["ELASTIC_ENDPOINT"] = Environment.container.getHttpUrl();
    }
    return Environment.container;
  }

  static async createSnapshot() {
    const client = await Environment.getElasticTestClient();
    await client.snapshot.createRepository({
      name: "testing",
      type: "fs",
      settings: {
        location: "/usr/share/elasticsearch/data/snapshots",
      },
    });
    await client.snapshot.create({
      repository: "testing",
      snapshot: "base",
    });
  }

  static async getElasticTestClient() {
    if (!Environment.elasticTestClient) {
      const container = await Environment.getElasticContainer();
      Environment.elasticTestClient = new Client({
        node: container.getHttpUrl(),
      });
    }

    return Environment.elasticTestClient;
  }

  static async hardSync() {
    // ensure the container has been started
    await Environment.getElasticContainer();
    await sync();
  }

  static async reset() {
    const client = await Environment.getElasticTestClient();
    await client.indices.delete({ index: "search-*" });
    await client.snapshot.restore({
      repository: "testing",
      snapshot: "base",
      include_aliases: true,
      indices: "search-*",
      wait_for_completion: true,
    });
  }
}

export async function getSetOfAllIds(client: Client) {
  let ids: string[] = [];
  const fetchPage = async (from: number = 0, to: number = 1000) => {
    const response = await client.search({
      from,
      size: to - from,
      query: {
        match_all: {},
      },
    });

    const total = response.hits.total as { value: number };
    const pageIds = response.hits.hits.map(
      (hit) => (hit as SearchHit)._source.sonar_unique_id
    );
    ids = [...ids, ...pageIds];

    if (total.value > to) {
      await fetchPage(to, to + 1000);
    }
  };

  await fetchPage();
  return new Set(ids);
}
