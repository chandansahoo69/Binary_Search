import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const FormInput = ({ label, name, type, value, placeholder, onChange, error }) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{ padding: '5px 0' }}>
                <Typography
                    sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        fontSize: '16px',
                        marginBottom: '10px',
                    }}
                >
                    {label}
                </Typography>
                <input
                    name={name}
                    type={type}
                    maxLength={51}
                    placeholder={placeholder}
                    className="form-input"
                    onChange={(e) => onChange(e)}
                    style={{
                        border: `2px solid ${theme.palette.divider}`,
                    }}
                    value={value}
                />
                <div className="error-message">
                    <span style={{ fontSize: '.8rem', color: 'red', margin: '.2rem 0 0 .5rem' }}>
                        {error?.type === name && error?.message}
                    </span>
                    <span style={{ fontSize: '.8rem', color: 'red', margin: '.2rem .5rem 0 0' }}>
                        {/* {inputs.title ? inputs?.title.length : 0} / 60 character Left */}
                    </span>
                </div>
            </Box>
        </>
    );
};

export default FormInput;
