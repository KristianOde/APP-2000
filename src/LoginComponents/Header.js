// Mikael

import React from "react";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Game from "../GameComponents/App";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function Header() {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link className="navKnapp" to="/Register">
                  Sign up
                </Link>
              </li>
              <li>
                <Link className="navKnapp" to="/Home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="navKnapp" to="/Game">
                  Game
                </Link>
              </li>
              <li>
                <Link className="navKnapp" to="/Login">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
          <Route path="/Home" exact component={Home} />
          <Route path="/Register" exact component={Register} />
          <Route path="/Game" component={Game} />
          <Route path="/Login" component={Login} />
        </div>
      </Router>
    </div>
  );
}

export default Header;
