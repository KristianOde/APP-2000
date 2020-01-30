import React from 'react';
import MiddleContainer from './Components/MiddleContainer'
import BottomContainer from './Components/BottomContainer'
import LeftContainer from './Components/LeftContainer'
import RightContainer from './Components/RightContainer'
import ContextContainer from './Components/ContextContainer'
import './App.css';

class App extends React.Component {
  render() {
    let className = 'mainContainer';
    return (
      <div className={className}>
        <LeftContainer/>
        <MiddleContainer/>
        <RightContainer/>
        <ContextContainer/>
        <BottomContainer/>
      </div>
    )
  }
}

export default App;
