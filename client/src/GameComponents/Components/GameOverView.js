import React from 'react'

const GameOverView = () => {
    const style = {
        width: "500px",
        height: "500px",
        margin: "0 auto",
        fontSize: "40px",
        color: "white",
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: "500px"
        
    }
    return (
        <div style={style}>
            <h1>You're dead</h1>
        </div>
    )
}

export default GameOverView