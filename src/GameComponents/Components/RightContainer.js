import React from 'react'
import adventurers from '../Components/CharacterBox'

function RightContainer() {
    let className = 'rightContainer';
    return (
      <div className={className}>
        {adventurers()}
      </div>
    )
}

export default RightContainer