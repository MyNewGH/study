import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from "react-bootstrap";
import Home from "./pages/home";
import Login from "./pages/login";
import HeaderComponent from "./components/Headers";
import Table from './pages/Table'
import Drop from "./pages/drap";
import Form from './pages/testForm'
import Search from "./pages/search";
function App() {
  return (
    <Router>
      <HeaderComponent/>
      <Container className="mt-3">
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/test" component={Form} exact/>
          <Route path="/table" component={Table} exact/>
          <Route path="/drop" component={Drop} exact/>
          <Route path="/search" component={Search} exact/>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
