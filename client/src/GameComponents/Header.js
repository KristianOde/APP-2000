// Mikael

import React from 'react'
import Footer from './Footer'
import Login from './Login'
import Home from './Home'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Header() {
    return (
        <div>
           <Router>
              <div>
                <nav>
                <ul>
                    <li>
                      <Link className='navKnapp' to="/Home">Home</Link>
                    </li>
                    <li>
                      <Link className='navKnapp' to="/Login">Login</Link>
                    </li>
                    <li>
                      <Link className='navKnapp' to="/Footer">About</Link>
                    </li>
                    </ul>
                </nav>
                <switch>
                    <Route path="/Home" exact component={Home} />
                    <Route path="/Login" exact component={Login} />
                    <Route path="/Footer" component={Footer} />
                </switch>
              </div>
        </Router>
        </div>
    )

}

export default Header