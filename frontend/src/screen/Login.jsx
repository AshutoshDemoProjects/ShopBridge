import React, { useEffect } from 'react';
import { Avatar, Button, CircularProgress, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinAction } from './../redux/action/userActions';
import { Form, useForm } from './../components/useForm';
import MessageAlert from './../components/MessageAlert';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        height: '70vh',
        width: theme.spacing(40),
        margin: '20px auto'
    },
    avatar: {
        height: theme.spacing(10),
        width: theme.spacing(10),
        backgroundColor: '#20a0a0',
        '& .MuiSvgIcon-root': {
            height: theme.spacing(10),
            width: theme.spacing(10),
        }
    },
    button: {
        margin: theme.spacing(2, 'auto')
    }
}));
const initialFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}
export default function Login(props) {
    const styles = useStyles();
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('email' in fieldValues)
            temp.email = values.email ? '' : 'Please enter email id.';
        if ('password' in fieldValues)
            temp.password = values.password ? '' : 'Please enter password';
        setErrors({ ...temp });
        if (fieldValues === values)
            return Object.values(temp).every(x => x === '');
    }
    const { values, errors, setErrors, handleInputChange } = useForm(initialFormValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signinAction(values));
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <Grid>
            <Paper elevation={10} className={styles.paper}>
                {error && <MessageAlert variant="error">{error}</MessageAlert>}
                <Grid align='center'>
                    <Avatar className={styles.avatar}><LockOutlined /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <Form onSubmit={handleSubmit}>
                    <TextField label="User email*" name="email" error={errors.email} value={values.email} onChange={handleInputChange} placeholder="Enter register email id" fullWidth />
                    <TextField label="Password*" name="password" error={errors.password} value={values.password} onChange={handleInputChange} placeholder="Enter password" type="password" fullWidth />

                    <Button type="submit" variant="contained" color="primary" disabled={loading} className={styles.button} fullWidth >{loading && <CircularProgress />}Sign In</Button>
                </Form>
                <Typography>
                    Ferget password? <Link to="register">Click Here</Link>
                </Typography>
                <Typography>
                    Don't you have a account? <Link to="register">SignUp</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
