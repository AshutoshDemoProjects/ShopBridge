import { Button, Grid, TextField } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons';
import React from 'react'

export default function FileInput(props) {
    const { name, label, value, error = null, onSelectFile, fullWidth = false, ...other } = props;
    return (<Grid container alignItems="center" style={fullWidth ? { marginTop: '8px', width: '90%' } : null}>
        <Grid item xs={9}>
            <TextField
                name={name}
                label={label}
                value={value}
                disabled={true}
                fullWidth
                {...other}
                {...(error && { error: true, helperText: error })}
            />
        </Grid>
        <Grid item xs={3}>
            <Button
                variant="contained"
                color="default"
                component="label"
                startIcon={<CloudUpload />}
            >Upload<input id="file-input-id" type="file" hidden onChange={onSelectFile} />
            </Button>
        </Grid>
    </Grid>)
}
