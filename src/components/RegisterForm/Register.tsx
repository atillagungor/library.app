import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css';
import AuthService from '../../services/AuthService'; // AuthService'ı import ettik
import { RegisterRequestModel } from '../../models/requests/Auth/RegisterRequestModel';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const initialValues: RegisterRequestModel = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Required'),
    });

    const handleSubmit = (values: typeof initialValues) => {
        const registerRequest: RegisterRequestModel = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        };

        AuthService.register(registerRequest)
            .then(response => {
                // Başarılı işlem sonrası login sayfasına yönlendir
                console.log('Registration successful:', response.data);
                navigate('/login');
            })
            .catch(error => {
                console.error('There was an error registering!', error);
                // Hata durumunda kullanıcıyı bilgilendir
            });
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
                            <label htmlFor="firstName">First Name:</label>
                            <Field
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                            />
                            <ErrorMessage name="firstName" component="div" className="error-message" />
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
