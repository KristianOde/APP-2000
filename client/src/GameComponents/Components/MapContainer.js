//Skrevet av Jørgen, med hjelp fra Robin og Kristian
import React from 'react'
import mapData from "../Data/mapData.js"
import Places from "./Places.js"

class MapContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            locations: mapData,
            img: "/map.png"
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id, newImg) {
        console.log("Changed", id)
        this.setState({ 
            img: newImg
        })
    }
    
    render() {
        const mapComponents = this.state.locations.map(location => <Places key={location.id} onClick={this.handleClick} location={location}/>)
        
        return (/*
            <div className="MapContainer box">
                <img src={this.state.imgList[this.state.index]} alt="" height="50%" width="100%"/><br />
                <a href="#Pleasantville"  onClick={this.handleClick}>Pleasantville</a> <br />
                <a href="#BanditSettlement">Bandit Settlement</a> <br />
                <a href="#TheGoblinTombs">The Goblin Tombs</a> <br />
                <a href="#CastleofBoletaria">Castle of Boletaria</a> <br />
            </div>
            */
            <div className="MapContainer box">
                <img src={this.state.img} alt="" height="50%" width="100%"/>
                {mapComponents}
            </div>
        )
    }
}

export default MapContainer