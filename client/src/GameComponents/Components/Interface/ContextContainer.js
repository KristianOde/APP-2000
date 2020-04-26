import React from 'react'

function ContextHover() {
    console.log("...")
}

const ContextContainer = ({onClick, chosenLanguage, setGameState}) => {
    let className = 'contextContainer combatDialogueContainer';
    const text = chosenLanguage.CombatOptions[0]
    return (
        <div className={className}>
            <button 
                className="box combatDialogue" 
                onClick={() => onClick("attack")}
                name="attack"
                //onMouseClick={testFunksjon}
            >
                {text.attack}
            </button>
            <button 
                className="box combatDialogue" 
                onClick={() => onClick("spell")}
                name="spell"
                //onMouseClick={testFunksjon}
            >
                {text.spell}
            </button>
            <button 
                className="box combatDialogue" 
                onClick={() => onClick("item")}
                name="item"
                //onMouseClick={testFunksjon}
            >
                {text.item}
            </button>
            <button 
                className="box combatDialogue" 
                onClick={() => setGameState("dungeon")}
                name="run"
                //onMouseClick={testFunksjon}
            >
                {text.run}
            </button>
        </div>
    )

}

export default ContextContainer