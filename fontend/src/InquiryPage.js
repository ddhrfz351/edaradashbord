import React, { useState } from 'react';
import axios from 'axios';
import './InquiryPage.css';

const AdmissionStatusPage = () => {
  const [nationalId, setNationalId] = useState('');
  const [admissionStatus, setAdmissionStatus] = useState('');
  const [university_name, setUniversityName] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');

  const checkAdmissionStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/student/', {
        params: {
          national_id: nationalId,
        },
      });

      const data = response.data;

      if (response.status === 200) {
        setAdmissionStatus(data.admissionStatus);
        setUniversityName(data.university_name);
        setName(data.name);
        setCollege(data.college);
        setError('');
      } else {
        setAdmissionStatus('');
        setUniversityName('');
        setName('');
        setCollege('');
        setError(data.error || 'حدث خطأ أثناء استرجاع حالة القبول.');
      }
    } catch (error) {
      setAdmissionStatus('');
      setUniversityName('');
      setName('');
      setCollege('');
      setError('حدث خطأ أثناء الاتصال بالخادم.');
    }
  };

  return (
    <div>
      <h1>قم بإدخال الرقم القومي لعام 2023 2024</h1>
      <div >
       
        <input
          type="text"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
        <button onClick={checkAdmissionStatus}>استعلام</button>
      </div>
      {admissionStatus && (
        <table>
          <tbody>
            <tr>
              <td>الحالة:</td>
              <td>{admissionStatus}</td>
            </tr>
            <tr>
              <td>اسم الجامعة:</td>
              <td>{university_name}</td>
            </tr>
            <tr>
              <td>الاسم:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>اسم الكلية:</td>
              <td>{college}</td>
            </tr>
          </tbody>
        </table>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdmissionStatusPage;
