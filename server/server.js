require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./db/connect");
const port = process.env.PORT || 8080;
const cors = require("cors");
const routes = require("./routes/api");

dbConnect();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use("/api", routes);



app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
