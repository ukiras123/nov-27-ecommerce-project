import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    const userInfo = useSelector(state => state.userInfo.user)
    return (
        userInfo?.uid ? children : <Navigate to="/login" />
    )
}

export default PrivateRoute