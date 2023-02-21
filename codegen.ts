import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: [
    {
      "http://localhost:4000/graphql": {},
    },
  ],
  generates: {
    "./src/graphql/generated/schema.graphql": {
      plugins: ["schema-ast", "ww.js"],
      config: {
        federation: false,
        includeDirectives: true,
        strictScalars: true,
        customDirectives: true,
      },
    },
    "./src/graphql/generated/types.ts": {
      plugins: ["typescript"],
      config: {
        maybeValue: "T",
        avoidOptionals: {
          field: true,
        },
        scalars: {
          BigDecimal: "number",
          Long: "number",
          Date: "number",
          DateTime: "number",
        },
        customDirectives: true,
      },
    },
    "./src/graphql/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".ts",
        baseTypesPath: "generated/types.ts",
        importTypesNamespace: "SchemaTypes",
        folder: "__generated__",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        maybeValue: "T",
        avoidOptionals: {
          field: true,
        },
        arrayInputCoercion: false,
        preResolveTypes: true,
        onlyOperationTypes: true,
        declarationKind: "interface",
        skipTypeNameForRoot: true,
        useTypeImports: true,
        skipTypename: true,
        omitOperationSuffix: false,
        scalars: {
          BigDecimal: "number",
          Long: "number",
          Date: "number",
          DateTime: "number",
        },
      },
      documents: ["src/graphql/operations/**/**.gql"],
    },
  },
}

export default config
