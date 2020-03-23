import React from 'react'

function ContextHover() {
    console.log("hei")
}

class ContextContainer extends React.Component {
    
    render() {
        let className = 'contextContainer';
        
        return (
            <div className={className}>
                <button 
                    className="box combatDialogue" 
                    onMouseOver={ContextHover}
                    //onMouseClick={testFunksjon}
                >
                    ATTACK
                </button>
                <button className="box combatDialogue" >SPELL</button>
                <button className="box combatDialogue" >ITEM</button>
                <button className="box combatDialogue" >RUN</button>
            </div>
        )
    }
}

export default ContextContainer