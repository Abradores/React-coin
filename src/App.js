import React from "react";
import "./App.css";
import Header from "./common/Header";
import List from "./List/List";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./common/notfound";
import Detail from "./List/Detail";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:id" component={Detail} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
