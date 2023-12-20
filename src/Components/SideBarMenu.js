import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import './../custom.scss'
import { Link } from 'react-router-dom'

import { NameContext } from './Mainpage';
import "./../style/sidebar.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideBarMenu = () => {
    const { name, setName } = useContext(NameContext);

    const logout = () => {
        setName("");
        openToast('success');
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
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky"></div>
                <Nav.Item className="mt-10">
                    <Link to='/'>
                        <span>Main</span>
                    </Link>
                </Nav.Item>
                {!name && <Nav.Item>
                    <Link to='/login'>
                        <span >Login</span>
                    </Link>
                </Nav.Item>}
                {!name && <Nav.Item>
                    <Link to='/signUp'>
                        <span >Sign Up</span>
                    </Link>
                </Nav.Item>}
                {name && <Nav.Item>
                    <Link to='/listing'>
                        <span>Listing</span>
                    </Link>
                </Nav.Item>}
                {name && <Nav.Item>
                    <Link to='/bar-graph'>
                        <span>Bar Graph</span>
                    </Link>
                </Nav.Item>}
                {name && <Nav.Item>
                    <Link to='/line-graph'>
                        <span>Line Graph</span>
                    </Link>
                </Nav.Item>}
                {name && <Nav.Item>
                    <Link to='/area-graph'>
                        <span>Area Graph</span>
                    </Link>
                </Nav.Item>}
                {name && <Nav.Item>
                    <Link to='/'>
                        <span onClick={logout}>Log Out</span>
                    </Link>
                </Nav.Item>}
            </Nav>
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
    );
};

export default SideBarMenu