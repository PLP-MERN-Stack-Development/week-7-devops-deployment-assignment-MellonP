import { useState } from 'react';
import axios from 'axios';

const ReportBug = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/api/bugs',
        { title, description },
        { withCredentials: true } // Important if your backend expects credentials
      );

      console.log(response.data); // Debug line
      setSubmitted(true);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err); // See what's failing
      setError('Bug report failed. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Bug title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Describe the bug..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Report Bug</button>
      {submitted && <p>✅ Bug reported successfully!</p>}
      {error && <p>❌ {error}</p>}
    </form>
  );
};

export default ReportBug;
