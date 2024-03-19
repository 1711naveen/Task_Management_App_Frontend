import React from 'react';

const PDFDownloader = () => {
  const downloadPDF = async () => {
    try {
      const response = await fetch('http://3.110.134.173:8080/pdf', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment;filename=tasks.pdf"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
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
