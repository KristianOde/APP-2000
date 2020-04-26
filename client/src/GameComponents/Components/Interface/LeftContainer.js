import React from 'react'

const LeftContainer = ({miscStats, chosenLanguage}) => {
    const text = chosenLanguage.Various[0]
    const className = 'leftContainer box';
    return (
      <div className={className}>
        <div className='partyBox'>
          {text.gold}: {miscStats.gold}
        </div>
      </div>
    )
}

export default LeftContainer