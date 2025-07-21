import { useEffect, useState } from 'react';
import axios from 'axios';

const BugsPage = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/bugs'); // Adjust port if needed
        // Extract bugs array correctly
        setBugs(res.data.data.bugs);
      } catch (err) {
        console.error('Error fetching bugs:', err);
      }
    };

    fetchBugs();
  }, []);

  return (
    <div>
      <h2>All Bugs</h2>
      {bugs.length === 0 ? (
        <p>No bugs found.</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id}>
              <strong>{bug.title}</strong>: {bug.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BugsPage;
