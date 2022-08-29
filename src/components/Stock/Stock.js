import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Table } from 'react-bootstrap'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './stock.css'
import { AddStockModal } from './addStockModal';
import { ActionsModal } from './actionsModal';

export const Stock = () => {

    const [stockList, setStock] = useState([])
    const [addModalShow, setAddShow] = useState(false)
    const [actionModalShow, setActionShow] = useState(false)
    const [actionTitle, setActionTitle] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/inStock')
            .then((result) => {
                setStock(result.data)
            }).catch((err) => {

            });

        return () => {
            setStock([])
        }
    }, [])

    const handleAddShowToggle = (opened) => {
        setAddShow(opened)
    }

    const handleActionShowToggle = (opened, title) => {
        setActionShow(opened)
        setActionTitle(title)
    }

    return (
        <>
            <Card className='mt-5' >
                <Card.Header className='cardHeader'>
                    <Card.Title>Stock</Card.Title>
                    <Button variant='success' className='success' onClick={() => handleAddShowToggle(true)}>Agregar <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
                </Card.Header>
                <Card.Body style={{ margin: '0px', padding: '0px' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Secuencia</th>
                                <th>Producto</th>
                                <th>Cantidad disponible</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockList.map((stock, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{stock?._id}</td>
                                        <td>{stock?.product?.description}</td>
                                        <td>{stock?.quantity}</td>
                                        <td className="d-flex justify-content-center" >
                                            <Button onClick={()=> handleActionShowToggle(true, 'Ver')} style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-info">
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                            <Button onClick={()=> handleActionShowToggle(true, 'Editar')} style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-warning">
                                                <FontAwesomeIcon icon={faPencil} />
                                            </Button>
                                            <Button style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-danger">
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <AddStockModal opened={addModalShow} close={handleAddShowToggle} />
            <ActionsModal opened={actionModalShow} close={handleActionShowToggle} title={actionTitle}/>
        </>
    )
}
