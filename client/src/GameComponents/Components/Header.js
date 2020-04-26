import React from 'react'
import '../Styles/Header.css'

const Header = ({onClick}) => {
    return (
        <header>
            <a href="#default">Dungeon Crawler</a>
            <div className="header-right">
                <a href="#default">Log in</a>
                <a href="#default" onClick={onClick}>EN/NO</a>
            </div>
        </header>
    )
}

export default Header