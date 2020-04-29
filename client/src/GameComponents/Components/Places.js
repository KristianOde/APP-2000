//Skrevet av Jørgen, med hjelp fra Robin og Kristian
import React from "react"

function Places(props) {
    return(
        <div>
            <button 
            className="mapLink"
            onClick={() => props.onClick(props.location.id, props.location.img)}
            >
            {props.location.name}
            </button>
        </div>
    )
}

export default Places