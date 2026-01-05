import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { makeNeo4jDriver } from "./neo4j";
import { loadGraphResolvers, loadGraphTypeDefs } from "./index";

async function main() {
  const driver = makeNeo4jDriver();
  await driver.verifyConnectivity();

  const server = new ApolloServer({
    typeDefs: loadGraphTypeDefs(),
    resolvers: loadGraphResolvers(driver),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT ?? 4000) },
  });

  console.log(`🚀 GraphQL (graph) running at ${url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
