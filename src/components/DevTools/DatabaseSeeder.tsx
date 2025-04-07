import React, { useState } from 'react';
import { seedTestData } from '../../utils/seedTestData';
import { useAuth } from '../../context/AuthContext';

/**
 * A development-only component that provides a UI for seeding test data
 */
const DatabaseSeeder = () => {
  const { currentUser } = useAuth();
  const [seeding, setSeeding] = useState(false);
  const [result, setResult] = useState(null as {success: boolean; message: string} | null);

  const handleSeedData = async () => {
    if (!currentUser) {
      setResult({
        success: false,
        message: 'You must be logged in to seed data'
      });
      return;
    }

    try {
      setSeeding(true);
      setResult(null);
      
      const success = await seedTestData(currentUser.uid);
      
      setResult({
        success,
        message: success 
          ? 'Test data successfully added to your account!' 
          : 'Failed to seed test data. Check console for details.'
      });
    } catch (error) {
      console.error('Error in seed process:', error);
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setSeeding(false);
    }
  };

  // Only show in development environment
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="database-seeder" style={{
      margin: '20px',
      padding: '15px',
      border: '1px dashed #ccc',
      borderRadius: '4px',
      backgroundColor: '#f8f8f8'
    }}>
      <h3>Development Tools</h3>
      <p><small>This panel only appears in development mode</small></p>
      
      <button 
        onClick={handleSeedData}
        disabled={seeding}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: seeding ? 'wait' : 'pointer',
          opacity: seeding ? 0.7 : 1
        }}
      >
        {seeding ? 'Seeding...' : 'Seed Test Data'}
      </button>
      
      {result && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: result.success ? '#e6f4ea' : '#fce8e6',
          color: result.success ? '#137333' : '#c5221f',
          borderRadius: '4px'
        }}>
          {result.message}
        </div>
      )}
    </div>
  );
};

export default DatabaseSeeder;