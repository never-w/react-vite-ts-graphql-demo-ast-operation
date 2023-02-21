import type * as SchemaTypes from "../../generated/types"

import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
const defaultOptions = {} as const
export type QueryQueryVariables = SchemaTypes.Exact<{ [key: string]: never }>

export type QueryQuery = { books: Array<{ title: string; author: string; colors: Array<string> } | { title: string; author: string; courses: Array<string> }> }

export const QueryDocument = gql`
  query Query {
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
    }
  }
`

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options)
}
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options)
}
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>
