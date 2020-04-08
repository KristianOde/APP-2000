/**
 * Skrevet av Mikael
 */

import React, { useState} from "react";
import Register from "./Register";
import Login, { CountDisplay, Counter } from "./Login";

import Home from "./Home";
import Game from "../GameComponents/App";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import UserProfile from "./UserProfile";

function Header() {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(c => c + 1);

  const [auth] = useState(false);

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          auth ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/Register" }} />
          )
        }
      />
    );
  };

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
              <li>
                <h1 className="logo">User: {UserProfile.getEmail()}</h1>
              </li>
            </ul>
          </nav>

          <Route path="/Login" exact component={Login} />
          <Route path="/Register" exact component={Register} />

          <Route exact path="/Home" render={props => <Home {...props} />} />

          <Route path="/Game" exact component={Game} />
        </div>
      </Router>
    </div>
  );
}

export default Header;

//<button onClick={() => setUser(count + 1)}>Click me</button> <p>{count}</p>

//<button onClick={() => setUser(UserProfile.getEmail())}>Click me</button>
//          <p>{wallUser}</p>
