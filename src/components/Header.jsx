import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,

    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import { FaBloggerB } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { GoGear } from "react-icons/go";


import { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { useEffect } from 'react';
import { extraUrlAndId } from '../utils/utils';


export const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { user, logOutUser } = useContext(userContext)
    const [avatar, setAvatar] = useState(null)
    console.log(user);

    useEffect(() => {
        user?.photoURL && setAvatar(extraUrlAndId(user.photoURL).url)
        !user && setAvatar(null)
    }, [user, user?.photoURL])


    const toggle = () => setIsOpen(!isOpen);


    return (
        <div >
            <Navbar fixed='top' expand="md" style={{ borderBottom: "1px solid gray", backgroundColor: "whitesmoke" }}>
                <NavbarBrand href="/"><FaBloggerB /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink className='nav-link' to="/">Főoldal</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="posts" className="nav-link">
                                Posts
                            </NavLink>

                        </NavItem>



                        {user && //szerda add new post
                            <NavItem>
                                <NavLink to="create" className="nav-link">
                                    New post
                                </NavLink>
                            </NavItem>
                        }



                    </Nav>

                    <Nav navbar >
                        {/* authorization menu */}
                        {
                            !user ?
                                <>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/auth/in">Log in</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink className="nav-link" to="/auth/up">Sign up</NavLink>
                                    </NavItem>
                                </>
                                :
                                <>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/" onClick={() => logOutUser()}>Log out</NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>

                                            {avatar ? <img src={avatar} style={{objectFit:'cover'}} className='myavatar' /> : <RxAvatar title={user.displayName} />}
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <NavLink className="nav-link" to="/profile">

                                                <DropdownItem>Profile setting</DropdownItem>
                                            </NavLink>

                                            <DropdownItem divider />
                                            <NavLink className="nav-link" to="/deleteAccount">
                                                <DropdownItem>Delete profile</DropdownItem>
                                            </NavLink>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                        }

                    </Nav>
                </Collapse>
            </Navbar>
            <Outlet />
        </div>
    )
}

