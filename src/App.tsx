import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import DatabaseSeeder from './components/DevTools/DatabaseSeeder';

// Define the shape of the currentUser object
interface CurrentUser {
  email: string;
}

// Wrap content requiring authentication
const AuthenticatedContent: React.FC = () => {
  const { currentUser, logout } = useAuth() as {
    currentUser: CurrentUser | null;
    logout: () => void;
  };

  return (
    <div className="App">
      <header className="App-header">
        <header className="App-header">
          <p>Welcome to StarTrack!</p>
          You are logged in as: {currentUser?.email}
        </header>
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          Log Out
        </button>

        {/* Only shows in development environment */}
        <DatabaseSeeder />
      </header>
    </div>
  );
};

// App with conditional rendering based on auth state
const AppContent: React.FC = () => {
  const { currentUser } = useAuth() as { currentUser: CurrentUser | null };

  return currentUser ? <AuthenticatedContent /> : <Login />;
};

// Main app component with auth provider
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
