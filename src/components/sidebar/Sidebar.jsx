import React from 'react'
import "./sidebar.css"
import { LineStyle, Timeline, GroupsOutlined, MenuBook, People, CreditCard, Logout, Cached, ManageAccounts } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from 'recoil'
import { userState } from "../atom/UserAtom"

export default function Sidebar() {
    const [currentUser, setcurrentUser] = useRecoilState(userState)
    const navigate = useNavigate()
    const logout = () => {
        setcurrentUser("")
        navigate("../signin", { replace: true })
    }

    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <li className="sidebarListItems active" >
                                <LineStyle className='sidebarIcons' />
                                Home
                            </li>
                        </Link>

                        <Link to="/" style={{ textDecoration: "none" }}>
                            <li className="sidebarListItems">
                                <Timeline
                                    className='sidebarIcons' />
                                Analytics
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="sidebarMenu">
                    {/* <h3 className="sidebarTitle">QuickMenu</h3> */}
                    <ul className="sidebarList">
                        <Link to="/enquiries" style={{ textDecoration: "none" }}>
                            <li className="sidebarListItems">
                                <Cached className='sidebarIcons' />
                                Enquiries
                            </li>
                        </Link>

                        <Link to="/student" style={{ textDecoration: "none" }}>
                            <li className="sidebarListItems">
                                <GroupsOutlined className='sidebarIcons' />
                                Students
                            </li>
                        </Link>
                        <Link to="/tutor" style={{ textDecoration: "none" }}>

                            <li className="sidebarListItems " >
                                <People
                                    className='sidebarIcons' />
                                Tutors
                            </li>
                        </Link>
                        <Link to="/courses" style={{ textDecoration: "none" }}>

                            <li className="sidebarListItems">
                                <MenuBook
                                    className='sidebarIcons' />
                                Courses
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    {/* <h3 className="sidebarTitle">Others</h3> */}
                    <ul className="sidebarList">

                        <Link to='/payments' style={{ textDecoration: "none" }}>
                            <li className="sidebarListItems" >
                                <CreditCard className='sidebarIcons' />
                                Payments
                            </li>
                        </Link>

                        <Link to="/manage" style={{ textDecoration: "none" }}>
                            <li className="sidebarListItems">
                                <ManageAccounts className='sidebarIcons' />
                                Manage
                            </li>
                        </Link>
                        <li onClick={logout} className="sidebarListItems">
                            <Logout
                                className='sidebarIcons1' />
                            <span className='logout'>Logout</span>

                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}
