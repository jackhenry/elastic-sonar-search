# elastic-sonar-search

An implementation of [Sonar's](https://sonar.software/) global search using ElasticSearch. The API service uses the graphql endpoint of a Sonar instance to fetch and sync data with an ElasticSearch instance. The API consists of a simple [tRPC](https://trpc.io/) router which exposes a `search` query.

The ultimate goal of this project is to create a global search of Sonar data that can be hosted locally. This enables a faster search experience than utilizing the Sonar provided `globalSearch` GraphQL query.

## Project Structure

This repo currently consists of three packages:

* 1. `@elastic-sonar-search/api`
  * A NodeJS server that provides a search endpoint for clients.
  * Utilizes the `@trpc/server` package to create a router which provides the `search` endpoint.
  * Exports `ApiRouter` type which can be used to create a router client with the `@trpc/client` package.
* 2. `@elastic-sonar-search/web`
  * A demo Vue application that allows global search of Sonar entities. Uses the `@trpc/client` package to make calls to the API.
  * **Note**: It is currently only possible to run the demo web application if you have API access to a Sonar instance.
* 3. `@elastic-sonar-search/tests`
  * Package containing types which are possibly useful when interacting with the API service. Specifically, the `SearchRouter` type which can be used to create a tRPC client.

## Running the API Service

**A pre-existing ElasticSearch instance must be configured and accessible.** The simplest way to create an instance is through docker. 

Currently, the recommended way of running the API service is through Docker.

The API service listens for queries on port 3000.

#### Using Docker

1. Create a `.env` file with the following variables:
```env
SONAR_ENDPOINT=https://company.sonar.software/api/graphql
SONAR_TOKEN=a-sonar-api-key

ELASTIC_ENDPOINT=http://localhost:9200
ELASTIC_USERNAME=elastic
ELASTIC_PASSWORD=changeme
```

2. Create and run a container
```
docker run -p 3000:3000 --env-file .env ghcr.io/jackhenry/elastic-sonar-search/api
```

#### Build from Source

1. Clone the repo
```
git clone git@github.com:jackhenry/elastic-sonar-search.git
cd elastic-sonar-search/api
``` 

2. Create a `.env` file (see Docker instructions)

3. Build and run with NodeJS 
```
npm install
npm run codegen
npm run build
export $(cat .env | xargs) && node dist/index.js
```

## Creating a tRPC client and Using the API

The API service consists of a tRPC router that provides a `search` endpoint. To utilize this endpoint in a project, create a tRPC client with the `SearchRouter` type provided by `@elastic-sonar-search/types`.

1. Install necessary packages
```
npm install @trpc/client@next
npm install --save-dev @elastic-sonar-search/types
```

2. Use the `SearchRouter` type with the `createTRPCClient()` function
```ts
import type { SearchRouter } from "@elastic-sonar-search/types";
import { createTRPCClient, httpBatchLink } from '@trpc/client';

const searchClient = createTRPCClient<SearchRouter>({
  links: [
    httpBatchLink({
      url: `${ URL to API service }`
    })
  ]
})
```

3. Call the `search()` function query the ElasticSearch instance

```ts
  const results = await searchClient.query.search('John Doe');
```

## TODO

- [ ] create an endpoint to manually sync the Elastic instance with Sonar data
- [ ] Use Sonar's webhooks to automatically sync Elastic instance when a relevant event occurs
- [ ] Allow the ability to override default query used to search the ElasticSearch instance