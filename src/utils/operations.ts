import { buildSchema, getNamedType, GraphQLSchema, isInputObjectType, getDirectiveValues, isObjectType, OperationTypeNode, parse, print } from "graphql"
import { astFromDirective, astFromSchema, printSchemaWithDirectives } from "@graphql-tools/utils"
import { buildOperationNodeForField } from "./buildOperationNodeForField"

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

    return buildSchema(source!, {
      noLocation: true,
    })
  } catch (e) {
    throw e
  }
}

async function operationsFromSchema(url: string): Promise<any> {
  const schema: GraphQLSchema = await getSchemaFromUrl(url)

  Object.values(schema.getQueryType()?.getFields() || {}).forEach((operationField) => {
    // console.log(getNamedType(operationField.type), "========", operationField.type.toString())
    // operationField?.args?.forEach((item) => {
    //   const nameType = getNamedType(item.type)
    //   console.log(nameType, "==========", item.type.toString())
    // if (isInputObjectType(nameType)) {
    //   console.log(nameType.getFields())
    // }
    // })
  })

  const operationsDictionary = {
    query: { ...(schema.getQueryType()?.getFields() || {}) },
    mutation: { ...(schema.getMutationType()?.getFields() || {}) },
    subscription: { ...(schema.getSubscriptionType()?.getFields() || {}) },
  }

  let documentString: string[] = []

  /** 返回自定义的OperationDefinitionNode */
  Object.keys(operationsDictionary).forEach((kind: string) => {
    Object.keys((operationsDictionary as any)[kind]).forEach((field: string) => {
      const operationAST = buildOperationNodeForField({
        schema,
        kind: kind as OperationTypeNode,
        field,
      })

      console.log(operationAST, "==operationAST")

      documentString.push(print(operationAST))
    })
  })

  return documentString
}

export default operationsFromSchema
