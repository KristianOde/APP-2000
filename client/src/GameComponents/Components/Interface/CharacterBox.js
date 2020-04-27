import React from 'react'
import adventurerData from '../../Data/adventurerData.json'

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

export default adventurers