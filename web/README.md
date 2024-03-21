# @elastic-sonar-search/web

A demo vue application to search Sonar data. 

**Requires a Sonar API token to run.**

## Building and Running

0. Start an instance of the API service. See [README](../README.md) for instructions.

1. Clone the repo
```
git clone git@github.com:jackhenry/elastic-sonar-search.git
cd web
npm i
```

2. Create an .env file with the following variables:
```
FRONTEND_SONAR_BASE_URL="https://company.sonar.software/"
```

3. Build the project
```
npm run build
```