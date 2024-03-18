import crypto from "node:crypto";
import { ElasticClient } from "./client";
import type { SonarClientFunc, SonarDocument } from "../sonar/sonar-client";

export class ElasticIndex {
  private name: string;

  private constructor(name: string) {
    const uuid = crypto.randomUUID();
    this.name = `search-${name.toLowerCase()}-${uuid}`;
  }

  static async create(name: string) {
    const index = new ElasticIndex(name);
    const client = ElasticClient.instance();
    await client.createIndex(index.name);
    return index;
  }

  indexName() {
    return this.name;
  }

  async insert(docs: SonarDocument<SonarClientFunc>[]) {
    if (docs.length === 0) return;
    const bulkBody = this.encodeDocs(docs);
    const client = ElasticClient.instance();
    return await client.bulk(bulkBody);
  }

  private encodeDocs(docs: SonarDocument<SonarClientFunc>[]) {
    return docs.reduce<string>((prev, current) => {
      const createCommand = {
        create: {
          _index: this.name,
          _id: current.id,
        },
      };
      return (
        prev + JSON.stringify(createCommand) + `\n${JSON.stringify(current)}\n`
      );
    }, "");
  }

  async setAlias(aliasName: string) {
    const client = ElasticClient.instance();
    await client.changeAlias(this.name, aliasName);
  }
}
