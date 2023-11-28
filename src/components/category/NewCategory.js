import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import slugify from 'slugify';
import { addOrUpdateCategoryAction } from '../../redux/category/categoryAction';

function NewCategory() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        status: "inactive"
    })

    const handleOnChange = (e) => {
        let { name, value, checked } = e.target;
        if (name === "status") {
            value = checked ? "active" : "inactive"
        }
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        // Time to send it to firebase
        // status, name, slug
        const slug = slugify(formData.name, {
            lower: true,
            trim: true
        })
        const categoryObj = {
            ...formData,
            slug
        }
        // dispatch to action
        dispatch(addOrUpdateCategoryAction(categoryObj))
        setFormData({
            status: "inactive"
        })
    }
    return (
        <Form onSubmit={handleOnSubmit} className='border pt-3 pb-3 ps-1 pe-2 ms-1 me-1 shadow-lg rounded-1'>
            <Row>
                <Col md="2">
                    <Form.Group >
                        <Form.Check
                            type='switch'
                            label="Status"
                            name="status"
                            onChange={handleOnChange}
                            checked={formData?.status === "active" ? true : false}
                        />
                    </Form.Group>
                </Col>
                <Col md="6">
                    <Form.Group>
                        <Form.Control
                            placeholder='Name'
                            required
                            name="name"
                            type="text"
                            onChange={handleOnChange}
                            value={formData?.name || ""}
                        />
                    </Form.Group>
                </Col>
                <Col md="3">
                    <Button type='submit'>Add  Category</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default NewCategory