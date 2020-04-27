import React from 'react'
import adventurerData from '../../Data/adventurerData.json'

{/* Kristian START */}

{/**Funksjon som fyller og returnerer en tabell med data fra
    adventurerData.json. Hver rad i tabellen blir en
    CharacterInfo-komponent, som er definert i samme fil.*/}
const adventurers = function() {
    let table = []
    for (let i = 0; i < 4; i++) {
        const {imgUrl, name, maxhealth, strength, id} = adventurerData.Adventurer[i]
        table.push(
            <CharacterInfo 
                key={name+id}
                imgUrl={imgUrl}
                name={name}
                health={maxhealth}
                strength={strength}
            />
        )

    }
    return table;
}

{/**Komponent for dine "eventyrere".
    vanligvis får komponenter props fra sin "parent component", men her får
    den det det fra funksjonen adventurers, som da kan sies å være forelderen.*/}
const CharacterInfo = props => {
    return (
        <div className="character-box box">
            <img src={"../../Resources/Portraits/"+props.imgUrl} alt={props.name} className="box"/>
            <div className="adventurer-info">
                <span>{props.name}</span>
                <p>HP {props.health}</p>
                <p>STR {props.strength}</p>
            </div>
        </div>
    )
}

{/* Kristian END */}

{/**Merk at funksjonen adventurers blir eksportert og ikke
    komponenten CharacterInfo, da adventurers returnerer
    et antall CharacterInfo-komponenter etter behov*/}
export default adventurers