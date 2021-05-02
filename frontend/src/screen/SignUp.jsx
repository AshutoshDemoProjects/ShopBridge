import React, { useEffect } from 'react';
import { Avatar, Button, CircularProgress, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Form, useForm } from './../components/useForm';
import { Controls } from './../components/controls/index';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../redux/action/userActions';
import MessageAlert from '../components/MessageAlert';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        width: theme.spacing(40),
        margin: '20px auto'
    },
    avatar: {
        height: theme.spacing(6),
        width: theme.spacing(6),
        backgroundColor: '#20a0a0',
        '& .MuiSvgIcon-root': {
            height: theme.spacing(5),
            width: theme.spacing(5),
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
export default function SignUp(props) {
    const styles = useStyles();
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? '' : 'Name field is required.';
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? '' : 'Please enter email id.';
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? '' : 'Please enter password';
        if ('confirmPassword' in fieldValues)
            temp.confirmPassword = fieldValues.confirmPassword ? values.password === fieldValues.confirmPassword ? '' : 'Confirm password must same as above password' : 'Enter Confirm Password';
        setErrors({ ...temp });
        if (fieldValues === values)
            return Object.values(temp).every(x => x === '');
    }
    const { values, errors, setErrors, handleInputChange } = useForm(initialFormValues, true, validate);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            let name = values.name;
            let email = values.email;
            let password = values.password;
            dispatch(registerAction(name, email, password));
        } else
            window.alert('error')
    }
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
                    <h2>Sign Up</h2>
                </Grid>
                <Form onSubmit={handleSubmit}>
                    <Controls.Input label="Name*" name="name" error={errors.name} value={values.name} onChange={handleInputChange} placeholder="Enter name" fullWidth />
                    <Controls.Input label="User email*" name="email" error={errors.email} value={values.email} onChange={handleInputChange} placeholder="Enter email id" fullWidth />
                    <Controls.Input label="Password*" name="password" error={errors.password} value={values.password} onChange={handleInputChange} placeholder="Enter password" type="password" fullWidth />
                    <Controls.Input label="Confirm Password*" name="confirmPassword" error={errors.confirmPassword} value={values.confirmPassword} onChange={handleInputChange} placeholder="Enter password again" type="password" fullWidth />

                    <Button type="submit" variant="contained" color="primary" disabled={loading} className={styles.button} fullWidth >{loading && <CircularProgress />}Sign Up</Button>
                </Form>
                <Typography>
                    Already have a account? <Link to="login">Sign In</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
