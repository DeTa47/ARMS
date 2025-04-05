import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import FileUpload from '@mui/icons-material/FileUploadOutlined';
import axios from 'axios';

export default function UploadFile({handleinputChange, Id, Name, Accept, cellId, rowId, Type, fileId}) {
    const [uploadedFile, setUploadedFile] = useState(null);
    const auth = useAuth();    

    useEffect(() => {
        // If fileId contains a file ID, show the remove button
        if (fileId) {
            setUploadedFile({ name: 'Existing File', fileId });
        }
    }, [fileId]);

    const handleFileChange = async (file, authValue) => {
        
        console.log();
        const formData = new FormData();
        formData.append('file',file);
        formData.append('id', authValue.auth.data.userid);

        try {
            const response = await axios.post('http://localhost:8000/upload', formData);

            if (response.status === 200) {
                console.log('Response:', response);
                const data = response.data;
                setUploadedFile({ ...file, fileId: data.fileId });
                handleinputChange(data.fileId, cellId, rowId);
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleRemoveFile = async () => {
        if (uploadedFile?.fileId) {
            try {
                await axios.delete(`http://localhost:8000/upload`, {
                    data: { fileId: uploadedFile.fileId },
                });
                setUploadedFile(null);
                handleinputChange(null, cellId, rowId); // Notify parent about file removal
            } catch (error) {
                console.error('Error removing file:', error);
            }
        }
    };

    return (
        <>
            <div>
                <label htmlFor={Id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <FileUpload style={{ marginLeft: '35%' }} />
                </label>
                <input 
                    onChange={(e) => handleFileChange(e.target.files[0], auth)} 
                    id={Id} 
                    name={Name} 
                    accept={Accept} 
                    style={{ display: 'none' }} 
                    type='file'
                />
            </div>
            {uploadedFile && (
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>{uploadedFile.name}</span>
                    <button 
                        onClick={handleRemoveFile} 
                        style={{ cursor: 'pointer', background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
                    >
                        Remove
                    </button>
                </div>
            )}
        </>
    );
}