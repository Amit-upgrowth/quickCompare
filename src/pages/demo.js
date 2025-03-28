import { useEffect, useState } from 'react';
import { 
  fetchHomeData, 
  fetchAutoSuggest, 
  fetchGroupSearch,
  fetchMapSuggest,
  fetchPlaceDetails
} from '../services/apiService';

const DemoPage = () => {
  const [data, setData] = useState({
    home: null,
    autoSuggest: null,
    groupSearch: null,
    mapSuggest: null,
    placeDetails: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          home, 
          autoSuggest, 
          groupSearch,
          mapSuggest,
          placeDetails
        ] = await Promise.all([
          fetchHomeData(),
          fetchAutoSuggest('butter'),
          fetchGroupSearch('Atta'),
          fetchMapSuggest('noida'),
          fetchPlaceDetails('ChIJezVzMaTlDDkRP8B8yDDO_zc')
        ]);
        
        setData({ 
          home, 
          autoSuggest, 
          groupSearch,
          mapSuggest,
          placeDetails
        });
        
        // Log responses to console
        console.log('Home Data:', home);
        console.log('AutoSuggest Data:', autoSuggest);
        console.log('GroupSearch Data:', groupSearch);
        console.log('MapSuggest Data:', mapSuggest);
        console.log('PlaceDetails Data:', placeDetails);
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="container">
      <h1>API Response Demo</h1>
      
      {loading && <p>Loading data...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="data-section">
        <h2>Home Data</h2>
        <pre>{JSON.stringify(data.home, null, 2)}</pre>
      </div>

      <div className="data-section">
        <h2>AutoSuggest Results</h2>
        <pre>{JSON.stringify(data.autoSuggest, null, 2)}</pre>
      </div>

      <div className="data-section">
        <h2>Group Search Results</h2>
        <pre>{JSON.stringify(data.groupSearch, null, 2)}</pre>
      </div>

      <div className="data-section">
        <h2>Map Suggest Results</h2>
        <pre>{JSON.stringify(data.mapSuggest, null, 2)}</pre>
      </div>

      <div className="data-section">
        <h2>Place Details</h2>
        <pre>{JSON.stringify(data.placeDetails, null, 2)}</pre>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .error {
          color: red;
        }
        .data-section {
          margin: 20px 0;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        pre {
          background: #f5f5f5;
          padding: 10px;
          border-radius: 3px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};

export default DemoPage;