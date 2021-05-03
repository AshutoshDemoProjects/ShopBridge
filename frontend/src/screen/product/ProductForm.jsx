import { Button, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { Form, useForm } from './../../components/useForm';
import { Controls } from './../../components/controls/index';
import { useSelector } from 'react-redux';
import axios from 'axios';
import{baseUrl} from '../../utilConstants';
/***********this is initial form state for new product***************/
const initialFormValues = {
    _id: 0,
    name: '',
    description: '',
    quantity: '',
    brand: '',
    image: '',
    price: ''
};
export default function ProductForm(props) {
    const { addOrEdit, recordForEdit } = props;
    /*******get the info of login user from Redux********/
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    /*******
     * This is validation method to chech given fields are not empty or not.
     * If data in number then it must be greater than zero.
     * *********/
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? '' : 'Name field is required.';
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? '' : 'Description field is required.';
        if ('brand' in fieldValues)
            temp.brand = fieldValues.brand ? '' : 'Brand field is required.';
        if ('image' in fieldValues)
            temp.image = fieldValues.image ? '' : 'Please select image';
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? Number(values.quantity) > 0 ? '' : 'Quantity must greater than zero.' : 'Please enter the quantity';
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? Number(values.price) > 0 ? '' : 'Price must greater than zero.' : 'Please enter the price';
        setErrors({ ...temp });
        if (fieldValues === values)
            return Object.values(temp).every(x => x === '');
    }
    const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(initialFormValues, true, validate);
    /********
     * This method just check entire form by invoking its validate method.
     * if data is valid then only it will invoke
     * ************/
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        } else
            window.alert('error')
    }
    /*********
     * This will run component get render first time. 
     * Or if recordForEdit state change
     * ************/
    useEffect(() => {
        if (recordForEdit !== null) {
            setValues({ ...recordForEdit });
        }
    }, [recordForEdit, setValues]);


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        try {
            const { data } = await axios.post(`${baseUrl}/api/uploads`, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setValues({
                ...values,
                image: data
            });
        } catch (error) {
            window.alert(error.message);
        }
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6} style={{ paddingRight: '5px' }}>
                    <Controls.Input error={errors.name} name='name' label='Name' value={values.name} onChange={handleInputChange} fullWidth />
                    <Controls.Input error={errors.quantity} name='quantity' label='Quantity' value={values.quantity} onChange={handleInputChange} fullWidth />
                    <Controls.Input error={errors.price} name='price' label='Price' value={values.price} onChange={handleInputChange} fullWidth />
                    <Controls.FileInput error={errors.image} name='image' value={values.image} onSelectFile={uploadFileHandler} fullWidth />
                </Grid>
                <Grid item xs={6} style={{ paddingLeft: '5px' }}>
                    <Controls.Input error={errors.brand} name='brand' label='Brand' value={values.brand} onChange={handleInputChange} fullWidth />
                    <Controls.Input error={errors.description} name='description' label='Description' value={values.description} onChange={handleInputChange} fullWidth multiline rows={5} />
                </Grid>
            </Grid>
            <Grid container align="center" style={{ marginTop: '8px' }}>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary" type='submit'>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={resetForm} >Reset</Button>
                </Grid>
            </Grid>
        </Form>
    )
}
