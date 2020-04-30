import React from 'react'

const Toolbar = ({handleLanguageChange, handleRetry}) => {
    const style = {
        backgroundColor: "black",
        border: "none",
        color: "white",
        fontSize: "20px",
        cursor: "pointer"
    }
    return (
        <div className='toolbar'>
            <button style={style} onClick={handleLanguageChange}>EN/NO</button>
            |
            <button style={style} onClick={handleRetry}>Retry</button>
        </div>
    )
}

export default Toolbar