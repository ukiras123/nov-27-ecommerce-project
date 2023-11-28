import React, { useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import NewCategory from '../../components/category/NewCategory'
import CategoryTable from '../../components/category/CategoryTable'
import { useDispatch } from 'react-redux'
import { getAllCategoriesAction } from '../../redux/category/categoryAction'

function Category() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategoriesAction())
    }, [dispatch])
    return (
        <AdminLayout title="Category">
            {/* New Category */}
            <NewCategory />
            {/* Category Table */}
            <CategoryTable />
        </AdminLayout>
    )
}

export default Category