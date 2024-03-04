import React from 'react';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

const ReactIcon = ({ icon, width, height, sx, ...other }) => {
    return (
        <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} width={width} height={height} />
    );
};

export default ReactIcon;
