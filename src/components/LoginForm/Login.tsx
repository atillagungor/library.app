import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        rememberMe: false,
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = (values: typeof initialValues) => {
        console.log(values);
        onLogin();
        navigate('/');
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
                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                            />
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
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;