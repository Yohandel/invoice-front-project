import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Table } from 'react-bootstrap'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const ProductsList = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then((result) => {
                setProducts(result.data)
                console.log(products);
            }).catch((err) => {

            });
        console.log("Load");

        return () => {
            setProducts([])
        }
    }, [])



    return (
        <>
            <Card className='mt-5' style={{ border: "none" }}>
                <Card.Header style={{ padding: '0px', margin: '0px' }}>
                    <Card.Title>Productos</Card.Title>
                </Card.Header>
                <Card.Body style={{ margin: '0px', padding: '0px' }}>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Secuencia</th>
                                <th>Descripción</th>
                                <th>Código de producto</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>

                            {products.map((product, index) => {
                                return (
                                    <tr >
                                        <td key={product?._id}>{index}</td>
                                        <td key={product?._id}>{product?.description}</td>
                                        <td key={product?._id}>{product?.productCode}</td>
                                        <td key={product?._id}>{product?.status ? "Activo" : "Inactivo"}</td>
                                        <td className="d-flex justify-content-center" >
                                            <Button style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-info">
                                                <FontAwesomeIcon icon={faEye} />
                                            </Button>
                                            <Button style={{ marginRight: '1px', border: 'none' }} size={'sm'} variant="outline-warning">
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
        </>
    )
}
