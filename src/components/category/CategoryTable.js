import React, { useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addOrUpdateCategoryAction, deleteCategoryAction } from '../../redux/category/categoryAction';

function CategoryTable() {
    const dispatch = useDispatch();
    const { categoryList } = useSelector(state => state.category)
    const [catToUpdate, setCatToUpdate] = useState({})
    const handleEdit = (cat) => {
        console.log("category to edit", cat)
        setCatToUpdate(cat)
    }

    const handleOnUpdate = () => {
        // Send the updated value: catToUpdate, to firebase
        dispatch(addOrUpdateCategoryAction(catToUpdate))
        setCatToUpdate({})
    }

    const handleOnChange = (e) => {
        let { name, value, checked } = e.target;
        if (name === "status") {
            value = checked ? "active" : "inactive"
        }
        setCatToUpdate({
            ...catToUpdate,
            [name]: value
        })
    }

    const handleOnDelete = () => {
        // catToUpdate - TO Delete
        dispatch(deleteCategoryAction(catToUpdate.slug))
    }

    return (
        <div className='m-1'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList.map((cat, i) => {
                        return (
                            <tr>
                                <td>{i + 1}</td>
                                <td>
                                    {cat.slug === catToUpdate?.slug ?
                                        <Form.Group >
                                            <Form.Check
                                                onChange={handleOnChange}
                                                type='switch'
                                                label={catToUpdate?.status}
                                                name="status"
                                                checked={catToUpdate?.status === "active" ? true : false}

                                            />
                                        </Form.Group>
                                        : <span className={`${cat.status}-status`}>{cat.status}</span>}
                                </td>

                                <td>{cat.slug === catToUpdate?.slug ?
                                    <Form.Group>
                                        <Form.Control
                                            onChange={handleOnChange}
                                            placeholder='Name'
                                            required
                                            name="name"
                                            type="text"
                                            value={catToUpdate.name}
                                        />
                                    </Form.Group>
                                    : cat.name}</td>
                                <td>{cat.slug}</td>
                                <td>
                                    {cat.slug === catToUpdate?.slug ?
                                        <>
                                            <Button onClick={handleOnUpdate} variant='success'>Update</Button>
                                            <Button onClick={handleOnDelete} variant='danger'>Delete</Button>
                                        </> :
                                        <Button onClick={() => handleEdit(cat)} variant='warning'>Edit</Button>
                                    }
                                </td>

                            </tr>

                        )
                    })}
                </tbody>
            </Table>


        </div >
    )
}

export default CategoryTable