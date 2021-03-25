const express = require("express");
const axios = require("axios");

const port = process.env.PORT || 3080;

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET");
  }
  next();
});

app.get("/api/results", async (req, res) => {
  if (!req.query.rollnumbers) {
    return res
      .status(400)
      .send({ Error: "You must pass atleast one roll number" });
  }
  const rollnumbers = req.query.rollnumbers.split(",");
  const result = [];
  for (rollnumber of rollnumbers) {
    if (rollnumber != "") {
      const response = await axios.get(
        `https://terriblytinytales.com/testapi?rollnumber=${rollnumber}`
      );
      result.push({
        rollnumber,
        status: response.data,
      });
    }
  }
  res.status(200).send(result);
});

app.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
