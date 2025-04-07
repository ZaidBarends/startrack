import React, { useEffect, useState } from 'react';
import { ClientAPI } from '../../services/clientService';
import { useAuth } from '../../context/AuthContext';
import { Client } from '../../types/client';


const ClientList = () => {
  const { currentUser } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const loadClients = async () => {
      if (currentUser) {
        const data = await ClientAPI.getAll(currentUser.uid);
        setClients(data);
      }
    };
    
    loadClients();
  }, [currentUser]);

  return (
    <div className="client-list">
      {clients.map(client => (
        <div key={client.id} className="client-card">
          <h3>{client.name}</h3>
          <p>{client.email}</p>
          <span className={`status-badge ${client.status}`}>
            {client.status}
          </span>
        </div>
      ))}
    </div>
  );
};