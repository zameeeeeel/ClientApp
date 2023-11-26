
import React, { useState, useEffect } from 'react';
//import './MedicalReportComponent.css';

const MedicalReportComponent = () => {
    const [medicalReports, setMedicalReports] = useState([]);
    const [file, setFile] = useState(null);
    const username= sessionStorage.getItem("username");
    useEffect(() => {
        fetchMedicalReports();
    }, []);
//Function to fetch reports 
    const fetchMedicalReports = async () => {
        try {
            const response = await fetch('http://localhost:5159/api/MedicalReport/Patient/'+username);
            if (response.ok) {
                const data = await response.json();
                setMedicalReports(data);
            } else {
                console.error('Failed to fetch medical reports');
            }
        } catch (error) {
            console.error('Error fetching medical reports:', error);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
//Function to upload report
    const handleUpload = async () => {
        try {
            if (!file) {
                alert('Please select a file to upload.');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            console.log('Form Data:', formData);

            const response = await fetch('http://localhost:5159/api/MedicalReport', {
                method: 'POST',
                headers: {"Content-Type":"multipart/form-data"},
                body: formData,
            });

            if (response.ok) {
                alert('Medical report uploaded successfully!');
                setFile(null);
                await fetchMedicalReports();
            } else {
                alert('Failed to upload medical report.');
            }
        } catch (error) {
            console.error('Error uploading medical report:', error);
        }
    };
//Function to delete report
    const handleRemove = async (reportId) => {
        try {
            const response = await fetch(`http://localhost:5159/api/MedicalReport/${reportId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Medical report removed successfully!');
                await fetchMedicalReports();
            } else {
                alert('Failed to remove medical report.');
            }
        } catch (error) {
            console.error('Error removing medical report:', error);
        }
    };

    return (
        <div>
            <h1>Medical Reports</h1>
            <button onClick={fetchMedicalReports}>Refresh Medical Reports</button>

            <div>
                <h2>Uploaded Medical Reports</h2>
                {medicalReports.length > 0 ? (
                    <ul>
                        {medicalReports.map((report) => (
                            <li key={report.reportId}>
                                <strong>{report.recordDescription}</strong>&nbsp;
                                <button onClick={() => handleRemove(report.reportId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No medical reports uploaded.</p>
                )}
            </div>

            <div>
                <h2>Upload New Medical Report</h2>
                <input type="file" name="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default MedicalReportComponent;