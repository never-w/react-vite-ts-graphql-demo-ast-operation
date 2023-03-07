import {
  buildSchema,
  getNamedType,
  GraphQLSchema,
  isInputObjectType,
  getDirectiveValues,
  isObjectType,
  OperationTypeNode,
  parse,
  FieldDefinitionNode,
  print,
  visit,
  parseValue,
  Kind,
  BREAK,
} from "graphql"
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
        query sdl{
             _service{
                sdl
               }
            }
         `,
      }),
    })

    const { data } = await response.json()

    const ast = parse(
      `
      query Search($contains: String) {
  search(contains: $contains) {
    class
    numType {
      num {
        wyq @upper
      }
      text 
    }
    textEnum
  }
}

query Textbook {
   books {
    ... on Textbook {
      title
      author
      courses
    }
    ... on ColoringBook {
      title
      author
      colors
    }
    author
    title
  }
}
        `,
      {
        noLocation: true,
      }
    )
    console.log(ast, "======ast")

    const newAst = visit(ast, {
      enter(node, key, parent, path, ancestors) {
        if (node.kind === Kind.FIELD) {
          // console.log(
          //   node.directives?.find((directive) => directive.name.value === "upper"),
          //   "wwwwwwwwwwwwwwwwwwwwww"
          // )

          const prefixKey = ancestors
            .slice(4, ancestors.length)
            .filter((_, index) => (index - 1) % 3 === 0)
            .reduce((pre, cur) => {
              return pre + (cur as any)?.name?.value
            }, "")
          const curKey = node.name.value

          const nodeKey = prefixKey + curKey

          // return { ...node, kind: "Field", name: { kind: "Name", value: "wwwwwwwwwwwwwwwwwwww" } }
        }

        // @return
        //   undefined: no action
        //   false: skip visiting this node
        //   visitor.BREAK: stop visiting altogether
        //   null: delete this node
        //   any value: replace this node with the returned value
      },
      // Directive(node) {
      //   console.log(node, "---------------------------uuuuuuuuuuuuuuuuuuu")
      // },
      leave(node, key, parent, path, ancestors) {
        // if (node.kind === Kind.FIELD && node.name.value === "wwwwwwwwwwwwwwwwwwww") {
        //   console.log(node, "+++++++++++++++")
        // }
        // console.log(node, "-------leave")
        // @return
        //   undefined: no action
        //   false: no action
        //   visitor.BREAK: stop visiting altogether
        //   null: delete this node
        //   any value: replace this node with the returned value
      },
    })

    // console.log(newAst, "======newAst")

    // console.log(print(newAst), "=====new query")

    return buildSchema(data._service.sdl, {
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

  console.log(operationsDictionary, "=======operationsDictionary")

  let documentString: string[] = []

  /** 返回自定义的OperationDefinitionNode */
  Object.keys(operationsDictionary).forEach((kind: string) => {
    Object.keys((operationsDictionary as any)[kind]).forEach((field: string) => {
      const operationAST = buildOperationNodeForField({
        schema,
        kind: kind as OperationTypeNode,
        field,
      })

      // console.log(operationAST, "==operationAST")

      documentString.push(print(operationAST))
    })
  })
  console.log(documentString)

  // TODO: eg.
  // console.log(
  //   print(
  //     buildOperationNodeForField({
  //       schema,
  //       kind: "query" as OperationTypeNode,
  //       field: "search",
  //     })
  //   )
  // )

  return documentString
}

export default operationsFromSchema
