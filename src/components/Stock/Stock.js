import React from 'react'
import { Card, Button, Table } from 'react-bootstrap'

export const Stock = () => {
  return (
    <>
    <Card className='mt-5' style={{width:'100%'}}>
                <Card.Body>
                    <Card.Title>Stock</Card.Title>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Secuencia</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card.Body>
            </Card>
    </>
  )
}
