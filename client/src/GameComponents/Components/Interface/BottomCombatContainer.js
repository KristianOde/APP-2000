import React from 'react'

{/* Kristian START */}

{/** Komponenten for dialogboksen i kamp */}
const BottomCombatContainer = ({message, contextClicked, chosenLanguage}) => {
    // const dialogue = chosenLanguage.CombatDialogue[0]
    // let message = mess
    
    {/** Switch som bestemmer hva beskjeden i dialogboksen skal være */}
    // switch(contextClicked) {
    //   case 'attack':
    //     message = dialogue.attackChosen
    //     break
    //   case 'spell':
    //     message = dialogue.spellChosen
    //     break
    //   case 'item':
    //     message = dialogue.itemChosen
    //     break
    //   case 'run':
    //     message = dialogue.runChosenFail
    //     break
    //   default:
    //     break
    // }

    return (
      <div className="bottomContainer box">
        <span className='flavorText'>{message}</span>
      </div>
    )
}

{/* Kristian END */}

export default BottomCombatContainer