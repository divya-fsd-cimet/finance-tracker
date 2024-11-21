import express, { query } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use(express.json())
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
        hello: String
        say(name: String) : String}
    type Mutation{
        createUser(firstName: String!, lastName: String!, email: String!, password: String!)
    }
        `,
    resolvers: {
        Query:{
            hello: ()=> "Hey welcome",
            say: (_, {name} : {name: string} ) => `hey ${name}`,
        },
        Mutation:{
            createUser: async(_, {firstName, lastName, email, password} : {firstName : String, lastName: String, email: String, password: String})
        }
    },
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server started" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));
  app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
}

startServer()
