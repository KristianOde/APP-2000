/**
 * Skrevet av Mikael
 */

import React from 'react';
import Header from './Header';
import Footer from "./Footer";
import './loginStyle.css';

class App extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <Footer />
            </div>
        )
}
}

export default App