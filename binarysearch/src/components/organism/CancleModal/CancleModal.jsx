import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    //   border: "2px solid #000",
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
};

const CancleModal = ({ loading, open, handleClose, title, handleClick }) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        style={{ textAlign: 'center' }}
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {title}
                    </Typography>
                    <Box
                        style={{
                            display: 'flex',
                            alignItem: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            marginTop: 20,
                        }}
                    >
                        <Button
                            onClick={handleClick}
                            disabled={loading}
                            variant="contained"
                            size="medium"
                            color="error"
                        >
                            Confirm
                        </Button>
                        <Button onClick={handleClose} variant="contained" size="medium">
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CancleModal;
