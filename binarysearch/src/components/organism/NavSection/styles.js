import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

export const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
    ({ theme }) => ({
        ...theme.typography.body2,
        height: 60,
        textTransform: 'capitalize',
        padding: '0',
        color: theme.palette.text.secondary,
    })
);

export const ListItemIconStyle = styled((props) => <ListItemIcon {...props} />)(({ theme }) => ({
    width: 40,
    height: 40,
    minWidth: 'auto',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.icon.primary,
    fontSize: theme.typography.h1.fontSize,
}));
