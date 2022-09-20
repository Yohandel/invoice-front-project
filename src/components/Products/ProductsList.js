import React, { useState, useEffect } from 'react'
import { Card, Button, Table } from 'react-bootstrap'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencil, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons'
import { AddModal } from './addModal';
import { ActionsModal } from './actionsModal';
import { SweetAlert } from "../Shared/Alerts/SweetAlert";
import {useSelector, useDispatch} from 'react-redux'
import {toList } from "../../features/product/productSlice";

export const ProductsList = () => {


    const list = useSelector((state)=> state.products.list)
    const dispatch = useDispatch()

    const sweetAlert = new SweetAlert()
    const [addModalShow, setAddShow] = useState(false)
    const [actionModalShow, setActionShow] = useState(false)
    const [actionType, setActionType] = useState(false)
    const [selectedproduct, setSelectedProduct] = useState(null)

    const getProducts = () => {
        axios.get("http://localhost:3001/products")
            .then((result) => {
                dispatch(toList(result.data))
            }).catch((err) => {
                sweetAlert.Default('Error', 'Error cargando la lista de productos', 'error')
            });
        }
        
        
        useEffect(() => {
            getProducts()
        return () => {
            dispatch(toList([]))
        }
    }, [])

    const handleAddShowToggle = (opened) => {
        setAddShow(opened)

        // if (!opened) {
        //     getProducts()
        // }
    }

    const handleActionShowToggle = (opened, type, product) => {
        setActionShow(opened)
        setActionType(type)
        setSelectedProduct(product)

        if (!opened) {
            getProducts()
        }
    }

    const deleteProduct = (productId) => {
        sweetAlert.AlertConfirm('Eliminar', '¿Quieres eliminar este registro?', 'question').then((result) => {
            if (result) {
                axios.delete(`http://localhost:3001/products/${productId}`)
                .then(res => {
                  sweetAlert.Default('Exito', 'Se ha elminiado el registro satisfactoriamente', 'success')
                  dispatch(toList(list))
                })
                .catch(err => {
                    sweetAlert.Default('Error', 'No se ha podido eliminar el registro', 'error')
                })
            }
            else{
                console.log("No");
            }
        }).catch((err) => {

        });
    }



    return (
        <>
            <Card className='mt-5'>
                <Card.Header className='cardHeader'>
                    <Card.Title>Productos</Card.Title>
                    <Button variant='success' className='success' onClick={() => handleAddShowToggle(true)}>Agregar <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></Button>
                </Card.Header>
                <Card.Body style={{ margin: '0px', padding: '0px' }}>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Secuencia</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Código de producto</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {list.map((product, index) => {
                                return (
                                    <tr key={product?._id}>
                                        <td>{product?._id}</td>
                                        <td>{product?.description}</td>
                                        <td>{product?.price}</td>
                                        <td>{product?.productCode}</td>
                                        <td>{product?.status ? "Activo" : "Inactivo"}</td>
                                        <td className="d-flex justify-content-center" >
                                            <Button onClick={() => handleActionShowToggle(true, 1, product)} style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-info">
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                            <Button onClick={() => handleActionShowToggle(true, 2, product)} style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-warning">
                                                <FontAwesomeIcon icon={faPencil} />
                                            </Button>
                                            <Button onClick={() => deleteProduct(product?._id)} style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-danger">
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
            <AddModal opened={addModalShow} close={handleAddShowToggle} />
            <ActionsModal opened={actionModalShow} close={handleActionShowToggle} type={actionType} selectedProduct={selectedproduct}/>
        </>
    )
}
