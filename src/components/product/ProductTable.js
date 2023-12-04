import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAction } from '../../redux/product/productAction';
import { Link } from 'react-router-dom';

function ProductTable() {
    const dispatch = useDispatch();
    const { productList } = useSelector(state => state.product)
    const [displayList, setDisplayList] = useState([]);

    useEffect(() => {
        setDisplayList(productList)
    }, [productList])

    const handleSearch = (e) => {
        const { value } = e.target;
        const filteredList = productList.filter(({ title }) =>
            title.toLowerCase().includes(value.toLowerCase())
        )
        setDisplayList(filteredList)
    }
    return (
        <>
            <div className='w-50 m-1'>
                <Form.Control onChange={handleSearch} type="text" placeholder='Search by title'></Form.Control>
            </div>
            <div className='m-1'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Thumbnail</th>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayList.map((product, i) => {
                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td><img src={product.thumbnail} alt="img" width={"80px"}></img></td>
                                    <td>
                                        <span className={`${product.status}-status`}>{product.status}</span>
                                    </td>

                                    <td>{product.title}</td>
                                    <td>{product.slug}</td>
                                    <td>AUD {product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <Link to={`/product/edit/${product.slug}`}>
                                            <Button variant='warning'>Edit</Button>
                                        </Link>
                                        <Button variant='danger' onClick={() => {
                                            if (window.confirm("Do you want to delete?")) {
                                                dispatch(deleteProductAction(product.slug))
                                            }
                                        }
                                        }>Delete</Button>
                                    </td>

                                </tr>

                            )
                        })}
                    </tbody>
                </Table>


            </div ></>
    )
}

export default ProductTable