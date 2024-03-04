import React from 'react';
import CustomInput from 'components/molecules/CustomInput/CustomInput';

const Searchbar = ({
    name,
    value,
    onChange,
    startIcon,
    endIcon,
    backgroundColor,
    borderRadius = '10px',
    height = '40px',
    placeholder = 'Type here to search',
}) => {
    return (
        <>
            <CustomInput
                name={name}
                value={value}
                startIcon="uil:search"
                onChange={onChange}
                // endIcon="uil:search"
                backgroundColor={backgroundColor}
                borderRadius={borderRadius}
                height={height}
                placeholder={placeholder}
            />
        </>
    );
};

export default Searchbar;
