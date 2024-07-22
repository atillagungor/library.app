import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
    });

    const handleSubmit = (values: typeof initialValues) => {
        console.log(values);
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <div className="input-group">
                            <label htmlFor="name">Name:</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                            />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <Field
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                            />
                            <ErrorMessage name="lastName" component="div" className="error-message" />
                        </div>
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
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                        </div>
                        <div className="actions">
                            <button type="submit">Register</button>
                            <button type="button" onClick={() => navigate('/login')}>Back to Login</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Register;