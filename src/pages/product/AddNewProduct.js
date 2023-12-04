import React, { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Button, Form, ProgressBar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from '../../components/customInput/CustomInput'
import { useDispatch, useSelector } from 'react-redux'
import { addOrUpdateProductAction } from '../../redux/product/productAction'
import slugify from 'slugify'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { productInputFields } from '../../utils/const'


function AddNewProduct() {

    const [formData, setFormData] = useState({ status: "inactive" });
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [progress, setProgress] = useState(0)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryList } = useSelector(state => state.category)
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

    const handleOnImageAttached = (e) => {
        const { files } = e.target;
        console.log(typeof files)
        const fileArr = [...files];
        setUploadedFiles(fileArr)
    }

    const handleFileUpload = async (fileDetail) => {
        const uniqueName = `${Date.now()}-${fileDetail.name}`
        return new Promise((res, rej) => {
            const storage = getStorage();
            const storageRef = ref(storage, `product/img/${uniqueName}`);
            const uploadTask = uploadBytesResumable(storageRef, fileDetail)
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setProgress(progress)
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log("Error", error)
                    rej(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        res(downloadURL)
                    });
                }
            );
        })
    }


    const handleOnSubmit = async (e) => {
        // stop page from refreshing, which is a default behavior
        e.preventDefault();
        // TODO
        // dispatchEvent(creaetAction)

        // Upload the images to Storage
        const promises = uploadedFiles.map(file => handleFileUpload(file))
        const urls = await Promise.all(promises);
        console.log("urls", urls)
        // It will give you a URL
        // Add that URL to DB

        const slug = slugify(formData.title, {
            lower: true,
            trim: true
        })
        const productObj = {
            ...formData,
            slug,
            images: urls,
            thumbnail: urls[0]
        }
        await dispatch(addOrUpdateProductAction(productObj))
        navigate("/product")
    }

    return (
        <AdminLayout title={"Add New Product"}>
            <Link to='/product'>
                <Button variant='dark'> &lt; Go Back</Button>
            </Link>

            {/* Form To capture product info */}
            <Form onSubmit={handleOnSubmit} className='border p-3 mt-3 shadow rounded'>
                <Form.Group >
                    <Form.Check
                        type='switch'
                        label="Status"
                        name="status"
                        onChange={handleOnChange}
                    />
                </Form.Group>
                {/* Category Dropdown */}
                <Form.Group className='mb-2 mt-1'>
                    <Form.Label>Select Category *</Form.Label>
                    <Form.Select name="parentCategory" required onChange={handleOnChange}>
                        <option>Open this select menu</option>
                        {categoryList.map(cat => {
                            return <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                        })}

                    </Form.Select>
                </Form.Group>
                {productInputFields.map((input) => {
                    return <CustomInput key={input.label} {...input} onChange={handleOnChange} />
                })}

                {/* Image Upload field */}
                <Form.Group >
                    <Form.Control required onChange={handleOnImageAttached} accept="image/png, image/jpeg" type="file" name="images" multiple />
                    <ProgressBar animated now={progress} />

                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </AdminLayout>
    )
}

export default AddNewProduct