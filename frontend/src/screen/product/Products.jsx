import { Button, InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, Avatar } from '@material-ui/core';
import { Add, DeleteOutline, Edit, Search } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Popup from '../../components/Popup';
import useTable from './../../components/useTable';
import { Controls } from './../../components/controls/index';
import ProductForm from './ProductForm';
import Notification from './../../components/Notification';
import ConfirmDialog from './../../components/ConfirmDialog';
import { createProductAction, deleteProductAction, listProductsAction, updateProductAction } from '../../redux/action/productAction';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(3)
    },
    inputSearch: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}));
const headCells = [
    { id: 'image', title: '#', disableSort: true },
    { id: 'name', title: 'Name' },
    { id: 'brand', title: 'Brand' },
    { id: 'price', title: 'Price' },
    { id: 'quantity', title: 'Quantity' },
    { id: 'description', title: 'Description', disableSort: true },
    { id: 'action', title: 'Action', disableSort: true },
];
export default function Products() {
    const styles = useStyles();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState();
    //const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => items });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(products, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === '')
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()));
            }
        });
    }
    useEffect(() => {
        dispatch(listProductsAction());
    }, [dispatch]);

    const addOrEdit = async (product, resetForm) => {
        if (product._id === 0)
            await dispatch(createProductAction(product));
        else
            await dispatch(updateProductAction(product));
        resetForm();
        dispatch(listProductsAction());
        setRecordForEdit(null);
        setOpenPopup(false);
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully...',
            type: 'success'
        });
    }
    const openInPopup = product => {
        setRecordForEdit(product);
        setOpenPopup(true);
    }
    const onDelete = async (id) => {
        if (id) {
            await dispatch(deleteProductAction(id));
            dispatch(listProductsAction());
            setConfirmDialog({
                ...confirmDialog,
                isOpen: false
            })
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully...',
                type: 'error'
            });
        }
    }

    return (
        <>
            <Paper className={styles.pageContent}>
                <Toolbar>
                    <Controls.Input className={styles.inputSearch} placeholder="Search Product" onChange={handleSearch} InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                    }} />
                    <Button onClick={() => { setOpenPopup(true); setRecordForEdit(null); }} className={styles.newButton} text='Add New' startIcon={<Add />} >Add New Product</Button>
                </Toolbar>
                {products?.length !== 0 && <><TblContainer>
                    <TblHead />
                    <TableBody>
                        {products?.length > 0 && recordsAfterPagingAndSorting().map(prod => (
                            <TableRow key={prod._id}>
                                <TableCell><Avatar alt="Remy Sharp" src={prod.image} /></TableCell>
                                <TableCell>{prod.name}</TableCell>
                                <TableCell>{prod.brand}</TableCell>
                                <TableCell>{prod.price}</TableCell>
                                <TableCell>{prod.quantity}</TableCell>
                                <TableCell>{prod.description.substring(0, 10) + "..."}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton onClick={() => { openInPopup(prod); }} color='primary'><Edit /></Controls.ActionButton>
                                    <Controls.ActionButton onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record',
                                            subTitle: 'You can\'t undo this operation?',
                                            onConfirm: () => onDelete(prod._id)
                                        });
                                    }} color='secondary'><DeleteOutline /></Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination /></>}
                <Popup title="Product Form" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                    <ProductForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
                </Popup>
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}></ConfirmDialog>
            </Paper>
        </>
    )
}
