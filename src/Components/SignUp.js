
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        status: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validation for Name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        // Validation for Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
            isValid = false;
        }

        // Validation for Phone
        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Enter a valid 10-digit phone number';
            isValid = false;
        }

        // Validation for Address
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        // Validation for Status
        if (!formData.status.trim()) {
            newErrors.status = 'Status is required';
            isValid = false;
        }

        // Validation for Password
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            loadAllData();
            console.log('Form data submitted:', formData);
            navigate('/listing')
        } else {
            console.log('Form has errors. Please fix them.');
        }
    };

    const loadAllData = async () => {
        return await axios
            .post(`http://localhost:5000/users`, formData)
            .then((response) => {
                navigate('/listing')
            })
            .catch((error) => console.log("Error", error))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="form-group">
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
                {errors.address && <span className="error">{errors.address}</span>}
            </div>

            <div className="form-group">
                <label>Status:</label>
                <input type="text" name="status" value={formData.status} onChange={handleChange} />
                {errors.status && <span className="error">{errors.status}</span>}
            </div>

            <div className="form-group">
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;


