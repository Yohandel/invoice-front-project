import React from 'react'
import { ProSidebar, Menu, MenuItem, SidebarHeader, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faCubes, faChartLine } from '@fortawesome/free-solid-svg-icons'
import 'react-pro-sidebar/dist/css/styles.css';
import './sidebar.css';
import { Link } from 'react-router-dom'


export const Sidebar = () => {
    return (
        <ProSidebar className='sidebar'>
            <SidebarHeader className='sidebarHeader'><Link to={"/"}> Logo</Link></SidebarHeader>
            <Menu iconShape="square">
                <MenuItem> <Link to={"/"}> Dashboard <FontAwesomeIcon icon={faChartLine} /></Link> </MenuItem>
                <MenuItem> <Link to={"/products"}> Productos <FontAwesomeIcon icon={faClipboard} /></Link> </MenuItem>
                <MenuItem icon={<FontAwesomeIcon icon={faCubes} />}><Link to={"/stock"}> Stock </Link></MenuItem>
                <SubMenu title="Compras" icon={<FontAwesomeIcon icon={faCubes} />}>
                    <MenuItem>Registar compra</MenuItem>
                    <MenuItem>Cuentas por Cobrar</MenuItem>
                    <MenuItem>Registrar Proveedor</MenuItem>
                </SubMenu> 
            </Menu>
        </ProSidebar>
    )
}
