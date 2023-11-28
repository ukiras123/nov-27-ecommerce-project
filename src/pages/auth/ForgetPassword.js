import React, { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { Button, Form } from 'react-bootstrap'
import CustomInput from '../../components/customInput/CustomInput'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginAdminUser, resetPassword } from '../../redux/auth/userAction'
const inputFields = [

    {
        label: "Email *",
        name: "email",
        type: "email",
        placeholder: "xyz@zyx.com",
        required: true
    },

]
function ForgetPassword() {

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
        // LoginAction Handler
        const { email } = formData;
        dispatch(resetPassword(email))
    }
    return (
        <div>
            {/* Header */}
            <Header />
            <div className='main'>
                <div>
                    <Form onSubmit={handleOnSubmit} className='login-form mt-3 mb-3 border p-5 shadow-lg '>

                        {inputFields.map((input) => {
                            return <CustomInput {...input} onChange={handleOnChange} />
                            // return <CustomInput label="First Name *" name="fName" ... />
                        })}


                        <Button variant="primary" type="submit">
                            Reset Password
                        </Button>


                    </Form>
                </div>



            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default ForgetPassword