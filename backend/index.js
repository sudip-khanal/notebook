const ConnectToMOngo = require("./db");
const express = require("express");
var cors = require("cors");

ConnectToMOngo();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

app.listen(port, () => {
  console.log(`Notebook backend listening on port ${port}`);
});
