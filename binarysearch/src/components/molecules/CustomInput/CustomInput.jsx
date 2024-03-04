import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ReactIcon } from '../ReactIcon';

const CustomInput = ({
    width,
    height,
    borderRadius,
    name,
    placeholder,
    backgroundColor,
    value,
    onChange,
    onKeyDown,
    startIcon,
    endIcon,
}) => {
    const theme = useTheme();

    return (
        <>
            <div
                className="custom-inputs-section"
                style={{
                    height: height,
                    width: width,
                    borderRadius: borderRadius,
                    backgroundColor: backgroundColor || theme.palette.input.box,
                }}
            >
                {startIcon && (
                    <ReactIcon
                        sx={{
                            fontSize: '1.5rem',
                            color: '#afbbcb',
                        }}
                        icon={startIcon}
                    />
                )}
                <input
                    className="custom-input"
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    style={{
                        backgroundColor: backgroundColor || theme.palette.input.box,
                        color: theme.palette.input.text,
                        paddingLeft: endIcon ? '5px' : '0px',
                    }}
                    value={value}
                    onChange={(e) => onChange && onChange(e)}
                    onKeyDown={(e) => onKeyDown && onKeyDown(e)}
                />
                {endIcon && (
                    <ReactIcon
                        sx={{
                            fontSize: '1.5rem',
                            color: '#afbbcb',
                        }}
                        icon={endIcon}
                    />
                )}
            </div>
        </>
    );
};

export default CustomInput;
