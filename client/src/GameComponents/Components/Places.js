import React from "react"

function Places(props) {
    return(
        <div>
            <a 
            href={"#" + props.location.name} 
            onClick={() => props.onClick(props.location.id, props.location.img)}
            >
            {props.location.name}
            </a>
            {console.log(props.location)}
        </div>
    )
}

export default Places