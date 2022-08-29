import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";
export const AddStockModal = (props) => {

    const handleClose = () => props.close(false)
    const [products, setProducts] = useState([])
    const [productId, setProductiD] = useState('')
    const [quantity, setQuantity] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then((result) => {
                setProducts(result.data)
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
        axios.post('http://localhost:3001/addStock', stock)
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
                    <Modal.Title>Agregar al stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Producto</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setProductiD(e.target.value)}>
                                <option value={null} defaultValue>Seleccionar</option>
                                {products.map((product, index) => {
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
                            <Form.Control type="number" placeholder="Cantidad"  onChange={(e) => setQuantity(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" className='success' onClick={() => addStock()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
