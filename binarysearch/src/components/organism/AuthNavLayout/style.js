import { styled } from '@mui/material';
import { APPBAR_DESKTOP, APPBAR_MOBILE } from '../Navbar/Navbar';

export const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
});

export const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    // minHeight: '100%',
    paddingTop: APPBAR_MOBILE + 1,
    backgroundColor: theme.palette.background.secondary,
    [theme.breakpoints.up('lg')]: {
        paddingTop: APPBAR_DESKTOP + 1,
    },
}));
