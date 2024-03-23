import React from 'react';
import { Button, useTheme } from '@mui/material';
import { ReactIcon } from '../ReactIcon';

const CustomButton = ({
    icon,
    width,
    height,
    bgColor,
    textColor,
    type,
    text,
    onClick,
    otherStyle,
}) => {
    const theme = useTheme();

    return (
        <Button
            style={{
                height: height,
                width: width || 'full',
                backgroundColor: type === 'text' ? '' : bgColor || theme.palette.primary.main,
                color: textColor || type !== 'text' ? textColor : theme.palette.primary.main,
                borderRadius: '6px',
                borderColor: type === 'outlined' ? theme.palette.error.main : 'transparent',
                boxShadow: 'none',
                ...otherStyle,
            }}
            variant={type}
            onClick={(e) => onClick && onClick(e)}
        >
            {text}
            {icon && (
                <ReactIcon
                    icon={icon}
                    color={theme.palette.icon.secondary}
                    sx={{ marginLeft: 1 }}
                    height={16}
                    width={16}
                />
            )}
        </Button>
    );
};

export default CustomButton;
