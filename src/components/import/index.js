import React, {useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Papa from 'papaparse';
import {db} from '../../firebase'



const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Import = (props)=> {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
    
    
    const classes= useStyles()
    const [selectedFile, setSelectedFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [uploading, setUploading] = useState(false)

    


    const fileSubmit =()=>{
        if(selectedFile){
            console.log(selectedFile)
            setUploading(true)

            try{
                Papa.parse(selectedFile, {
                        complete: (result)=>{
                            result.data.map(movie=>{
                                db().collection('Movies').add(movie)
                            })
                            setUploading(false)
                            setSelectedFile(null)
                        },
                        header: true
                    }
                )
                
                
                
            }
            catch (e){
                setUploading(false)
                setErrorMessage(e)
            }
        }else{
            setErrorMessage('Please select a file.')
        }
    }
    
    useEffect(() => {
        setSelectedFile(acceptedFiles[0])
        setErrorMessage(null)
    }, [acceptedFiles])
  
    return (
        <>
            <Backdrop className={classes.backdrop} open={uploading}>
                <h1>Uploading</h1> <br/>
                <CircularProgress color="inherit" />
            </Backdrop>
            <section className="container">
                <div style={{border: '2px dashed', borderRadius: '5px'}} {...getRootProps({className: 'dropzone'})}>
                <input disabled={uploading} {...getInputProps()} />
                <p>Drag and drop some CSV file here, or click to select file</p>
                </div>
                <h4>File</h4>
                {selectedFile && <div>
                    {selectedFile.path} - {selectedFile.size} bytes
                </div>}
                {errorMessage && <div>
                    {errorMessage}    
                </div>}
                <Button disabled={uploading || !selectedFile} onClick={fileSubmit} variant="contained" color="primary">
                    {uploading ? <><CircularProgress style={{marginRight: 5}} size={20} color="inherit" /> Uploading</> : "Upload"}
                </Button>
            </section>
        </>
    );
  
}

export default Import