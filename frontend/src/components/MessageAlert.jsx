import React from 'react';
import { Collapse, makeStyles, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
export default function MessageAlert(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { variant = null, children } = props;
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <Alert severity={variant}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {children}
                </Alert>
            </Collapse>
        </div>
    )
}

