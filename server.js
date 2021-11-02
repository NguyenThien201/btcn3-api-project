const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
var cors = require("cors");

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000" }));

app.listen(3000, function () {
  console.log("listening on 3000");
});

const connectionString =
  "mongodb+srv://mongo:mongo@cluster0.zyxl7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const dbConnect = MongoClient.connect(connectionString, {
  useUnifiedTopology: true,
});

app.post("/addClass", function (req, res) {
  dbConnect
    .then((client) => {
      const db = client.db("class-db");
      const classesCollection = db.collection("classes");
      classesCollection
        .insertOne({
          class: req.body.class,
          numberOfStudent: req.body.numberOfStudent,
        })
        .then((result) => {
          console.log(result);
          res.send(result);
        })
        .catch((error) => console.error(error));
    })
    .catch(console.error);
});

app.get("/getClass", (req, res) => {
  dbConnect.then((client) => {
    const db = client.db("class-db");
    db.collection("classes")
      .find()
      .toArray()
      .then((results) => {
        res.json(results);
      })
      .catch((error) => console.error(error));
  });
});
