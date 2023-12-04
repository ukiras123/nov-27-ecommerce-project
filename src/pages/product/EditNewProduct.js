import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productInputFields } from '../../utils/const';
import CustomInput from '../../components/customInput/CustomInput';
import { addOrUpdateProductAction } from '../../redux/product/productAction';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { MdDelete } from "react-icons/md";


function EditNewProduct() {
    const { slug } = useParams();

    const [formData, setFormData] = useState({ status: "inactive" });
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [progress, setProgress] = useState(0)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryList } = useSelector(state => state.category)
    const { productList } = useSelector(state => state.product)

    useEffect(() => {
        const selectedProduct = productList.find(product => product.slug === slug)
        if (selectedProduct) {
            setFormData(selectedProduct)
        } else {
            navigate("/product")
        }
    }, [productList])

    const setThumbnail = (image) => {
        console.log(formData)
        setFormData({
            ...formData,
            thumbnail: image
        })
    }

    const removeImage = (image) => {
        const images = formData?.images.filter(img => img !== image);
        setFormData({
            ...formData,
            images
        })
    }
    const handleOnChange = (e) => {
        let { name, value, checked } = e.target;
        console.log(name, value, checked)
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
        e.preventDefault();
        console.log("I am updating product", formData)
        // Upload new files, get URLS then add that on formData
        const promises = uploadedFiles.map(file => handleFileUpload(file))
        const urls = await Promise.all(promises);
        console.log(urls)

        const productObj = {
            ...formData,
            images: [...formData?.images, ...urls]
        }
        dispatch(addOrUpdateProductAction(productObj))
    }


    const inputFields = [
        {
            label: "Product Name *",
            name: "title",
            type: "text",
            placeholder: "iPhone 6",
            required: true,
            value: formData?.title
        },
        {
            label: "Slug",
            name: "slug",
            type: "text",
            required: true,
            value: formData?.slug,
            disabled: true
        },
        {
            label: "SKU *",
            name: "sku",
            type: "text",
            placeholder: "IP_IDNI_5",
            required: true,
            value: formData?.sku,
            disabled: true
        }, {
            label: "Price *",
            name: "price",
            type: "number",
            placeholder: "1999",
            required: true,
            value: formData?.price

        },
        {
            label: "Quantity *",
            name: "quantity",
            type: "number",
            placeholder: "10",
            required: true,
            value: formData?.quantity

        }, {
            label: "Sales Price",
            name: "salesPrice",
            type: "number",
            placeholder: "1599",
            value: formData?.salesPrice

        }, {
            label: "Sales Start At",
            name: "salesStartAt",
            type: "date",
            value: formData?.salesStartAt

        }, {
            label: "Sales End At",
            name: "salesEndAt",
            type: "date",
            value: formData?.salesEndAt

        }, {
            label: "Product Description *",
            name: "description",
            type: "text",
            as: "textarea",
            row: 5,
            required: true,
            placeholder: "Product Desc...",
            value: formData?.description

        },
    ]

    return (
        <AdminLayout title={"Edit Product"}>
            <Link to='/product'>
                <Button variant='dark'> &lt; Go Back</Button>
            </Link>
            <Form onSubmit={handleOnSubmit} className='border p-3 mt-3 shadow rounded'>
                <Form.Group >
                    <Form.Check
                        type='switch'
                        label="Status"
                        name="status"
                        checked={formData?.status === "active"}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                {/* Category Dropdown */}
                <Form.Group className='mb-2 mt-1'>
                    <Form.Label>Select Category *</Form.Label>
                    <Form.Select name="parentCategory" required onChange={handleOnChange}>
                        <option>Open this select menu</option>
                        {categoryList.map(cat => {
                            return <option key={cat.slug} value={cat.slug} selected={cat.slug === formData?.parentCategory}>{cat.name}</option>
                        })}

                    </Form.Select>
                </Form.Group>
                {inputFields.map((input) => {
                    return <CustomInput key={input.label} {...input} onChange={handleOnChange} />
                })}
                {/* Let'd display the images */}
                <div className='d-flex gap-2 p-1 border rounded'>
                    {formData?.images?.map((image, index) => {
                        return <div className='d-flex flex-column justify-content-end'>
                            {/* <div>
                                <input type="radio" id={`${index}-thumbnail`} name="thumbnail" value={image} checked={image === formData.thumbnail} onChange={handleOnChange} />
                                <label htmlFor={`${index}-thumbnail`}>Thubnail</label>
                                <img htmlFor={`${index}-thumbnail`} src={image} alt="" width={"100px"} />
                            </div> */}
                            <div onClick={() => setThumbnail(image)} className={image === formData?.thumbnail ? "bg-info" : ""}>
                                <div className='pb-2'>
                                    <img src={image} alt="" width={"100px"} />
                                </div>

                            </div>
                            <MdDelete style={{
                                color: "red"
                            }}
                                onClick={() => removeImage(image)}
                            />
                        </div>
                    })}
                </div>
                {/* Image Upload field */}
                <Form.Group >
                    <Form.Control onChange={handleOnImageAttached} accept="image/png, image/jpeg" type="file" name="images" multiple />
                    <ProgressBar animated now={progress} />

                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </AdminLayout >
    )
}

export default EditNewProduct