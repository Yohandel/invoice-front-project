import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import 'react-pro-sidebar/dist/css/styles.css';
import './sidebar.css';


export const Sidebar = () => {
    return (
        <ProSidebar className='sidebar'>
            <Menu iconShape="square">
                <MenuItem>  Dashboard</MenuItem>
                <SubMenu title="Components">
                    <MenuItem>Component 1 <FontAwesomeIcon icon={faCoffee} /></MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}
