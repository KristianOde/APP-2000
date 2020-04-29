//Skrevet av Jørgen, med hjelp fra Robin og Kristian
import React from "react"

function Places(props) {
    return(
        <div>
            <a 
            href={"#/Game/#" + props.location.name} 
            onClick={() => props.onClick(props.location.id, props.location.img)}
            >
            {props.location.name}
            </a>
        </div>
    )
}

export default Places