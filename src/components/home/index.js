import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete'

import TextField from '@material-ui/core/TextField';


import { DataGrid, GridToolbar  } from '@material-ui/data-grid';
import {db} from '../../firebase';
import { defaultPrefixCls } from 'antd/lib/config-provider';



const columns = [
  { field: 'id', headerName: 'ID', hide:true },
  {
    field: 'Name',
    headerName: 'Movie Name',
    flex:1,
    sort: 'asc'
  },
  {
    field: 'Director',
    headerName: 'Drirector',
    flex:1,
  },
  {
    field: 'Genre',
    headerName: 'Genre',
    flex:1,
    filterable: false,
  },
  {
    field: 'Year',
    headerName: 'Release Date',
    flex:1,
    type:'number'
    // valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //     params.getValue(params.id, 'lastName') || ''
    //   }`,
  },
  {
    field: 'Rating',
    headerName: 'Rating',
    type: 'number',
    flex:1,
    filterable: false,
  },
  {
    field: 'Votes',
    headerName: 'Votes',
    type: 'number',
    flex:1,
    filterable: false
  },
  {
    field: 'Revenue (Millions)',
    headerName: 'Revenue (Millions)',
    type: 'number',
    flex:1,
    filterable: false
  },
  
];




const Home = ()=>{
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
    const [deletingAll, setDeletingAll] = useState(false)
    const [newRecord, setNewRecord] = useState(false)
    const [selectedRows, setSelectedRows] = useState(null)
    const [deleteSelected, setDeleteSelected] = useState(false)
    const [movieDetails, setMovieDetails] = useState({
        Name :'',
        Genre:'',
        Description:'',
        Director: '',
        Actors: '',
        Year: '',
        ['Runtime (Minutes)'] : '',
        Rating: '',
        Votes: '',
        ['Revenue (Millions)'] : '',
        Metascore: ''
    });
    const [sortModel, setSortModel] = useState([
    {
        field: 'Name',
        sort: 'asc'
    }
    ])

    const handleDeleteConfirm = ()=>{
        setOpenDeleteConfirm(!openDeleteConfirm)
    }

    const deleteAllRecords = async ()=>{  
            setOpenDeleteConfirm(false);
            setDeletingAll(true);
                
            var data = [...rows]
                rows.map(row=>{
                    db().collection("Movies").doc(row.id).delete()
                    data = data.filter(item=> item.id === row.id);
                })
                setRows(data)
                setDeletingAll(false)

    }

    const handleNewRecord = ()=>{
        setNewRecord(!newRecord);
    }

    const submitNewRecord = ()=>{
        db().collection('Movies').add(movieDetails)
    }

    const handleDeleteSelected= ()=>{
        setDeleteSelected(!deleteSelected)
    }

    const deleteSelectedRecords = ()=>{
        handleDeleteSelected()
        var data = [...rows]
        selectedRows.map(row=>{
            db().collection("Movies").doc(row).delete();
        })
        data = data.filter(item => !selectedRows.includes(item.id));
        setRows(data)
    }
    




    useEffect(() => {
        db().collection('Movies').get().then(result=>{
            var data = []
            result.docs.map(doc=>{
                data.push({id: doc.id, ...doc.data()})
            })
            setRows(data);
            setLoading(false);
        })
    }, [])

    useEffect(()=>{
        console.log(movieDetails)
    }, [movieDetails])

    return (
        <div style={{ height: 600, width: '100%' }}>
            <Paper elevation={1} style={{marginBottom: 20, padding: 10}}>
                <Button style={{margin: 5}} startIcon={<AddIcon/>} onClick={handleNewRecord} variant="contained" color="primary">Add Record</Button>
                <Button disabled= {!selectedRows || selectedRows?.length < 1} style={{margin: 5}} startIcon={<AddIcon/>} onClick={handleDeleteSelected} variant="contained" color="primary">Delete Selected</Button>
                <Button startIcon={<DeleteIcon/>} onClick={handleDeleteConfirm} variant="contained" color="secondary">Delete All Records</Button>
            </Paper>
            <DataGrid
                components={{
                    Toolbar: GridToolbar,
                }}
                rows={rows}
                columns={columns}
                pageSize={10}
                sortModel = {sortModel}
                onSortModelChange= {(model)=>{setSortModel(model)}}
                onSelectionModelChange = {(model)=>setSelectedRows(model)}
                checkboxSelection
                disableSelectionOnClick
                loading ={loading}
                
            />


            <Dialog
                open={openDeleteConfirm}
                onClose={handleDeleteConfirm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete all records?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    When you click on confirm, you can't stop the process and you can't restore deleted records.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteConfirm} color="primary">
                    cencle
                </Button>
                <Button onClick={deleteAllRecords} color="primary" autoFocus>
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteSelected}
                onClose={handleDeleteSelected}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete selected {selectedRows?.legth} records?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    When you click on confirm, you can't stop the process and you can't restore deleted records.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteSelected} color="primary">
                    cencle
                </Button>
                <Button onClick={deleteSelectedRecords} color="primary" autoFocus>
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={deletingAll}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Deleting All Records</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Please wait
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

            <Dialog open={newRecord} onClose={handleNewRecord} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new record</DialogTitle>
                <DialogContent>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    name="Name"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="genre"
                    label="Genre"
                    name="Genre"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    multiline
                    rows={4}
                    margin="dense"
                    id="description"
                    label="Description"
                    name="Description"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="director"
                    label="Director"
                    name="Director"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="actors"
                    label="Actors"
                    name="Actors"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="year"
                    label="Year"
                    name="Year"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="runtime"
                    label="Runtime (Minutes)"
                    name="Runtime (Minutes)"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="rating"
                    label="Rating"
                    name="Rating"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="votes"
                    label="Votes"
                    name="Votes"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="revenue"
                    label="Revenue (Millions)"
                    name="Revenue (Millions)"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />
                <TextField
                    margin="dense"
                    id="metascore"
                    label="MetaScore"
                    name="Metascore"
                    type="text"
                    fullWidth
                    onChange={(e)=>{setMovieDetails({...movieDetails, [e.target.name]: e.target.value})}}
                />

                </DialogContent>
                <DialogActions>
                <Button onClick={handleNewRecord} color="primary">
                    Cancel
                </Button>
                <Button onClick={submitNewRecord} color="primary">
                    submit
                </Button>
                </DialogActions>
            </Dialog>
    </div>
    );
}
export default Home;