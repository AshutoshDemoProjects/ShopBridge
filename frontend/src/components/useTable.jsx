import { makeStyles, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
    table: {
        margin: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light
        },
        '& tbody td': {
            fontWeight: '300'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            coursor: 'pointer'
        }
    }
}));
export default function useTable(records, headCells, filterFn) {
    const styles = useStyles();
    const pages = [5, 10, 20];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[0]);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();
    const TblContainer = props => (
        <TableContainer>
            <Table className={styles.table}>
                {props.children}
            </Table>
        </TableContainer>
    );
    const TblHead = props => {
        const handelSortRequest = (cellId) => {
            const isAsc = orderBy === cellId && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId);
        }
        return (
            <TableHead>
                <TableRow>
                    {headCells.map(headCell => (
                        <TableCell key={headCell.id}>
                            {headCell.disableSort ? headCell.title : (<TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={() => { handelSortRequest(headCell.id) }}>
                                {headCell.title}
                            </TableSortLabel>)}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };
    const handelChangePage = (e, newPage) => {
        setPage(newPage);
    }
    const handelChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
    }
    const TblPagination = () => (
        <TablePagination
            component='div'
            page={page}
            rowsPerPageOptions={pages}
            rowsPerPage={rowsPerPage}
            count={records ? records.length : 0}
            onChangePage={handelChangePage}
            onChangeRowsPerPage={handelChangeRowsPerPage} />
    );
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy])
            return -1;
        else if (b[orderBy] > a[orderBy])
            return 1;
        else
            return 0;
    }
    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }
    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    };
}
