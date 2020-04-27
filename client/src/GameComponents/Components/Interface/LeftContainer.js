import React from 'react'

{/* Kristian START */}

{/**Komponent for venstre boks i spillgrensesnittet.
    Viser litt generell informasjon som hvor mye gull
    spilleren har tjent. */}
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

{/* Kristian END */}

export default LeftContainer