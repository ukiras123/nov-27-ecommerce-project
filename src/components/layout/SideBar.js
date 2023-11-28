import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

function SideBar() {
    const { pathname } = useLocation()
    const sideLinks = [
        {
            label: "Dashboard",
            path: "/dashboard"
        },
        {
            label: "Category",
            path: "/category"
        },
        {
            label: "Product",
            path: "/product"
        },
        {
            label: "Payment Options",
            path: "/payment-options"
        },
        {
            label: "Orders",
            path: "/orders"
        },
        {
            label: "Customers",
            path: "/customers"
        },
        {
            label: "AdminSignup",
            path: "/register"
        },
        {
            label: "Profile",
            path: "/profile"
        },
    ]
    return (
        <div>
            <nav>
                <div className='mt-3 text-center'>Admin Account</div>
                <hr />
            </nav>
            <div>
                <ul className="list-unstyled side-links">
                    {sideLinks.map(link => {
                        const active = link.path === pathname ? 'active' : "";
                        return <li className={`mt-2 p-2 ms-2 ${active}`} key={link.path}>
                            <Link to={link.path} className='nav-link'>
                                {link.label}
                            </Link>

                        </li>
                    })}

                    {/* <li>
                        <Link to={"/category"}>
                            Category
                        </Link>

                    </li>
                    <li>Product</li>
                    <li>Payment Options</li>
                    <li>Customer</li>
                    <li>Orders</li>
                    <li>Profile</li> */}
                </ul>
            </div>
        </div >
    )
}

export default SideBar