import * as React from 'react';
import { alpha } from '@mui/material/styles';
import AddDate from '../components/AddDate';
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
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRowData, setModalRowData] = useState({});
  
  useEffect(() => {
    getData();
  }, [selectedRoute]);

  const createData = async () => {
    const dataToSend = { ...editRowData };
    delete dataToSend._id; // Remove _id for new entries

    if (!dataToSend.Sr_No) {
      delete dataToSend.Sr_No; // Remove Sr_No if not provided
    }

    axios.post(`http://localhost:8000/${selectedRoute.route}`, {
        data: dataToSend
    })
    .then((res) => {
        const idToBeEdited = editRowId;
        rows.find(row => row._id === idToBeEdited)._id = res.data._id;
        setEditRowId(res.data._id);
        setRows(rows.map(row => (row._id === editRowId ? { ...editRowData, _id: res.data._id } : row))); // Update row with server response
        setSaveAction('');
        setEditRowId(null);
        getData(); // Fetch updated data from the server
    });
  }

  // Function to transform column names from snake case to normal case
  const transformColumnName = (columnName) => {
    return columnName
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

  const getData = async () => {
    if (selectedRoute.route !== undefined) {
      axios.post(`http://localhost:8000/get${selectedRoute.route}`, {
        userId: auth.data.userid
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 404 || !res.data || res.data.length === 0) {
          setRows([]);
          return;
        } else {
          setRows(res.data);
          if (res.data.length > 0) {
            const keys = Object.keys(res.data[0]).filter(key => key !== '_id'); // Exclude '_id'
            const headCells = keys.map(key => ({
              id: key,
              numeric: typeof res.data[0][key] === 'number',
              disablePadding: false,
              label: transformColumnName(key), // Transform column names
            }));
            setHeadCells(headCells);
          }
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  const updateData = async (id, data) => {
    axios.patch(`http://localhost:8000/${selectedRoute.route}`, {
      id,
      data,
    }).then(() => {
      setRows(rows.map(row => (row._id === id ? data : row)));
      console.log('Rows: ', rows);
    });
  };

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
    const value = e?.target?.value || ''; // Default to an empty string if input is cleared

    if (key === '_id' && value === '') {
        return; // Prevent setting an empty string for _id
    }

    if (e === null) {
        setEditRowData({ ...editRowData, [key]: null });
    } else if (key === 'supportingDocument' && !e) {
        setEditRowData({ ...editRowData, [key]: null }); // Handle case where no file is uploaded
    } else if (!(key.includes('Document') || key.includes('attachment') || key.includes('certificate') || key.includes('document'))) {
        setEditRowData({ ...editRowData, [key]: value });
    } else {
        setEditRowData({ ...editRowData, [key]: e });
    }
  };

  const handleAddRow = () => {
    const newRow = headCells.reduce((acc, cell) => {
      acc[cell.id] = cell.id === '_id' ? null : ''; // Ensure no empty string for _id
      return acc;
    }, {});
    newRow._id = `temp-${Date.now()}`; // Temporary ID for the new row
    newRow.user = auth.data.id;
    setRows([...rows, newRow]);
    setEditRowId(newRow._id);
    setEditRowData(newRow);
    setSaveAction('Create');
  };

  const handleDeleteClick = (id) => {
    deleteData(id);
    setRows(rows.filter(row => row._id !== id)); // Immediately filter out the row
  };

  const fetchFileMetadata = async (fileId) => {
    try {
        const response = await axios.post(`http://localhost:8000/getuploadedfilemetadata`, {fileId : fileId});
        return response.data;
    } catch (error) {
        console.error('Error fetching file metadata:', error);
        return null;
    }
};

  const renderCellContent = (cell, row) => {
    if (editRowId === row._id) {
        
        if (cell.id.includes('document') || cell.id.includes('attachment') || cell.id.includes('certificate') || cell.id.includes('Document')) {
            return (
                <UploadFile
                    Accept={'image/*,.pdf, .docx, .xlsx'}
                    Id={"Upload Document"}
                    Name={"Upload Document"}
                    handleinputChange={handleInputChange}
                    cellId={cell.id}
                    rowId={row._id}
                    fileId={editRowData[cell.id]} // Pass fileId here
                />
            );
        } else if (cell.id.includes('Date') || cell.id.includes('date')) {
            return (<AddDate val={editRowData[cell.id]} handleinputChange={handleInputChange} cellId={cell.id} rowId={row._id}/>);
        } else {
            return (
                <input
                    type="text"
                    value={editRowData[cell.id]}
                    onChange={(e) => handleInputChange(e, cell.id, row._id)}
                />
            );
        }
    }
    if (
      (cell.id.includes('Document') || cell.id.includes('attachment') || cell.id.includes('certificate') || cell.id.includes('document')) &&
      row[cell.id]
    ) {
      return (
        <>
          <button
            onClick={async () => {
              const metadata = await fetchFileMetadata(row[cell.id]);
              if (metadata) {
                const link = document.createElement('a');
                link.href = `http://localhost:8000/download/${metadata._id}`; // Calls the backend download route
                link.download = metadata.originalname; // Sets the filename for the downloaded file
                link.click(); // Triggers the download
              }
            }}
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              background: 'blue',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
            }}
          >
            Download
          </button>
        </>
      );
    }
    if (cell.id.includes('Date') || cell.id.includes('date')) {
      return row[cell.id] ? new Date(row[cell.id]).toISOString().split('T')[0] : ''; // Format date as YYYY-MM-DD
    }
    return row[cell.id];
};

  const handleViewClick = (row) => {
    setModalRowData(row);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalRowData({});
  };

  const handleModalInputChange = (e, key) => {
    const value = e?.target?.value || ''; // Default to an empty string if input is cleared
    setModalRowData({ ...modalRowData, [key]: value });
  };

  const renderModalField = (key, value) => {
    if (key === '_id') return null; // Exclude '_id' from the modal
    if (key.includes('document') || key.includes('attachment') || key.includes('certificate') || key.includes('Document')) {
      return (
        <UploadFile
          Accept={'image/*,.pdf, .docx, .xlsx'}
          Id={"Upload Document"}
          Name={"Upload Document"}
          handleinputChange={(e) => handleModalInputChange(e, key)}
          cellId={key}
          fileId={value}
        />
      );
    } else if (key.includes('Date') || key.includes('date')) {
      return <AddDate val={value} handleinputChange={(e) => handleModalInputChange(e, key)} cellId={key} />;
    } else {
      return (
        <TextField
          label={key}
          value={value}
          onChange={(e) => handleModalInputChange(e, key)}
          fullWidth
          margin="normal"
        />
      );
    }
  };

  const handleModalSave = () => {
    updateData(modalRowData._id, modalRowData);
    setModalOpen(false);
  };

  const handleModalDelete = () => {
    deleteData(modalRowData._id);
    setModalOpen(false);
  };

  // Render only the first 6 columns
  const renderLimitedColumns = (row) => {
    return headCells.slice(0, 6).map((cell) => (
      <TableCell key={cell.id} align={cell.numeric ? 'right' : 'left'}>
        {row[cell.id]}
      </TableCell>
    ));
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .filter(row => row._id && (!row._id.startsWith('temp-') || row._id === editRowId)) // Include rows with temporary IDs if they are being edited
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows, editRowId],
  );

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
            routesArray={selectOptions.routes}
          />
          <TableContainer component={Paper} sx={{ width: '100%', maxHeight: '400px', overflowY: 'auto', boxShadow: 3, borderRadius: 2 }}>
            <Table sx={{ tableLayout: 'auto', width: '100%' }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells.slice(0, 6)} // Limit to first 6 columns
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
                      {renderLimitedColumns(row)}
                      <TableCell align="right">
                        <Button variant="contained" onClick={() => handleViewClick(row)}>
                          View
                        </Button>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setModalRowData({});
              setModalOpen(true);
            }}
          >
            Add Data
          </Button>
        </Box>
      </Box>

      {/* Modal for viewing and editing row data */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '90%',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {Object.keys(modalRowData).length === 0 ? 'Add New Data' : 'Edit Row Data'}
          </Typography>
          {headCells.map((cell) => (
            <Box key={cell.id} sx={{ mb: 2 }}>
              {renderModalField(cell.id, modalRowData[cell.id] || '')}
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleModalSave}>
              Save
            </Button>
            {Object.keys(modalRowData).length > 0 && (
              <Button variant="contained" color="error" onClick={handleModalDelete}>
                Delete
              </Button>
            )}
            <Button variant="outlined" onClick={handleModalClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
