// services/clientService.ts
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Client } from '../types/client';

const CLIENTS_COLLECTION = (userId: string) => `users/${userId}/clients`;

export const ClientAPI = {
  create: async (userId: string, client: Client) => {
    const docRef = await addDoc(collection(db, CLIENTS_COLLECTION(userId)), client);
    return { ...client, id: docRef.id };
  },

  getAll: async (userId: string) => {
    const snapshot = await getDocs(collection(db, CLIENTS_COLLECTION(userId)));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Client);
  },

  update: async (userId: string, clientId: string, updates: Partial<Client>) => {
    await updateDoc(doc(db, CLIENTS_COLLECTION(userId), clientId), updates);
  },

  delete: async (userId: string, clientId: string) => {
    await deleteDoc(doc(db, CLIENTS_COLLECTION(userId), clientId));
  }
};