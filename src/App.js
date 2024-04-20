import React, { useState } from 'react';
import './App.css';

function App() {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchPincodeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const result = await response.json();
      if (result && result.length > 0 && result[0].Status === 'Success') {
        setData(result[0].PostOffice);
        setFilteredData(result[0].PostOffice);
      } else {
        setError('Invalid pincode');
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeChange = (event) => {
    const newPincode = event.target.value;
    if (newPincode.length <= 6) {
      setPincode(newPincode);
    }
  };

  const handleFilterChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredResults = data.filter((office) =>
      office.Name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredResults);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (pincode.length !== 6) {
      setError('Postal code must be 6 digits');
      setData([]);
      setFilteredData([]);
    } else {
      fetchPincodeData();
    }
  };

  return (
    <div className="App">
      <h1>Pincode Lookup</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <input
            type="text"
            value={pincode}
            onChange={handlePincodeChange}
            placeholder="Enter 6-digit pincode"
            style={{ width: '50vw' }}
            className="pincode-input"
          />
        </div>
        
        <button type="submit" className="lookup-button">Lookup</button>
        <div className="filter-container">
          <input
            type="text"
            placeholder="🔍 Search by post office name"
            onChange={handleFilterChange}
            style={{ width: '50vw' }}
            className="filter-input"
          />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {loading && <div className="loader">Loading...</div>}
      {!loading && data.length > 0 && (
        <div className="details-box">
          {filteredData.length === 0 && <p>No matching post offices found</p>}
          {
          /* {filteredData.length > 0 && <p><div><b>PinCode:</b> {filteredData[0].Pincode}</div><br></br></p>}
          <br></br>
          <div>
          <p><b>Message:</b> Number of pincode(s) found:  {filteredData.length}</p>
          </div> */
          }
           {filteredData.length > 0 && (
    <div id="pin">
      <p><b>PinCode:</b> {filteredData[0].Pincode}</p>
      
      <p><b>Message:</b> Number of pincode(s) found: {filteredData.length}</p>
    </div>
  )}
          <div className="result-container">
            {filteredData.map((office) => (
              <div key={office.Name} className="result-card">
                <h2>{office.Name}</h2>
                <p>Pincode: {office.Pincode}</p>
                <p>District: {office.District}</p>
                <p>State: {office.State}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [pincode, setPincode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [filterText, setFilterText] = useState('');

//   const fetchPincodeData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
//       const result = await response.json();
//       if (result && result.length > 0 && result[0].Status === 'Success') {
//         setData(result[0].PostOffice);
//         setFilteredData(result[0].PostOffice);
//       } else {
//         setError('Invalid pincode');
//         setData([]);
//         setFilteredData([]);
//       }
//     } catch (error) {
//       setError('Error fetching data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePincodeChange = (event) => {
//     const newPincode = event.target.value;
//     if (newPincode.length <= 6) {
//       setPincode(newPincode);
//     }
//   };

//   const handleFilterChange = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setFilterText(searchTerm);
//     const filteredResults = data.filter((office) =>
//       office.Name.toLowerCase().includes(searchTerm)
//     );
//     setFilteredData(filteredResults);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (pincode.length !== 6) {
//       setError('Postal code must be 6 digits');
//       setData([]);
//       setFilteredData([]);
//     } else {
//       fetchPincodeData();
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Pincode Lookup</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={pincode}
//           onChange={handlePincodeChange}
//           placeholder="Enter 6-digit pincode"
//         />
//         <button type="submit">Lookup</button>
//       </form>
//       <div className="filter-box">
//         <input
//           type="text"
//           value={filterText}
//           onChange={handleFilterChange}
//           placeholder="Search by post office name"
//         />
//         <span className="search-icon">&#128269;</span>
//       </div>
//       {error && <p className="error">{error}</p>}
//       {loading && <div className="loader">Loading...</div>}
//       {!loading && data.length > 0 && (
//         <div>
//           {filteredData.length === 0 && <p>No matching post offices found</p>}
//           <ul>
//             {filteredData.map((office) => (
//               <li key={office.Name} className="details-box">
//                 <h2>{office.Name}</h2>
//                 <p>Pincode: {office.Pincode}</p>
//                 <p>District: {office.District}</p>
//                 <p>State: {office.State}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

