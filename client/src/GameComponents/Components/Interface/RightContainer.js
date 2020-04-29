import React from 'react'
import adventurers from './CharacterBox'

{/* Kristian START */}

{/**Komponent for boksen som viser eventyrerne til spilleren.
    Kaller på funksjonen adventurers() fra CharacterBox.js
    for å "befolke" denne komponenten med CharacterBox-komponenter. */}
const RightContainer = ({party}) => {
    let className = 'rightContainer';
    return (
      <div className={className}>
        {adventurers(party)}
      </div>
    )
}

export default RightContainer