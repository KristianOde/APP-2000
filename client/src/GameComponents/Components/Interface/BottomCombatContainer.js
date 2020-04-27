import React from 'react'

const BottomCombatContainer = ({contextClicked, chosenLanguage}) => {
    const dialogue = chosenLanguage.CombatDialogue[0]
    let message = dialogue.combatStart
    switch(contextClicked) {
      case 'attack':
        message = dialogue.attackChosen
        break
      case 'spell':
        message = dialogue.spellChosen
        break
      case 'item':
        message = dialogue.itemChosen
        break
      case 'run':
        message = dialogue.runChosenFail
        break
      default:
        break
    }

    //const message = chosenLanguage.CombatDialogue.map( function())
    return (
      <div className="bottomContainer box">
        <span className='flavorText'>{message}</span>
      </div>
    )
}

export default BottomCombatContainer