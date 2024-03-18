export class ElasticClient {
  private static elasticClientInstance: ElasticClient;

  private constructor() {}

  static instance() {
    if (!ElasticClient.elasticClientInstance)
      this.elasticClientInstance = new ElasticClient();
    return ElasticClient.elasticClientInstance;
  }

  private buildHeaders() {
    const elasticUser = process.env["ELASTIC_USERNAME"];
    const elasticPassword = process.env["ELASTIC_PASSWORD"];
    const credentials = Buffer.from(
      `${elasticUser}:${elasticPassword}`
    ).toString("base64");
    return {
      Authorization: `Basic ${credentials}`,
    };
  }

  private url(path: string) {
    const elasticBase = process.env["ELASTIC_ENDPOINT"];
    return `${elasticBase}/${path}`;
  }

  async listIndices() {
    const response = await fetch(this.url("_aliases"), {
      headers: this.buildHeaders(),
    });
    return await response.json();
  }

  async createIndex(name: string) {
    return await fetch(this.url(name), {
      method: "PUT",
      headers: this.buildHeaders(),
    });
  }

  async createAlias(index: string, alias: string) {
    const body = {
      actions: [
        {
          add: {
            index,
            alias,
          },
        },
      ],
    };
    return await fetch(this.url("_aliases"), {
      method: "POST",
      headers: this.buildHeaders(),
      body: JSON.stringify(body),
    });
  }

  async changeAlias(index: string, alias: string) {
    return await fetch(this.url(`${index}/_alias/${alias}`), {
      method: "POST",
      headers: this.buildHeaders(),
    });
  }

  async deleteIndex(index: string) {
    const indices = await this.listIndices();
    if (!Object.keys(indices).includes(index)) return null;
    return await fetch(this.url(index), {
      method: "DELETE",
      headers: this.buildHeaders(),
    });
  }

  async deleteAllIndices() {
    const indices = await this.listIndices();
    const deleteOperations = Object.keys(indices).map(
      async (i) => await this.deleteIndex(i)
    );
    await Promise.all(deleteOperations);
  }

  async bulk(body: string) {
    return await fetch(this.url("_bulk?refresh=true"), {
      method: "POST",
      headers: {
        ...this.buildHeaders(),
        "Content-Type": "application/json",
      },
      body,
    });
  }

  async multiMatch(query: string, fields: string[]) {
    const body = {
      query: {
        multi_match: {
          query,
          fields,
        },
      },
    };
    return await fetch(this.url("_search"), {
      method: "POST",
      headers: {
        ...this.buildHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
