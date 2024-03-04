import React, { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { validateEmail, validatePassword } from 'utils/utilityFunctions';

import { FormInput } from 'components/organism';
import { useResponsive, useError } from 'hooks';
import { CustomButton } from 'components/molecules';
import routes from 'config/routes';

const ForgotPassword = () => {
    const theme = useTheme();
    const isMobile = useResponsive('down', 'sm', '', '');
    const isTablet = useResponsive('down', 'md', '', '');
    const { error, setError } = useError({ type: '', message: '' });

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

    const handleOnSubmit = (e) => {
        e.preventDefault();

        // validation check
        const isValid = validateInputs();
        if (!isValid) return;

        console.log('inputs', inputs);
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
                    Reset Password
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

                    <CustomButton
                        text="Send reset password instruction"
                        width={'100%'}
                        type="contained"
                        otherStyle={{ margin: '10px 0 15px 0', borderRadius: '30px' }}
                        onClick={handleOnSubmit}
                    />
                    <NavLink
                        to={routes.login.path}
                        className="link"
                        style={{ color: theme.palette.primary.main, marginTop: '10px' }}
                    >
                        <Typography>Go back to sign in</Typography>
                    </NavLink>
                    <div
                        style={{
                            borderTop: `1px solid ${theme.palette.divider}`,
                            margin: '15px 0',
                        }}
                    ></div>
                    <div className="text-center"></div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
