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
        },
        responseType: 'blob'

      }).then(async (result) => {
        alert('PDF uploaded successfully!');

        const blob = result.data
        console.log('blob creared...')
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'your_file.xlsm'; // The filename for the download

        // Append link to body and click it to start download
        document.body.appendChild(a);
        a.click();

        // Clean up by removing the link and revoking the blob URL
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url)
      }).catch((err) => {
        console.log(err)
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