import React from 'react'
import Monster from './Monster'
import monsterData from '../Data/monsterData.json'

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
        table1[i].id = table1[i].name + (i+1) // lager en key for komponenten
    }
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

    componentDidMount() {
        this.setState(prevState => {
            const updatedMonsterdata = prevState.monsterdata.map(mdata => {
                return {
                    ...mdata,
                    alive: true
                }
                return mdata
            })
            return {
                monsterdata: updatedMonsterdata
            }
        })
    }

    componentDidUpdate() {
        
    }

    attack(id) {
        let currHP = 0
        this.setState(prevState => {
            const updatedMonsterdata = prevState.monsterdata.map(mdata => {
                if (mdata.id === id) {
                    currHP = mdata.health - 50
                    if (currHP < 1 && mdata.alive) {
                        return {
                            ...mdata,
                            alive: false,
                            health: 0
                        }
                    }
                    return {
                        ...mdata,
                        health: mdata.health - 50,
                    }
                }
                return mdata
            })
            return {
                monsterdata: updatedMonsterdata
            }
        })
    }
    
    render() {
        const monsterItems = this.state.monsterdata.map(monster => <Monster key={monster.id} monsterinfo={monster} attack={this.attack}/>)
        return (
            <div className="monsterDisplay">{monsterItems}</div>
        )
    }
}

/* Selve monsterboksen */


export default Monsters