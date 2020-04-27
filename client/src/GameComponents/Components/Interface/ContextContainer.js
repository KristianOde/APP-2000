import React from 'react'

{/* Kristian START */}

{/**Komponent for å rendre menyknappene som dukker opp når det er kamp */}
const ContextContainer = ({handleClick, chosenLanguage, setGameState}) => {
    {/**text, og chosenLanguage, peker på en variabel som ble erklært i 
        App.js og har blitt ført ned som "props" i flere komponenter. 
        Denne variabelen gir deg en tabell med alle tekstfeltene spillet
        trenger. */}
    const text = chosenLanguage.CombatOptions[0]
    return (
        <div className='contextContainer combatDialogueContainer'>
            {/**Knappene under peker på handleClick-propen, som er
                en funksjon som har blitt passert ned fra 
                CombatInterface-komponenten*/}
            <button 
                className="box combatDialogue" 
                onClick={() => handleClick("attack")}
                name="attack"
            >
                {text.attack}
            </button>
            <button 
                className="box combatDialogue" 
                onClick={() => handleClick("spell")}
                name="spell"
            >
                {text.spell}
            </button>
            <button 
                className="box combatDialogue" 
                onClick={() => handleClick("item")}
                name="item"
            >
                {text.item}
            </button>
            <button 
                className="box combatDialogue" 
                onClick={() => setGameState("dungeon")}
                name="run"
            >
                {text.run}
            </button>
        </div>
    )

}

{/* Kristian END */}

export default ContextContainer