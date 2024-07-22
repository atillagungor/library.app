import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService';
import TokenService from '../../core/services/tokenService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Göz ikonlarını import ettik
import './Login.css';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // Şifre görünürlük durumunu ekledik

    useEffect(() => {
        if (TokenService.hasToken()) {
            navigate('/');
        }
    }, [navigate]);

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const loginRequest = {
                email: values.email,
                password: values.password,
            };

            const response = await AuthService.login(loginRequest);

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                // Token'ı saklama
                if (values.rememberMe) {
                    // "Remember me" işaretlenmişse token'ı sessionStorage'a kaydet
                    sessionStorage.setItem('token', response.data.token);
                } else {
                    // "Remember me" işaretlenmemişse token'ı localStorage'a kaydet
                    localStorage.setItem('token', response.data.token);
                }
                onLogin();
                navigate('/');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please check your email and password.');
            toast.error('Login failed. Please check your email and password.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Library App</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, setFieldValue }) => (
                    <Form>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="input-group password-group">
                            <label htmlFor="password">Password:</label>
                            <div className="password-field">
                                <Field
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        <div className="input-group remember-me">
                            <Field
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                checked={values.rememberMe}
                                onChange={() => setFieldValue('rememberMe', !values.rememberMe)}
                            />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <div className="actions">
                            <button type="submit">Login</button>
                            <button type="button" onClick={() => navigate('/register')}>Register</button>
                        </div>
                        <div className="forgot-password">
                            <a href="#" onClick={() => navigate('/forgot-password')}>Forgot Password?</a>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;