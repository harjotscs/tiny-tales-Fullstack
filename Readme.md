<p align="center">
  <a href="https://github.com/harjotscs/tiny-tales-Fullstack">
    <img src="client\public\logo512.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Terribly Tiny Tales Assignment</h3>

  <p align="center">
    The backend API of the project is implemented using node js and frontent part in developed using React js library keeping in mind using minimal dependencies.
    <br />
    <a href="#about-the-project"><strong>Read More »</strong></a>
    <br />
    <br />
    <a href="https://harjot-assignment.vercel.app/">View App Demo</a>
    ·
    <a href="https://harjot-assignment.herokuapp.com/api/results?rollnumbers=1,2,3">Backend API Hosted At Heroku</a>
    ·
    <a href="http://tinytale-env1.eba-rkg6qmdt.ap-south-1.elasticbeanstalk.com/api/results?rollnumbers=1,2,3">Backend API Hosted At AWS</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#backend-api">Backend API</a></li>
        <li><a href="#frontend">Frontend</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#testcases">Test Cases</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Tiny Tales Frontend ScreenShot][product-screenshot]](https://harjot-assignment.vercel.app/)

The project is seperated in two parts:

<ol>
<li><a href="#backend-api">Backend API</a></li>
<li><a href="#frontend">Frontend</a></li>
</ol>

## Backend API

The Backend API is built using Node js & express js

[![Tiny Tales Backend API ScreenShot][backend-screenshot]](https://harjot-assignment.herokuapp.com/api/results?rollnumbers=1,2,3)

- Whenever user sends query of rollnumbers at /api/results, the code splits the query string seperated by commas into an array which is stored in rollnumbers, if user accidentally puts comma after entering numbers the code will ignore last comma which means if user passes 1,2, the comma after 2 does not make sense so will be ignored, after this query links for the provided <a href="https://terriblytinytales.com/testapi?rollnumber=123">external API</a> are generated and stored in links array using for of loop and push function to store in array after this links array is passed to axios.all method which gets back responses from all links, then again for of loop is used to store response and roll number into single object and then pushed into results array which then will be sent to user with the status code 200. If user had not sent query of rollnumbers, the api will return an error object saying "You must pass atleast one roll number" along with status code 404

  ```sh
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
  ```

[![Tiny Tales Backend API ScreenShot][backend-screenshot11]](https://harjot-assignment.herokuapp.com)

- Another method for getting same result as above, the only difference between two methods is that, this method uses axios.get() method again and again till all the rollnumbers are queried & then pushes it into result array rest is same

  ```sh
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

  ```

- Rollnumbers query sent to any page will be redirected to /api/results with query as rollnumbers if any

  ```sh
  app.get("*", (req, res) => {
  if (req.query.rollnumbers)
    return res.redirect(`/api/results?rollnumbers=${req.query.rollnumbers}`);
  res.status(400).send({ Error: "You must pass atleast one roll number" });
  });

  ```

- CORS implementation, Allowed only GET method

  ```sh
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

  ```

## Frontend

The frontend of this Web App is built using React js and animation in the frontend are made with CSS from scratch, no external CSS library/framework is used.

[![Tiny Tales Frontend ScreenShot][product-screenshot2]](https://harjot-assignment.vercel.app/)

- An animation is shown when page is loaded an input box is shown to user to enter roll numbers if user want's to know about multiple roll numbers then user needs to seperate roll numbers using **,** and click on Get results, the user can't insert space, when user enter something a handle change function runs due to onChange event if current input consist space it get's replaced with no space using regex (/\s/g, "") thus user interprets that he never able to add space as space is never added to state

  ```sh
   const handleChange = (event) => {
    if (event.currentTarget.value.includes(" ")) {
      event.currentTarget.value = event.currentTarget.value.replace(/\s/g, "");
    }
    const newValue = event.target.value;
    setInputText(newValue);
  };

  ```

[![Tiny Tales Frontend ScreenShot][product-screenshot3]](https://harjot-assignment.vercel.app/)

- Then spinning circle animation along with Please Wait Your Request Is Being Processed is shown

[![Tiny Tales Frontend ScreenShot][product-screenshot9]](https://harjot-assignment.vercel.app/)

- Then the result table is shown to the user.

[![Tiny Tales Frontend ScreenShot][product-screenshot8]](https://harjot-assignment.vercel.app/)

- If user tries to directly enter the route /result an error You must enter atleast one roll number will be shown on screen.

- The Web App is split into various components like Header InputForm ResultTable TableRow, Input is taken is InputForm when data from backend is recieved from the backend API, then data is mapped through TableRow and then returned to ResultTable, the header component remains the same on all pages, and CSS is stored in App.css

### Built With

- [React.Js](https://reactjs.org/)
- [Node.Js](https://nodejs.org/en/)
- [Axios](https://www.npmjs.com/package/axios)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Make sure you have node js installed on your system.

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:harjotscs/tiny-tales-Fullstack.git
   ```
2. Move into server and client folder on different termials

   ```sh
   cd client
   ```

   ```sh
   cd server
   ```

3. Install NPM packages enter below command on both terminals
   ```sh
   npm install
   ```
4. Run Server & enter below command on both terminals
   ```sh
   npm start
   ```

<!-- Testcases -->

## Testcases

1. Testcase 1:

   [![Tiny Tales Frontend ScreenShot][product-screenshot2]](https://harjot-assignment.vercel.app/)

- Data: 1,2,3
- Output:

[![Tiny Tales Frontend ScreenShot][product-screenshot9]](https://harjot-assignment.vercel.app/)

2. Testcase 2:

   [![Tiny Tales Frontend ScreenShot][product-screenshot7]](https://harjot-assignment.vercel.app/)

- Data: 1,2,3,4,5,6,7,8,9,10,11,12,13
- Output:

[![Tiny Tales Frontend ScreenShot][product-screenshot6]](https://harjot-assignment.vercel.app/)

3. Testcase 3:

   [![Tiny Tales Frontend ScreenShot][product-screenshot12]](https://harjot-assignment.vercel.app/)

- Data: 5,6,9,12,18,20,25,30,32,36,37,38,40,42,45,47,49,50
- Output:

[![Tiny Tales Frontend ScreenShot][product-screenshot5]](https://harjot-assignment.vercel.app/)

[![Tiny Tales Frontend ScreenShot][product-screenshot4]](https://harjot-assignment.vercel.app/)

_Various other testcases along with these and data, mentioned in [testcases folder](testcases)_

<!-- CONTACT -->

## Contact

Harjot Singh - harjotscs@gmail.com

Project Link: [https://github.com/harjotscs/tiny-tales-Fullstack](https://github.com/harjotscs/tiny-tales-Fullstack)

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: testcases/screenshot1.png
[backend-screenshot]: testcases/screenshot10.png
[backend-screenshot11]: testcases/screenshot11.png
[product-screenshot2]: testcases/screenshot2.png
[product-screenshot3]: testcases/screenshot3.png
[product-screenshot4]: testcases/screenshot4.png
[product-screenshot5]: testcases/screenshot5.png
[product-screenshot6]: testcases/screenshot6.png
[product-screenshot7]: testcases/screenshot7.png
[product-screenshot8]: testcases/screenshot8.png
[product-screenshot9]: testcases/screenshot9.png
[product-screenshot12]: testcases/screenshot12.png
