import express, { query } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use(express.json())
  const gqlServer = new ApolloServer({
    typeDefs: "",
    resolvers: {},
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server started" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));
  app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
}
