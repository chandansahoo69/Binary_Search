import React, { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from 'utils/utilityFunctions';

import { FormInput } from 'components/organism';
import { useResponsive, useError, useToast } from 'hooks';
import { CustomButton } from 'components/molecules';
import routes from 'config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'services/ApiRequests';
import { privateApi } from 'api/http';
import { setAccessToken, setRefreshToken } from 'services/ApiService';
import { loginReducer } from 'slice/user';

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const isMobile = useResponsive('down', 'sm', '', '');
    const isTablet = useResponsive('down', 'md', '', '');
    const { error, setError } = useError({ type: '', message: '' });

    // const { isLoading } = useSelector((state) => state.auth);

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleOnChange = (e) => {
        // restriction check
        // if (e.target.name === 'email' || e.target.name === 'password') {
        //     if (e.target.value.length > 50) {
        //         setError({
        //             type: e.target.name,
        //             message: 'Email should be less than 50 characters.',
        //         });
        //         return;
        //     }
        // }

        // change state data
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        const isValidEmail = validateEmail(inputs.email);
        if (!isValidEmail) {
            setError({
                type: 'email',
                message: 'Please enter a valid email.',
            });
            return false;
        }
        const isValidPassword = validatePassword(inputs.password);
        if (isValidPassword !== true) {
            setError({
                type: 'password',
                message: isValidPassword,
            });
            return false;
        }
        return true;
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // validation check
        const isValid = validateInputs();
        if (!isValid) return;

        try {
            await dispatch(login(inputs));

            navigate(routes.dashboard.path);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundColor: theme.palette.background.other,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    sx={{
                        fontSize: isMobile
                            ? theme.typography.h3.fontSize
                            : theme.typography.h2.fontSize,
                        fontWeight: theme.typography.h2.fontWeight,
                        paddingBottom: '1rem',
                    }}
                >
                    Sign in to your account
                </Typography>
                <div
                    style={{
                        padding: '20px 10px',
                        width: isMobile ? '80%' : isTablet ? '60%' : '35%',
                        marginTop: '1rem',
                        borderTop: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <FormInput
                        label={'Email'}
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        value={inputs.email}
                        onChange={handleOnChange}
                        error={error}
                    />
                    <FormInput
                        label={'Password'}
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={inputs.password}
                        onChange={handleOnChange}
                        error={error}
                    />
                    <NavLink
                        to={routes.forgotPassword.path}
                        className="link"
                        style={{ color: theme.palette.primary.main }}
                    >
                        <Typography>Forgot your password?</Typography>
                    </NavLink>
                    <CustomButton
                        text="Sign In"
                        width={'100%'}
                        type="contained"
                        otherStyle={{ margin: '35px 0 15px 0', borderRadius: '30px' }}
                        onClick={handleOnSubmit}
                    />
                    <Typography
                        className="signup-text"
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        Don't have an account?
                        <NavLink
                            to={routes.signup.path}
                            className="link"
                            style={{ color: theme.palette.primary.main }}
                        >
                            <Typography>Sign up for free</Typography>
                        </NavLink>
                    </Typography>
                    <div
                        style={{
                            borderTop: `1px solid ${theme.palette.divider}`,
                            margin: '15px 0',
                        }}
                    ></div>
                    <div className="text-center">
                        {/* <div>
                            By proceeding, you agree to GreatFrontEnd's{' '}
                            <NavLink
                                to={'/monnit/signup'}
                                className="link"
                                style={{ color: theme.palette.primary.main }}
                            >
                                <Typography>Terms of Service</Typography>
                            </NavLink>
                            and{' '}
                            <NavLink
                                to={'/monnit/signup'}
                                className="link"
                                style={{ color: theme.palette.primary.main }}
                            >
                                <Typography>Privacy Policy.</Typography>
                            </NavLink>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
