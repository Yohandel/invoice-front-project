import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

export const AddModal = (props) => {

    const handleClose = () => props.close(false)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)
    const [productCode, setProductCode] = useState(null)

    const createProduct = () => {

        const product = {
            description: description,
            price: price,
            productCode: productCode,
        }

        axios.post('http://localhost:3001/products', product)
            .then((result) => {
                console.log(result);
                handleClose()
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <Modal show={props.opened} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Producto</Form.Label>
                            <Form.Control type="text" placeholder="Descripción" onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" placeholder="Precio" onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Código de Producto</Form.Label>
                            <Form.Control type="text" placeholder="Código de Producto" onChange={(e) => setProductCode(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" className='success' onClick={() => createProduct()}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}
