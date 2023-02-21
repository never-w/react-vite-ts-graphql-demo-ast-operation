import { buildSchema, GraphQLSchema, OperationTypeNode, parse, print } from "graphql"
import { astFromDirective, astFromSchema, buildOperationNodeForField, printSchemaWithDirectives } from "@graphql-tools/utils"

/**
 * @description Method to get schema from URL.
 * @param {string} url
 * @return {Promise<GraphQLSchema>}
 */
export async function getSchemaFromUrl(url: string): Promise<GraphQLSchema> {
  try {
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     query: getIntrospectionQuery().toString(),
    //   }),
    // })

    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      query Query {
          _schema
        }
    `,
      }),
    })

    const data = await response.json()
    const source = parse(data.data._schema).loc?.source.body

    return buildSchema(source!)
  } catch (e) {
    throw e
  }
}

/**
 * @description Get operations from schema.
 * See: https://github.com/nestjs/graphql/issues/679
 * @param {string} url
 * @return {Promise<DocumentNode>}
 */
async function operationsFromSchema(url: string): Promise<any> {
  const schema: GraphQLSchema = await getSchemaFromUrl(url)
  // console.log(printSchemaWithDirectives(schema))
  console.log(astFromSchema(schema), "9999999999999999999999999")

  const operationsDictionary = {
    query: { ...(schema.getQueryType()?.getFields() || {}) },
    mutation: { ...(schema.getMutationType()?.getFields() || {}) },
    subscription: { ...(schema.getSubscriptionType()?.getFields() || {}) },
  }

  console.log(operationsDictionary, "---operationsDictionary")

  let documentString: string[] = []

  /** 返回自定义的OperationDefinitionNode */
  Object.keys(operationsDictionary).forEach((kind: string) => {
    Object.keys((operationsDictionary as any)[kind]).forEach((field: string) => {
      const operationAST = buildOperationNodeForField({
        schema,
        kind: kind as OperationTypeNode,
        field,
      })

      documentString.push(print(operationAST))
    })
  })

  return documentString
}

export default operationsFromSchema
