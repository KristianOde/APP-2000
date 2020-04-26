import React from 'react'

const Toolbar = ({handleLanguageChange}) => {
    return (
        <div className='toolbar'>
            <button onClick={handleLanguageChange}>EN/NO</button>
            |
            <button>Style</button>
        </div>
    )
}

export default Toolbar