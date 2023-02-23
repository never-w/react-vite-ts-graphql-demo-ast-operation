// root Query定义
declare class GraphQLObjectType<TSource = any, TContext = any> {
  name: string
  description: Maybe<string>
  isTypeOf: Maybe<GraphQLIsTypeOfFn<TSource, TContext>>
  extensions: Readonly<GraphQLObjectTypeExtensions<TSource, TContext>>
  astNode: Maybe<ObjectTypeDefinitionNode>
  extensionASTNodes: ReadonlyArray<ObjectTypeExtensionNode>
  private _fields
  private _interfaces
  constructor(config: Readonly<GraphQLObjectTypeConfig<TSource, TContext>>)
  get [Symbol.toStringTag](): string
  getFields(): GraphQLFieldMap<TSource, TContext>
  getInterfaces(): ReadonlyArray<GraphQLInterfaceType>
  toConfig(): GraphQLObjectTypeNormalizedConfig<TSource, TContext>
  toString(): string
  toJSON(): string
}

// root Query里面每个单独接口定义
interface GraphQLField<TSource, TContext, TArgs = any> {
  name: string
  description: Maybe<string>
  type: GraphQLOutputType
  args: ReadonlyArray<GraphQLArgument>
  resolve?: GraphQLFieldResolver<TSource, TContext, TArgs>
  subscribe?: GraphQLFieldResolver<TSource, TContext, TArgs>
  deprecationReason: Maybe<string>
  extensions: Readonly<GraphQLFieldExtensions<TSource, TContext, TArgs>>
  astNode: Maybe<FieldDefinitionNode>
}

// OperationDefinition
interface OperationDefinitionNode {
  readonly kind: Kind.OPERATION_DEFINITION
  readonly loc?: Location
  readonly operation: OperationTypeNode
  readonly name?: NameNode
  readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>
  readonly directives?: ReadonlyArray<DirectiveNode>
  readonly selectionSet: SelectionSetNode
}
