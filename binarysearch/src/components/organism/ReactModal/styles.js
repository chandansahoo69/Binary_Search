import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, IconButton } from '@mui/material';

import { ReactIcon } from 'components/molecules';

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        border: `2px solid ${theme.palette.popover.border}`,
    },
    '& .MuiDialogContent-root': {
        // backgroundColor: 'red',
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle borderBottom="none" sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    }}
                >
                    <ReactIcon icon="ri:close-circle-line" />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}
