import React from 'react';
import { CustomButton, ReactIcon } from 'components/molecules';
import { IconButton, useTheme } from '@mui/material';
import { useToast } from 'hooks';
import copy from 'copy-to-clipboard';

export const BattleInfoActionButton = ({ setIsOpenChat }) => {
    const theme = useTheme();
    const { showToast } = useToast();

    const copyToClipboard = () => {
        copy(window.location.href);
        showToast('URL copied to clipboard', 'success');
    };

    return (
        <div className="battle-info-action-buttons">
            <CustomButton
                text="End War"
                type="contained"
                bgColor={'#ff0202'}
                textColor={theme.palette.icon.default}
                width={'50%'}
                onClick={() => {}}
            />
            <IconButton
                size="medium"
                sx={{
                    height: '38px',
                    bgColor: '#323639',
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
                onClick={() => setIsOpenChat(true)}
            >
                <ReactIcon
                    icon={'lets-icons:chat-light'}
                    color={theme.palette.icon.default}
                    height={25}
                    width={25}
                />
            </IconButton>
            <IconButton
                size="medium"
                sx={{
                    height: '38px',
                    bgColor: '#323639',
                    borderRadius: '8px',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
                onClick={() => copyToClipboard()}
            >
                <ReactIcon
                    icon={'solar:share-line-duotone'}
                    color={theme.palette.icon.default}
                    height={25}
                    width={25}
                />
            </IconButton>
        </div>
    );
};
