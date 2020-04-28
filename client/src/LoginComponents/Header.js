/**
 * Skrevet av Mikael
 */

import React from "react";
import Register from "./Register";
import Login from "./Login";

import Home from "./Home";
import Game from "../GameComponents/App";
import { HashRouter as Router, Route, Link } from "react-router-dom";

class Header extends React.Component {
  Logout() {
    window.sessionStorage.setItem("key", null);
    window.location.reload();
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link className="navKnapp" to="/Home">
                    Home
                  </Link>
                </li>
                <li>
                  <h1 className="logo">Dungeon Crawler</h1>
                </li>
                <li>
                  {window.sessionStorage.getItem("key") == null ||
                  window.sessionStorage.getItem("key") == "null" ? (
                    <Link className="navKnapp" to="/Register">
                      Sign up
                    </Link>
                  ) : (
                    <Link className="navKnapp" to="/Game">
                      Game
                    </Link>
                  )}
                </li>
                <li>
                  {window.sessionStorage.getItem("key") == null ||
                  window.sessionStorage.getItem("key") == "null" ? (
                    <Link className="navKnapp" to="/Login">
                      Login
                    </Link>
                  ) : (
                    <Link className="navKnapp" onClick={this.Logout}>
                      Logout
                    </Link>
                  )}
                </li>
                <li>
                  <h1 className="logo">
                    {window.sessionStorage.getItem("key") != "null"
                      ? window.sessionStorage.getItem("key")
                      : ""}{" "}
                  </h1>
                </li>
              </ul>
            </nav>

            <Route path="/Login" exact component={Login} />
            <Route path="/Register" exact component={Register} />

            <Route exact path="/Home" render={(props) => <Home {...props} />} />

            <Route path="/Game" exact component={Game} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Header;
