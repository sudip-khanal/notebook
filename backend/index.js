const ConnectToMOngo = require("./db");
const express = require("express");

ConnectToMOngo();

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

app.listen(port, () => {
  console.log(`Notebook backend listening on port ${port}`);
});
