import { Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core'
import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme =>({
    table: {
        marginTop: theme.spacing(3),
        '& thead th':{
            fontWeight: '600',
            fontSize: '15px',
            color: theme.palette.main,
            backgroundColor: theme.palette.primary.light
        },
        '& tbody td':{
            fontWeight: '400',
            fontSize: '13px'
        },
        '& tbody tr:hover':{
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        }
    }
}))

export default function useTable(workers, headcells, filterFn) {
    const classes = useStyles()
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()


    const TblContainer = props =>(
        <Table className={classes.table}>
            {props.children}
        </Table>
    )
    const TblHead = props => {
        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order ==='asc';
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(cellId)
        }
        
        return(
            <TableHead>
                <TableRow>
                    {headcells.map(headcell => (
                        <TableCell key={headcell.id}
                        sortDirection={ orderBy === headcell.id ? order : false }
                        >
                            {headcell.disableSorting ? headcell.label : 
                            <TableSortLabel
                            active={orderBy === headcell.id}
                            direction= {orderBy === headcell.id ? order : 'asc'}
                            onClick={() => {handleSortRequest(headcell.id)}}
                            >
                            {headcell.label}
                            </TableSortLabel>
    }
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (<TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={workers && workers.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />)
    
    function stableSort (array, comparator) {
        const stabilizedThis = array && array.map((el, index) => [el, index]);
        stabilizedThis && stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis && stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }



    const recordsAfterPagingAndSorting = () => {
        return stableSort((workers && workers), getComparator(order, orderBy)) && stableSort(filterFn.fn(workers && workers), getComparator(order, orderBy))
        .slice(page*rowsPerPage, (page+1)*rowsPerPage)
        
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}