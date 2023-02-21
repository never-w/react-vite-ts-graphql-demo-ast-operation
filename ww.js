const { print } = require("graphql")
const { astFromDirective, astFromSchema, buildOperationNodeForField, printSchemaWithDirectives } = require("@graphql-tools/utils")

module.exports = {
  plugin(schema, documents, config, info) {
    const operationsDictionary = {
      query: { ...(schema.getQueryType()?.getFields() || {}) },
      mutation: { ...(schema.getMutationType()?.getFields() || {}) },
      subscription: { ...(schema.getSubscriptionType()?.getFields() || {}) },
    }

    let documentString = ""

    /** 返回自定义的OperationDefinitionNode */
    Object.keys(operationsDictionary).forEach((kind) => {
      Object.keys(operationsDictionary[kind]).forEach((field) => {
        const operationAST = buildOperationNodeForField({
          schema,
          kind: kind,
          field,
        })

        documentString += print(operationAST)
      })
    })

    return documentString
  },
}
