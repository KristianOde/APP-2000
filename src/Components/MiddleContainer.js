import React from 'react'
import Monsters from '../Components/Monster'

function MiddleContainer() {
    let className = 'middleContainer box';
    return (
      <div className={className}>
        <Monsters />
      </div>
    )
}

export default MiddleContainer