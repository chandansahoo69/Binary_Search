import React from 'react';
import { Stack, Typography, useTheme } from '@mui/material';
import { ReactModal } from 'components/organism';

export const PlaygroundModal = ({ open, handleClose }) => {
    const theme = useTheme();

    return (
        <>
            <ReactModal
                fullWidth
                maxWidth={!true ? 'md' : 'lg'}
                open={open}
                title={
                    <Stack>
                        <Typography
                            sx={{ ...theme.typography.h2, color: theme.palette.text.primary }}
                        >
                            Let
                        </Typography>
                        <Typography
                            sx={{ ...theme.typography.subtitle2, color: theme.palette.grey[700] }}
                        >
                            You can see all hierarchy and see your senior's profile
                        </Typography>
                    </Stack>
                }
                handleClose={() => {
                    handleClose();
                }}
            ></ReactModal>
        </>
    );
};
