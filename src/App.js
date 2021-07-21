import "./App.css";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Details from './Components/Details.js';
import Search from './Components/Search';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
