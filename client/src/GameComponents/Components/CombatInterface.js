import React, { useState, useEffect } from 'react'
import MiddleCombatContainer from './Interface/MiddleCombatContainer'
import LeftContainer from './Interface/LeftContainer'
import ContextContainer from './Interface/ContextContainer'
import RightContainer from './Interface/RightContainer'
import BottomCombatContainer from './Interface/BottomCombatContainer.js'
import '../Styles/GameInterface.css'
import useIsMount from '../useIsMount'
import monsterData from '../Data/monsterData'

const generateEncounterData = () => {
    let table = []
    const numberOfMonsters = randomNumber(5)
    console.log("numbofmon" + numberOfMonsters)
    for (let i = 0; i < numberOfMonsters; i++) {
        table.push(monsterData.Monster[(randomNumber(5))-1])
    }
    return table
}

const randomNumber = i => {
    return (Math.floor(1 + Math.random() * i))
}

const CombatInterface = ({miscStats, chosenLanguage, setGameState}) => {
    const isMount = useIsMount()
    const [buttonLastClicked, setButtonLastClicked] = useState('')
    const [monsters, setMonsters] = useState([])

    useEffect(() => {
        if (isMount) {
            setMonsters(
                ...monsters,
                generateEncounterData()
            )
        }
    })

    const handleCombatAction = (id) => {
        switch(buttonLastClicked) {
            case 'attack':
                // setMonsters([{
                //     ...monsters,

                // }])
                console.log(id)
                //setButtonLastClicked(null)
                break
            default:
                //setButtonLastClicked(null)
                break
        }
    }

    const handleClick = i => {
        setButtonLastClicked(i)
        console.log(buttonLastClicked)
    }

    const combatInterface = (
        <div className='gameInterface'>
            <LeftContainer 
                miscStats={miscStats}
                chosenLanguage={chosenLanguage}
            />
            <ContextContainer 
                onClick={handleClick}
                chosenLanguage={chosenLanguage}
                setGameState={setGameState}
            />
            <MiddleCombatContainer
                handleCombatAction={handleCombatAction}
                buttonLastClicked={buttonLastClicked}
                monsters={monsters}
                setMonsters={setMonsters}
            />
            <RightContainer />
            <BottomCombatContainer 
                contextClicked={buttonLastClicked}
                chosenLanguage={chosenLanguage}
            />
        </div>
    )

    return (
        <div className='combatInterface'>
            {combatInterface}
        </div>
    )
}

export default CombatInterface