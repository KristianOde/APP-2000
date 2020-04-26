import React from 'react'
import adventurers from './CharacterBox'

const RightContainer = () => {
    let className = 'rightContainer';
    return (
      <div className={className}>
        {adventurers()}
      </div>
    )
}

export default RightContainer