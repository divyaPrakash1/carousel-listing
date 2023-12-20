import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./../custom.scss"
import { NameContext } from './Mainpage';

const Navbar = (props) => {
    const { name, setName } = useContext(NameContext);
    const logout = () => {
        setName("");
        openToast('success')
    }

    const openToast = (status) => {
        const toastData = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
        if (status === 'success') {
            toast.success('Logged out Successfully!', toastData);
        } else {
            toast.error('Invalid credentials!', toastData);
        }
    };
    return (
        <>
            <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
                <MDBContainer fluid>
                    <MDBNavbarBrand>Application</MDBNavbarBrand>
                    <MDBCollapse navbar>
                        <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                            {!name && <MDBNavbarItem className='active'>
                                <Link to='/login'>
                                    <MDBNavbarLink>Login</MDBNavbarLink>
                                </Link>
                            </MDBNavbarItem>}
                            {!name && <MDBNavbarItem>
                                <Link to='/signUp'>
                                    <MDBNavbarLink>Sign Up</MDBNavbarLink>
                                </Link>
                            </MDBNavbarItem>}
                            {name && <MDBNavbarItem>
                                <Link to='/listing'>
                                    <MDBNavbarLink>Listing</MDBNavbarLink>
                                </Link>
                            </MDBNavbarItem>}
                            {name && <MDBNavbarItem>
                                <Link to='/bar-graph'>
                                    <MDBNavbarLink>BarGraph</MDBNavbarLink>
                                </Link>
                            </MDBNavbarItem>}
                            {name && <MDBNavbarItem>
                                <Link to='/line-graph'>
                                    <MDBNavbarLink>Line Graph</MDBNavbarLink>
                                </Link>
                            </MDBNavbarItem>}
                            {name && <MDBNavbarItem>
                                <Link to='/area-graph'>
                                    <MDBNavbarLink>Area Graph</MDBNavbarLink>
                                </Link>
                            </MDBNavbarItem>}
                            {name && <MDBNavbarItem style={{ float: "right" }}>
                                <MDBNavbarLink>{`Hi ${name}`}</MDBNavbarLink>
                            </MDBNavbarItem>}
                            {name && <MDBNavbarItem style={{ float: "right" }}>
                                <Link to='/'>
                                    <MDBNavbarLink onClick={logout}>Logout</MDBNavbarLink>
                                </Link>
                            </MDBNavbarItem>}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Navbar
