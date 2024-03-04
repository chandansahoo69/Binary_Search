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
    minHeight: '100%',
    paddingTop: APPBAR_MOBILE + 12,
    paddingBottom: theme.spacing(1.5),
    paddingRight: '10px',
    backgroundColor: theme.palette.background.secondary,
    [theme.breakpoints.up('lg')]: {
        paddingTop: APPBAR_DESKTOP + 12,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1.4),
    },
}));
