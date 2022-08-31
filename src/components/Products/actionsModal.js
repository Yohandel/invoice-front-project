import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

export const ActionsModal = (props) => {
    const handleClose = () => props.close(false)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)
    const [productCode, setProductCode] = useState(null)

    useEffect(() => {

        setDescription(props.selectedProduct?.description)
        setPrice(props.selectedProduct?.price)
        setProductCode(props.selectedProduct?.productCode)
    }, [])


    const updateProduct = () => {
        const product = {
            description: description,
            price: price,
            productCode: productCode
        }
        axios.put(`http://localhost:3001/products/${props.selectedProduct?._id}`, product)
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
                            <Form.Control defaultValue={props.selectedProduct?.description} disabled={props.type === 1} type="text" placeholder="Descripción" onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control defaultValue={props.selectedProduct?.price} disabled={props.type === 1} type="number" placeholder="Precio" onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Código de Producto</Form.Label>
                            <Form.Control defaultValue={props.selectedProduct?.productCode} disabled={props.type === 1} type="text" placeholder="Código de Producto" onChange={(e) => setProductCode(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    {props.type === 1 ? null :
                        <Button variant="success" className='success' onClick={() => updateProduct()}>
                            Editar
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}
