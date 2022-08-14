import React from 'react'
import "./Header.css"
import trelloLogo from "../../assets/images/trello_logo.svg"

export const Header = () => {
    return <div className="header-container">
        <img className="app-logo" src={trelloLogo} />
    </div>
}