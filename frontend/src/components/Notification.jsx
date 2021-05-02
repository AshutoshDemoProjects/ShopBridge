import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react'

export default function Notification(props) {
    const { notify, setNotify } = props;
    const handleClose = (e, reason) => {
        if (reason === 'clickaway')
            return;
        setNotify({
            ...notify,
            isOpen: false
        })
    }
    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={notify.type}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
