import React, { useState, useEffect } from 'react'
import { Card, Button, Table } from 'react-bootstrap'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEye, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './stock.css'
import { AddStockModal } from './addStockModal';
import { ActionsModal } from './actionsModal';
import { useSelector, useDispatch } from "react-redux";
import { toList } from "../../features/stock/stockSlice";

export const Stock = () => {

    const stockList = useSelector((state)=> state.stock.stockList)
    const dispatch = useDispatch()

    // const [stockList, setStock] = useState([])
    const [addModalShow, setAddShow] = useState(false)
    const [actionModalShow, setActionShow] = useState(false)
    const [actionType, setActionType] = useState(false)
    const [selectedStock, setSelectedStock] = useState(null)

    const getStockList = () => {
        axios.get('http://localhost:3001/inStock')
            .then((result) => {
                dispatch(toList(result.data))
            }).catch((err) => {

            });
    }

    useEffect(() => {

        getStockList()
        return () => {
            dispatch(toList([]))
        }
    }, [])

    const handleAddShowToggle = (opened) => {
        setAddShow(opened)

        // if (!opened) {
        //     getStockList()
        // }
    }

    const handleActionShowToggle = (opened, type, productId) => {
        setActionShow(opened)
        setActionType(type)
        setSelectedStock(productId)

        // if (!opened) {
        //     getStockList()
        // }
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
                                <th>Estado</th>
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
                                        <td>{stock?.status ? "Activo" : "Inactivo"}</td>
                                        <td className="d-flex justify-content-center" >
                                            <Button onClick={() => handleActionShowToggle(true, 1, stock)} style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-info">
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                            <Button onClick={() => handleActionShowToggle(true, 2, stock)} style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-warning">
                                                <FontAwesomeIcon icon={faPencil} />
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
            <ActionsModal opened={actionModalShow} close={handleActionShowToggle} type={actionType} selectedStock={selectedStock} />
        </>
    )
}
