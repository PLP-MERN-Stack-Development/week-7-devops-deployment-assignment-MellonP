import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-8 text-green-400">🪲 Bug Tracker Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
        <Link to="/report">
          <button className="w-full py-3 px-6 rounded-xl bg-green-600 hover:bg-green-700 transition">
            Report a Bug
          </button>
        </Link>

        <Link to="/bugs">
          <button className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
            View Bug List
          </button>
        </Link>

        <Link to="/analytics">
          <button className="w-full py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
            Analytics
          </button>
        </Link>

        <Link to="/about">
          <button className="w-full py-3 px-6 rounded-xl bg-gray-600 hover:bg-gray-700 transition">
            About This App
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
