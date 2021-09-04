const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const port2 = process.env.PORT || 8080;

async function startServer() {
  server = require("./graphql/schema");
  await server.start();
  server.applyMiddleware({ app });
}
startServer();

require("dotenv").config({ path: "./config.env" });
app.use(cors());
app.use(express.json());
app.use(require("./services/ProductService"));

app.get('/', (req, res) => {
  console.log("Apollo GraphQL Express server is ready");
});

// get driver connection
const dbo = require("./services/connection");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

app.listen(port2, () => {
  console.log(`Server is running at http://localhost:8080${server.graphqlPath}`);
});


module.exports = app;