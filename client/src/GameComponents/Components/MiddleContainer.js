import React from 'react'
import Monsters from './Monsters'

function MiddleContainer() {
    let className = 'middleContainer box';
    return (
      <div className={className}>
        <Monsters />
      </div>
    )
}

export default MiddleContainer