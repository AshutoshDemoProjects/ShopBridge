import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import { NotListedLocation } from '@material-ui/icons';
import React from 'react'

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },

    dialogTitle: {
        textAlign: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    }
}));
export default function ConfirmDialog(props) {
    const { confirmDialog, setConfirmDialog } = props;
    const styles = useStyles();
    return (
        <Dialog open={confirmDialog.isOpen} classes={{ paper: styles.dialog }}>
            <DialogTitle className={styles.dialogTitle}>
                <IconButton disableRipple className={styles.titleIcon}>
                    <NotListedLocation />
                </IconButton>
            </DialogTitle>
            <DialogContent className={styles.dialogContent}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle1">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={styles.dialogAction}>
                <Button onClick={() => setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false
                })} >NO</Button>
                <Button color="secondary" onClick={confirmDialog.onConfirm} >YES</Button>
            </DialogActions>
        </Dialog>
    )
}
