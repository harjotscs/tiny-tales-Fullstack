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
  let links = [];
  for (rollnumber of rollnumbers) {
    if (rollnumber != "") {
      links.push(
        `https://terriblytinytales.com/testapi?rollnumber=${rollnumber}`
      );
    }
  }
  const responses = await axios.all(links.map((link) => axios.get(link)));
  let i = 0;
  for (response of responses) {
    result.push({
      rollnumber: rollnumbers[i],
      status: response.data,
    });
    i++;
  }
  res.status(200).send(result);
});

app.get("*", (req, res) => {
  if (req.query.rollnumbers)
    return res.redirect(`/api/results?rollnumbers=${req.query.rollnumbers}`);
  res.status(400).send({ Error: "You must pass atleast one roll number" });
});

app.get("/api/results/m2", async (req, res) => {
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

const server = app.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
