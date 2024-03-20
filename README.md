# elastic-sonar-search

An implementation of [Sonar's](https://sonar.software/) global search using ElasticSearch. The API service uses the graphql endpoint of a Sonar instance to fetch and sync data with an ElasticSearch instance. The API consists of a simple [tRPC](https://trpc.io/) router which exposes a `search` query.

The ultimate goal of this project is to create a global search of Sonar data that can be hosted locally. This enables a faster search experience than utilizing the Sonar provided `globalSearch` GraphQL query.

## Project Structure

This repo currently consists of two packages:

* 1. `@elastic-sonar-search/api`
  * A NodeJS server that provides a search endpoint for clients.
  * Utilizes the `@trpc/server` package to create a router which provides the `search` endpoint.
  * Exports `ApiRouter` type which can be used to create a router client with the `@trpc/client` package.
* 2. `@elastic-sonar-search/web`
  * A demo Vue application that allows global search of Sonar entities. Uses the `@trpc/client` package to make calls to the API.
  * **Note**: It is currently only possible to run the demo web application if you have API access to a Sonar instance.

## Running the API Service

Currently, the recommended way of running the API service is through Docker.

#### Using Docker

1. Create a `.env` file with the following variables:
```env
SONAR_ENDPOINT=https://company.sonar.software/api/graphql
SONAR_TOKEN=a-sonar-api-key

ELASTIC_ENDPOINT=http://localhost:9200
ELASTIC_VERSION=8.12.2
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