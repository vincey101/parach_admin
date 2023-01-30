import React from 'react'
import "./navbar.css"
import logo from "../../assets/parach_logo.png"
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import { Link } from "react-router-dom"



export default function Navbar() {
    return (
        <div className='navbar'>
            <div className="navbarWrapper">
                <div className="navLeft">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className="logo">Parach</span>

                    </Link>

                </div>
                <div className="navRight">
                    <div className="navbarContainer">
                        <NotificationsNone />
                        <span className="navIconBadge">2</span>
                    </div>
                    <div className="navbarContainer">
                        <Language />
                    </div>
                    <div className="navbarContainer">
                        <Settings />
                    </div>
                    <img src={logo} alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
