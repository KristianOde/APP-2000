import React from 'react'
import '../../Styles/GameInterface.css'
import LeftContainer from '../Interface/LeftContainer'
import RightContainer from '../Interface/RightContainer'
import BottomDialogueContainer from './BottomDialogueContainer'
import DungeonViewContainer from './DungeonViewContainer'
import MovementContainer from './MovementContainer'
import MapContainer from '../MapContainer'
import QuestContainer from '../QuestContainer'

{/* Kristian START */}

{/**Komponent for dungeonvisningen.
    Bruker flere av de samme komponentene som
    CombatInterface-komponentet, men med noen
    egne varianter av enkelte komponenter tilpasset
    dungeonvisningen. */}
const DungeonView = props => {
    return (
        <div className='gameInterface'>
            <LeftContainer
                gold={props.gold}
                chosenLanguage={props.chosenLanguage}
            />
            <MovementContainer 
                setGameState={props.setGameState}
            />
            <DungeonViewContainer />
            <RightContainer party={props.party}/>
            <BottomDialogueContainer 
                message={props.message}
            />
            {/*Jørgen start*/}
            <MapContainer className="mapContainer"/>
            <div className="empty"></div>
            {/*Jørgen slutt*/}

            {/*Robin start*/}
            <QuestContainer className="questContainer" />
            {/*Robin slutt*/}
        
        </div>
    )
}

{/* Kristian END */}

export default DungeonView