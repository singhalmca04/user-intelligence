// React Frontend (example)
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {

    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      // await axios.post('/upload-pdf', formData, {
      //     headers: {
      //         'Content-Type': 'multipart/form-data',
      //     },
      // });
      axios({
        url: 'http://localhost:3000/uploadpdf',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      }).then((result) => {
        alert('PDF uploaded successfully!');
      }).catch((err) => {
        alert('Failed to upload PDF.');
      })

    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF.');
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
}

export default App;