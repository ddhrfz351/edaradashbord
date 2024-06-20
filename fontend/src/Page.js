import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GuidelinesPage = () => {
  const [universityName, setUniversityName] = useState('');
  const [guidelines, setGuidelines] = useState(null);
  const [error, setError] = useState(null);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/guidelines`, {
        params: { name: universityName }
      });

      if (response.data.guidelines) {
        setGuidelines(response.data.guidelines);
        setError(null);
      } else {
        setGuidelines(null);
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching guidelines:', error);
      setError('حدث خطأ أثناء جلب الإرشادات.');
      setGuidelines(null);
    }
  };

  const handleUniversityChange = (event) => {
    setUniversityName(event.target.value);
  };

  useEffect(() => {
    if (universityName) {
      fetchGuidelines();
    }
  }, [universityName]);

  return (
    <div>
      <h1>Guidelines Page</h1>
      <label>Select University:</label>
      <select value={universityName} onChange={handleUniversityChange}>
        <option value="">Select University</option>
        <option value="Helwan">Helwan</option>
        {/* Add more universities as needed */}
      </select>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {guidelines && (
        <div>
          <h2>Guidelines for {universityName}</h2>
          <p>{guidelines.guidelines}</p>
          {guidelines.files && (
            <div>
              <h3>Uploaded Image</h3>
              <img
              
                src={`http://localhost:5000/${guidelines.files.filename}`}
                alt="Uploaded File"
                style={{ maxWidth: '100%', maxHeight: '400px' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GuidelinesPage;
