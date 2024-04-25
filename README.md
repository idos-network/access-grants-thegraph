# access-grants-thegraph

Describes [Subgraphs]([url](https://thegraph.com/docs/en/quick-start/)) for querying EVM [access grant contracts](https://github.com/idos-network/idos-access-grants/) using GraphQL.

For example, this query:
```graphql
{
  grantAddeds(first: 2, where: {lockedUntil_gt: 0}) {
    owner
    grantee
    dataId
    lockedUntil
    blockTimestamp
    transactionHash
  }
}
```

Yields the following result:
```js
{
  "data": {
    "grantAddeds": [
      {
        "owner": "0x23689aec7dfd6b6f707dbf74b5581d84e8f3c813",
        "grantee": "0x1d38049068199e2cea6490a0a458991ff69f523f",
        "dataId": "6f9d07ee-3a17-4559-ac94-3079a7ee4250",
        "lockedUntil": "1713109836",
        "blockTimestamp": "1713106248",
        "transactionHash": "0x2c37e5844d8d5854dad8ff0dc95525ff7b3179e8a90c31ec1d918a9ea34dd3cc"
      },
      {
        "owner": "0x246571f6bd246e257edac94650a93b85494b53a0",
        "grantee": "0x1d38049068199e2cea6490a0a458991ff69f523f",
        "dataId": "0305f374-6155-4e87-8514-e64ca9522aca",
        "lockedUntil": "1713822575",
        "blockTimestamp": "1713819000",
        "transactionHash": "0x39f5b98c29f97afe10324f27450e0526eb76c950eb42ee56bf89b233c5086a9a"
      }
    ]
  }
}
```

## Querying

You can use the Studio to query a limited amount of records:
* [Ethereum Sepolia AGs](https://api.studio.thegraph.com/proxy/72558/idos-ags-ethereum-sepolia/0.0.6/graphql?query=%7B%0A++grantAddeds%28first%3A+10%2C+where%3A+%7BlockedUntil_gt%3A+0%7D%29+%7B%0A++++owner%0A++++grantee%0A++++dataId%0A++++lockedUntil%0A++++blockTimestamp%0A++++transactionHash%0A++%7D%0A%7D)
* [Arbitrum One AGs](https://api.studio.thegraph.com/proxy/72558/idos-ags-arbitrum-one/0.0.10/graphql?query=%7B%0A++grantAddeds%28first%3A+10%2C+where%3A+%7BlockedUntil_gt%3A+0%7D%29+%7B%0A++++owner%0A++++grantee%0A++++dataId%0A++++lockedUntil%0A++++blockTimestamp%0A++++transactionHash%0A++%7D%0A%7D)

For more control you can use a GraphQL client as shown below. You can see [a demo in CodePen](https://codepen.io/juliofractal/full/abxXJyg).
```js
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

(async () => {
  const client = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/72558/idos-ags-ethereum-sepolia/0.0.6",
    cache: new InMemoryCache(),
  });

  let results = [];
  const pageSize = 1000;
  for (let page = 0;; page++) {
    const { data: { grantAddeds } } = await client.query({ query: gql(`
      query {
        grantAddeds (first: ${pageSize}, skip: ${page * pageSize}) {
          owner
          grantee
          dataId
        }
      }`
    )});
    
    results = [...results, ...grantAddeds];
    
    if (grantAddeds.length < pageSize || grantAddeds.length === 0) break;
  }

  console.log(results);
})();
```
