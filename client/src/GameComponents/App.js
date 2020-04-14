import React from 'react';
import MiddleContainer from './Components/MiddleContainer'
import BottomContainer from './Components/BottomContainer'
import LeftContainer from './Components/LeftContainer'
import RightContainer from './Components/RightContainer'
import ContextContainer from './Components/ContextContainer'
import MapContainer from './Components/MapContainer'
import './App.css';

class App extends React.Component {
  render() {
    let className = 'mainContainer';
    let mapContainer = 'mapContainer';
    return (
      <div>
        <div className={className}>
          <LeftContainer/>
          <MiddleContainer/>
          <RightContainer/>
          <ContextContainer/>
          <BottomContainer/>
          <MapContainer />
          <div className="empty"></div>
        </div>
      </div>
    )
  }
}

export default App;