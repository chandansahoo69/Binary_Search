import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = ({ size = 50 }) => {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
            <CircularProgress color="secondary" size={size} />
        </Backdrop>
    );
};
