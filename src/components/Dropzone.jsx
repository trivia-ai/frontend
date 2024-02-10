import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const DropzoneFileUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const filesInfo = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setUploadedFiles(filesInfo);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzone_area}>
        <input {...getInputProps()} />
        {uploadedFiles.length > 0 ? <p> You can re-upload the file ... </p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>

      {uploadedFiles.length > 0 && (
        <>
            {uploadedFiles.map((file,index) => (
                <div key={index}>
                    <span className='dropzone_label'>Uploaded Files: </span>
                    <span className='dropzone_value'>{file.name} ({file.type})</span>
                </div>

            ))}
        </>
      )}
    </div>
  );
};

const dropzone_area = {
  border: '2px dashed #2A2A33',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default DropzoneFileUploader;
