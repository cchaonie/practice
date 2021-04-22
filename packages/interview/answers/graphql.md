# GraphQL
API查询语言和运行时

包括`schema`和`resolver`

入口类型`Query` `Mutation` `Subscription`

```js
// webpack loader
{
    test: /\.(graphql|gql)$/,
    use: [
        { loader: 'graphql-persisted-document-loader' },    // add documentId to query
        { loader: 'graphql-tag/loader' },   // transform graphql qurey -> ast
    ],
}

// graphql ast structure

// graphql server (schema and resolver)
const easyGraphqlObj = new easyGraphqlModule(path.join(__dirname, "graphql"));
const allSchema = easyGraphqlObj.getSchema();
server.use(
    "/flightsorder/graphql",
    expressGQlCache,
    authIfErrorSendCode,
    graphqlHTTP({
        schema: allSchema,
        graphiql: false,
    })
);
```
