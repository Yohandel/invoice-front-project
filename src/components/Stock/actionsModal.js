import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

export const ActionsModal = (props) => {

    const handleClose = () => props.close(false)
    const [products, setProducts] = useState([])
    const [productId, setProductiD] = useState('')
    const [quantity, setQuantity] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then((result) => {
                setProducts(result.data)
                setProductiD(props.selectedStock?.product._id)
                setQuantity(props.selectedStock?.quantity)
            }).catch((err) => {

            });

        return () => {
            setProducts([])
        }
    }, [])

    const addStock = () => {
        const stock = {
            quantity: quantity,
            product: productId
        }
        axios.put(`http://localhost:3001/updateStock/${props.selectedStock?._id}`, stock)
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
                    <Modal.Title>{props.type === 1 ? 'Ver' : 'Editar'} stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Producto</Form.Label>
                            <Form.Select disabled={props.type === 1} aria-label="Default select example" onChange={(e) => setProductiD(e.target.value)}>
                                <option value={props.selectedStock?.product._id} defaultValue>{products.find((product) => product._id === props.selectedStock?.product._id)?.description}</option>
                                {products.filter((product) => product._id !== props.selectedStock?.product._id).map((product, index) => {
                                    return (
                                        <>
                                            <option value={product?._id}>{product?.description}</option>
                                        </>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control defaultValue={props.selectedStock?.quantity} disabled={props.type === 1} 
                            type="number" placeholder="Cantidad" onChange={(e) => setQuantity(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    {props.type === 1 ? null :
                        <Button variant="success" className='success' onClick={() => addStock()}>
                            Actualizar
                        </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}
