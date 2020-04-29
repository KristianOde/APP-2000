/**
 * Skrevet av Mikael
 */

import React from "react";
import Register from "./Register";
import Login from "./Login";
import Delete from "./Delete";
import Settings from "./Settings";
import CharacterCreation from "./CharacterCreation";

import Game from "../GameComponents/App";
import Home from "./Home";
import { HashRouter as Router, Route, Link } from "react-router-dom";

class Header extends React.Component {
  /*
   * Funksjon som tømmer SessionStorage som er brukernavnet og laster nettsiden pånytt
   */
  Logout() {
    window.sessionStorage.setItem("key", null);
    window.location.replace("https://app2000rpg.herokuapp.com/#/");
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
                  <h1 className="logo">Dungeon Crawler</h1>
                </li>
                <li>
                  <Link className="navKnapp" to="/">
                    Home
                  </Link>
                </li>

                <li>
                  {" "}
                  {/*
                   * Bytter ut Sign up komponenten med Game komponenten hvis bruker er logget inn
                   */}
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
                  {/*
                   * Bytter ut Login komponenten med Logout funksjonen hvis bruker er logget inn
                   */}
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
                  {/*
                   * Viser bare Settings hvis noen er logget inn
                   */}
                  {window.sessionStorage.getItem("key") == null ||
                  window.sessionStorage.getItem("key") == "null" ? (
                    ""
                  ) : (
                    <Link className="navKnapp" to="/Settings">
                      Settings
                    </Link>
                  )}
                </li>
                <li>
                  {/*
                   * Viser bare Delete hvis noen er logget inn
                   */}
                  {window.sessionStorage.getItem("key") == null ||
                  window.sessionStorage.getItem("key") == "null" ? (
                    ""
                  ) : (
                    <Link className="navKnapp" to="/Delete">
                      Delete
                    </Link>
                  )}
                </li>
                <li>
                  <h1 className="loggedInAs">
                    {" "}
                    Logged in as:
                    <img className="smolGobNav" src="../Goblin.png" alt='gobgobsmol'></img>
                    <span style={{color: 'red'}}>
                    {window.sessionStorage.getItem("key") != "null"
                      ? window.sessionStorage.getItem("key")
                      : ""}{" "}
                  </span>
                  </h1>
                </li>
              </ul>
            </nav>
            {/* Linker til de diverse komponentene */}
            <Route path="/Login" exact component={Login} />
            <Route path="/Delete" exact component={Delete} />
            <Route path="/Settings" exact component={Settings} />
            <Route path="/Register" exact component={Register} />
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              path="/CharacterCreation"
              exact
              component={CharacterCreation}
            />
            <Route path="/Game" exact component={Game} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Header;
