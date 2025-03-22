import { useState } from 'react';
import FileUpload from '@mui/icons-material/FileUploadOutlined';

export default function UploadFile({handleinputChange, Id, Name, Accept, cellId, rowId, Type}) {
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileChange = (file) => {
        setUploadedFile(file);
        handleinputChange(file, cellId, rowId);
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        handleinputChange(null, cellId, rowId); // Notify parent about file removal
    };

    return (
        <>
            <div>
                <label htmlFor={Id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <FileUpload style={{ marginLeft: '35%' }} />
                </label>
                <input 
                    onChange={(e) => handleFileChange(e.target.files[0])} 
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