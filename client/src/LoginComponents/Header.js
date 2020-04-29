/**
 * Skrevet av Mikael
 */

import React from 'react';
import Register from "./Register";
import Login from "./Login";
import CharacterCreation from "./CharacterCreation";

import Home from "./Home";
import Game from "../GameComponents/App";
import {
  HashRouter as Router,
  Route,
  Link
} from "react-router-dom";

function Header() {
  
  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <h1 className="logo">Temp</h1>
              </li>
              <li>
                <Link className="navKnapp" to="/Register">
                  Sign up...
                </Link>
              </li>
              <li>
                <Link className="navKnapp" to="/CharacterCreation">
                  Character Creation
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
              <li>
                <h1 className="logo">User: {window.sessionStorage.getItem("key")}</h1>
              </li>
            </ul>
          </nav>

          <Route path="/Login" exact component={Login} />
          <Route path="/Register" exact component={Register} />
          <Route path="/CharacterCreation" exact component={CharacterCreation} />
          <Route exact path="/Home" render={props => <Home {...props} />} />

          <Route path="/Game" exact component={Game} />
        </div>
      </Router>
    </div>
  );
}

export default Header;