import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
    });

    const handleSubmit = (values: typeof initialValues) => {
        console.log(values);
        // E-posta gönderme işlemi burada yapılacak (API çağrısı vs.)
        setMessage('Password reset link has been sent to your email.');

        // Şifre sıfırlama işlemi sonrası yönlendirme
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    };

    const [message, setMessage] = React.useState('');

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
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
                    {message && <p className="message">{message}</p>}
                    <div className="actions">
                        <button type="submit">Send Reset Link</button>
                        <button type="button" onClick={() => navigate('/login')}>Back to Login</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default ForgotPassword;