import React, { useEffect, useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CustomInput from '../../components/customInput/CustomInput';
import { useDispatch } from 'react-redux';
import { createAdminUser } from '../../redux/auth/userAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const inputFields = [
    {
        label: "First Name *",
        name: "fName",
        type: "text",
        placeholder: "Sam",
        required: true
    },
    {
        label: "Last Name *",
        name: "lName",
        type: "text",
        placeholder: "Smith",
        required: true
    },
    {
        label: "Phone",
        name: "phone",
        type: "number",
        placeholder: "302xxxxx",
    },
    {
        label: "Email *",
        name: "email",
        type: "email",
        placeholder: "xyz@zyx.com",
        required: true
    },
    {
        label: "Password *",
        name: "password",
        type: "password",
        placeholder: "******",
        required: true,
        minLength: 6
    },
    {
        label: "Confirm Password *",
        name: "confirmPassword",
        type: "password",
        placeholder: "******",
        required: true,
        minLength: 6
    }
]
function Register() {

    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleOnSubmit = (e) => {
        // stop page from refreshing, which is a default behavior
        e.preventDefault();
        const { password, confirmPassword } = formData;
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Pass did not match")
            return;
        }
        // Create a admin user in firebase
        // Auth and DB
        dispatch(createAdminUser(formData, navigate))
    }

    return (<div>
        <Header />
        <div className='main'>
            <div>
                <Form onSubmit={handleOnSubmit} className='login-form mt-3 mb-3 border p-5 shadow-lg '>

                    {inputFields.map((input) => {
                        return <CustomInput {...input} key={input.label} onChange={handleOnChange} />
                        // return <CustomInput label="First Name *" name="fName" ... />
                    })}


                    <Button variant="primary" type="submit">
                        Register Admin
                    </Button>
                </Form>
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default Register