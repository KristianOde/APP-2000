import React from 'react'
import '../../Styles/GameInterface.css'
import LeftContainer from '../Interface/LeftContainer'
import RightContainer from '../Interface/RightContainer'
import BottomDialogueContainer from './BottomDialogueContainer'
import DungeonViewContainer from './DungeonViewContainer'
import MovementContainer from './MovementContainer'

const DungeonView = props => {
    return (
        <div className='gameInterface'>
            <LeftContainer
                miscStats={props.miscStats}
                chosenLanguage={props.chosenLanguage}
            />
            <MovementContainer 
                setGameState={props.setGameState}
            />
            <DungeonViewContainer />
            <RightContainer />
            <BottomDialogueContainer 
                chosenLanguage={props.chosenLanguage}
            />
        </div>
    )
}

export default DungeonView