import React from 'react'
import adventurers from './CharacterBox'

{/* Kristian START */}

{/**Komponent for boksen som viser eventyrerne til spilleren.
    Kaller på funksjonen adventurers() fra CharacterBox.js
    for å "befolke" denne komponenten med CharacterBox-komponenter. */}
const RightContainer = () => {
    let className = 'rightContainer';
    return (
      <div className={className}>
        {adventurers()}
      </div>
    )
}

export default RightContainer