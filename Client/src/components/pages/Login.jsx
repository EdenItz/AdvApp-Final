import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Login as LoginIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';

import Navbar from '../Navbar';
import Footer from '../Footer';
import { logIn as logInApi, resetPasswordWithEmail, register as registerApi } from '../../services/userService';
import '../../css/login.scss';

function Register({ register = false }) {
    const [loading, setLoading] = useState(false);
    const [passResetLoading, setPassResetLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');

    const navigate = useNavigate();

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        setPassResetLoading(true)

        const res = await resetPasswordWithEmail(email, password);

        if (!res) {
            Swal.fire(`Oops...`, `Please try again`, 'error')
        }
        else if (res.error) {
            Swal.fire(`Oops...`, `${res.error}`, 'error')
        }
        else if (res.status == 200) {
            Swal.fire(`Great`, `The password Reset email eas sent to ${email}`, 'success')
        }

        setPassResetLoading(false)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (register && (password !== passwordVerify)) {
            Swal.fire(`Oh Oh, the passwords don't match`, `the passwords need to be identical`, 'error')
            return setLoading(false);
        }

        const res = register ? await registerApi(email, password, name) : await logInApi(email, password);
        
        if (!res) {
            return setLoading(false);
        }
        if (res.fireBaseError) {
            Swal.fire(`Oops...`, `${res.fireBaseError}`, 'error')
        } else {
            setLoading(false);
            navigate("/");
        }
    };

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit} className="login center">
                <h1 className='title'>{register ? 'Welcome' : 'Good to see you again'}</h1>
                <h2>{register ? 'sign up to E-shops' : 'log back into E-shops'}</h2>
                {register && <TextField
                    required
                    type="text"
                    label="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />}
                <TextField
                    required
                    autoFocus
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {register && <TextField
                    required
                    type="password"
                    label="Password verification"
                    value={passwordVerify}
                    onChange={(e) => setPasswordVerify(e.target.value)}
                />}
                <LoadingButton
                    className="login-button"
                    variant="contained"
                    color="primary"
                    type="submit"
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<LoginIcon />}
                >
                    {register ? 'register' : 'Log In'}
                </LoadingButton>
                {passResetLoading ? <CircularProgress /> : <p className='forgot-password' onClick={handleForgetPassword}>forgot my password</p>}
            </form>
            <Footer />
        </>
    );
}

export default Register;
