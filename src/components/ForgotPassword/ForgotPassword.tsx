import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService'; // Servisi import et
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState<string | null>(null);

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const response = await AuthService.changePassword({
                mail: values.email,
                password: values.password
            });

            if (response.status === 200) {
                setMessage('Password has been reset successfully.');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                throw new Error('Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Reset Password</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
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
                        <label htmlFor="password">New Password:</label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your new password"
                        />
                        <ErrorMessage name="password" component="div" className="error-message" />
                    </div>
                    {message && <p className="message">{message}</p>}
                    <div className="actions">
                        <button type="submit">Reset Password</button>
                        <button type="button" onClick={() => navigate('/login')}>Back to Login</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default ForgotPassword;