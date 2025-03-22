import * as React from 'react';
import { alpha } from '@mui/material/styles';
//import AddDate from '../components/AddDate';
import AddIcon from '@mui/icons-material/Add';
//import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from 'axios';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import UploadFile from '../components/UploadFile';


import { useState, useEffect } from 'react';

import { visuallyHidden } from '@mui/utils';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'Select All',
            }}
          />
        </TableCell>
        {
         headCells.map((headCell) => (
          headCell.id !== '_id' && (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )))}
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({numSelected, selectedRoute, setSelectedRoute, routesArray}) {
  
  
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {selectedRoute.tableName}
        </Typography>
        
      )}
      <FormControl sx={{ minWidth: 130 }}>
        <InputLabel id="table-select-label">Select Table</InputLabel>
        <Select
          labelId="table-select-label"
        id="table-select"
        value={selectedRoute}
        label="Select Table"
        onChange={(e)=>{setSelectedRoute(e.target.value)}}
      >
        <MenuItem value={""}>None</MenuItem>
        {routesArray?.map((route, index)=>{
          return <MenuItem key={index} value={route}>{route.tableName}</MenuItem>
        })}
        </Select>
      </FormControl>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ selectOptions, auth }) {
  //const axios = useAxiosPrivate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const [headCells, setHeadCells] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [editRowData, setEditRowData] = useState({});
  const [saveAction, setSaveAction] = useState('');
  
  useEffect(() => {
    getData();
  }, [selectedRoute]);

  const createData = async () => {
    axios.post(`http://localhost:8000/${selectedRoute.route}`, {
      data: editRowData
    })
      .then((res) => {
        console.log(res);
        const idToBeEdited = editRowId;
        rows.find(row => row._id === idToBeEdited)._id = res.data._id;
        setEditRowId(res.data._id);
        setRows(rows.map(row => (row._id === editRowId ? editRowData : row)));
        setSaveAction('');
        setEditRowId(null);
      });
  }
  const getData = async () => {
    
    axios.post(`http://localhost:8000/get${selectedRoute.route}`, {
      userId: auth.data.id
    }, {headers:{
      'Content-Type': 'application/json'
    }}).then((res) => {
        
        setRows(res.data);
        
        if (res.data.length > 0) {
          const keys = Object.keys(res.data[0]);
          const headCells = keys.map(key => ({
            id: key,
            numeric: typeof res.data[0][key] === 'number',
            disablePadding: false,
            label: key,
          }));
          setHeadCells(headCells);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateData = async () => {
   
    axios.patch(`http://localhost:8000/${selectedRoute.route}`, {
      id: editRowId,
      data: editRowData
    })
      .then((res) => {
        setRows(rows.map(row => (row._id === editRowId ? editRowData : row)));
        setEditRowId(null);
        setSaveAction('');
      })
  }

  const deleteData = async (id) => {
    axios.delete(`http://localhost:8000/${selectedRoute.route}`, { data: { documentId: id }})
      .then((res) => {
        setRows(rows.filter(row => row._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const cancelEdit = () => {
    if (setEditRowId != null) {
      setEditRowId(null);
      setSaveAction('');
    }
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleEditClick = (row) => {
    setSaveAction('Update');
    setEditRowId(row._id);
    setEditRowData(row);
  };

  const handleSaveClick = () => {
    saveAction ==='Update'?updateData():createData();
  };

  const handleInputChange = (e, key, rowid) => {
    setEditRowId(rowid);
    if (!key.includes('Document')) {
      setEditRowData({ ...editRowData, [key]: e.target.value })
    }
    else {
      setEditRowData({ ...editRowData, [key]: e })
      console.log('Cell data', e, key);
    }
  };

  const handleAddRow = () => {
    const newRow = headCells.reduce((acc, cell) => {
      acc[cell.id] = '';
      return acc;
    }, {});
    newRow._id = `temp-${Date.now()}`; // Temporary ID for the new row
    console.log('New Row id',newRow._id);
    newRow.user = auth.data.id;
    setRows([...rows, newRow]);
    setEditRowId(newRow._id);
    console.log('EditRowId',editRowId,'Rows',rows);
    setEditRowData(newRow);
    setSaveAction('Create');
    console.log('Save Action', saveAction);
  };

  const handleDeleteClick = (id) => {
    deleteData(id);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} routesArray={selectOptions.routes} />
        <TableContainer component={Paper} sx={{width: "100%", 
            maxHeight: "400px", 
            overflowY: "auto", 
            boxShadow: 3,
            borderRadius: 2,}}>
          <Table sx={{tableLayout: "auto",width: "100%"}} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                
                const isItemSelected = selected.includes(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    //sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row._id)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {
                    headCells.map((cell) =>
                      cell.id !== '_id' && (
                        
                        <TableCell key={cell.id} align={cell.numeric ? 'right' : 'left'}>
                          {editRowId === row._id && (!cell.id.includes('Document')) ? (
                            <input
                              type="text"
                              value={editRowData[cell.id]}
                              onChange={(e) => handleInputChange(e, cell.id, row._id)}
                            />
                          ) : (editRowId === row._id && (cell.id.includes('Document') || cell.id.includes('Certificate')||cell.id.inclues('Certificate')) ? ( 
                              <UploadFile Accept={'image/*,.pdf, .docx, .xlsx'} Id={"Upload Document"} Name={"Upload Document"} handlenputChange={handleInputChange} cellId={cell.id} rowId={row._id}/>
                          ): 
                          
                          // editRowId === row._id && (cell.id.includes('Date')) ? 
                          // (
                          //  <>
                          //   <AddDate cellId={cell.id} rowId={row._id} handleinputChange={handleInputChange}>
                            
                          //   </AddDate>
                          //   </>) : 
                          row[cell.id])}
                        </TableCell>
                      )
                    )}
                    <TableCell align="right">
                      {editRowId === row._id ? (
                        <>
                          <IconButton label="Save changes" onClick={()=>handleSaveClick()}>
                            <SaveIcon />
                          </IconButton>
                          
                          <IconButton label="Cancel changes" onClick={cancelEdit}>
                            <ClearIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton label="Edit row data" onClick={() => handleEditClick(row)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton label="Delete selected row" onClick={() => handleDeleteClick(row._id)}>
                        <DeleteIcon />
                      </IconButton>

                      
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <IconButton label="Add Data" onClick={handleAddRow}>
        <AddIcon />
      </IconButton>
    </Box>
  );
}
