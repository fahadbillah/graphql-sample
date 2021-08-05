import 'regenerator-runtime/runtime';
import express from 'express';
import fs from 'fs';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { MongoUtils } from './db';

import { resolvers, batchAcc } from './resolvers';

const typeDefs = fs.readFileSync(`${__dirname}/schema.gql`, 'utf8');

MongoUtils.connect({ }, async (error) => {
  if (error) console.log(error);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req }) => {
      const { db } = MongoUtils;
      const acc = db.collection('accounts');

      return { 
        dataloaders: batchAcc(acc),
        db,
        acc
      };
    },
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
});

// async function startApolloServer() {
// }

// startApolloServer();