import React from 'react';
import { DialogContent } from '@mui/material';

import { BootstrapDialog, BootstrapDialogTitle } from './styles';

export const ReactModal = (props) => {
    const { open, title, handleClose, children, ...rest } = props;
    return (
        <BootstrapDialog
            {...rest}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent>{children}</DialogContent>
        </BootstrapDialog>
    );
};
