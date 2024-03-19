import React from 'react';

const PDFDownloader = () => {
  const downloadPDF = async () => {
    try {
      const response = await fetch('http://3.110.134.173:8080/pdf'); // Change the URL to your server URL
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Task.pdf'); // Change the name of the downloaded file as needed
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default PDFDownloader;
