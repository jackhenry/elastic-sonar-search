import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: ["./codegen/schema.json"],
  documents: ["./codegen/queries/*.graphql"],
  generates: {
    "./src/__generated__/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        useTypeImports: true,
        nonOptionalTypename: true,
      },
    },
  },
};

export default config;
