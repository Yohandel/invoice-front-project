import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faClipboard, faCubes } from '@fortawesome/free-solid-svg-icons'
import 'react-pro-sidebar/dist/css/styles.css';
import './sidebar.css';
import { Link } from 'react-router-dom'


export const Sidebar = () => {
    return (
        <ProSidebar className='sidebar'>
            <SidebarHeader className='header'>Header</SidebarHeader>
            <Menu iconShape="square">
                <MenuItem> <Link to={"/"}> Dashboard <FontAwesomeIcon icon={faHome} /></Link> </MenuItem>
                <SubMenu title="Components">
                    <MenuItem> <Link to={"/products"}> Productos <FontAwesomeIcon icon={faClipboard} /></Link> </MenuItem>
                    <MenuItem><Link to={"/stock"}> Stock <FontAwesomeIcon icon={faCubes} /></Link></MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}
