import express = require("express");
import graphqlExpress = require("graphql-server-express");
import bodyParser = require("body-parser");
import cors = require("cors");

import schema from './graphql'

const app: express.Application = express();

app.get("/", function(req, res) {
  res.send("Hello Worldssss");
});

app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});

app.all("*", cors());

app.use(
  "/graphiql",
  graphqlExpress.graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress.graphqlExpress(req => ({
    schema,
    context: { }
  }))
);
