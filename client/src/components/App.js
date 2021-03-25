import "./App.css";
import Header from "./Header";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import InputForm from "./InputForm";
import ResultTable from "./ResultTable";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={InputForm} />
          <Route exact path="/results" component={ResultTable} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
