import React, { useState, useEffect, useContext } from 'react';

import "./../custom.scss"
import axios from 'axios';
import "./../App.css";
import { useNavigate } from 'react-router-dom';
import { MDBSpinner, MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { NameContext } from './Mainpage';



const Login = () => {
    const { setName } = useContext(NameContext);
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dataBase, setDataBase] = useState([]);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        return await axios
            .get(`http://localhost:5000/users`)
            .then((response) => {
                setDataBase(response.data);
            })
            .catch((error) => console.log("Error", error))
    }

    const handleSubmit = async (event) => {
        setIsSubmitting(true);
        event.preventDefault();
        var { uname, pass } = document.forms[0];
        const userData = dataBase.find((user) => user.email === uname.value);
        if (userData) {
            if (userData.password !== pass.value) {
                setTimeout(() => {
                    setErrorMessages({ name: "pass", message: 'Incorrect Password' });
                    setIsSubmitting(false);
                    openToast('error');
                }, 1500);
            } else {
                openToast('success')
                setTimeout(() => {
                    setName(userData.name);
                    setIsSubmitting(false);
                    navigate('/listing')
                }, 1500);
            }
        } else {
            setTimeout(() => {
                setErrorMessages({ name: "uname", message: 'Email does not exit' });
                setIsSubmitting(false);
                openToast('error');
            }, 1500);
        }
    }

    const renderErrorMessage = (name) => {
        return name === errorMessages.name &&
            <div className='error'>{errorMessages.message}</div>
    }

    const validateEmail = () => {
        var { uname } = document.forms[0];
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(uname.value)) {
            setErrorMessages({ name: "uname", message: 'Invalid email format' })
        } else {
            setErrorMessages({})
        }
    }

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <lable>Email </lable>
                    <input type="text" name="uname" id="uname" required onBlur={validateEmail} />
                    {renderErrorMessage('uname')}
                </div>
                <div className="input-container">
                    <lable>Password</lable>
                    <input type="password" name="pass" id="pass" required />
                    {renderErrorMessage('pass')}
                </div>
                {/* <div className="button-container">
                    <input type="submit" value="Submit" />
                </div> */}
                <MDBBtn>
                    {isSubmitting ? <MDBSpinner grow size='sm' role='status' tag='span' className='me-2' /> : 'Submit'}
                </MDBBtn>
            </form>
        </div>
    );

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
            toast.success('Login Successful!', toastData);
        } else {
            toast.error('Invalid credentials!', toastData);
        }
    };

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
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
        </div>
    )
}

export default Login
