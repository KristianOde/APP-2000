import React from 'react'
import monsterData from '../Data/monsterData.json'

/* Enkel funksjon brukt for testing */
function generateColor() {
    return '#' +  Math.random().toString(16).substr(-6);
} 

/* Oppretter en tabell over monstere i et nytt "random encounter" */
const generateEncounterTable = function() {
    let table = []
    let number = Math.floor(1 + Math.random() * 5)
    for (let i = 0; i < number; i++) {
        let chosenMonster = (Math.floor(1 + Math.random() * 5)) - 1
        table.push(
            monsterData.Monster[chosenMonster]
        )
    }
    var table1 = JSON.parse(JSON.stringify(table));
    for (let i = 0; i < table.length; i++) {
        table1[i].health += (Math.floor(1 + Math.random() * 150))
    }
    console.log(table1)
    return table1
}


/* Kontaineren for monstre */
class Monsters extends React.Component {
    constructor() {
        super()
        this.state = {
            monsterdata: generateEncounterTable()
        }
        this.attack = this.attack.bind(this);
    } 

    attack(monster) {
        this.setState({
            health: 20
        })
    }
    
    render() {
        const monsterItems = this.state.monsterdata.map(monster => <Monster monsterinfo={monster} attack={this.attack.bind(this)}/>)
        return (
            <div className="monsterDisplay">{monsterItems}</div>
        )
    }
}

/* Selve monsterboksen */
function Monster(props) {
    return (
        <div className="monsterBox" style={{backgroundColor: generateColor()}} onClick={props.attack} >
            <p>{props.monsterinfo.name}</p>
            <p>{props.monsterinfo.health}</p>
            <p>{props.monsterinfo.strength}</p>
        </div>
    )
}

export default Monsters