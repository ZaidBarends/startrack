import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Client } from '../types/client';
import { Invoice } from '../types/invoice';

/**
 * Seeds the Firestore database with test data for development and testing
 * @param userId The user ID to create test data for
 * @returns A promise that resolves when seeding is complete
 */
export const seedTestData = async (userId: string = 'test-user-123') => {
  try {
    console.log('🌱 Seeding test data for user:', userId);
    
    // Seed clients
    const clients: Record<string, Client> = {
      'client-1': {
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '(555) 123-4567',
        address: {
          street: '123 Main Street',
          city: 'Metropolis',
          state: 'CA',
          zip: '90210'
        },
        status: 'active',
        notes: 'Our first major client',
        tags: ['tech', 'enterprise']
      },
      'client-2': {
        name: 'Globex Industries',
        email: 'info@globex.co',
        phone: '(555) 987-6543',
        address: {
          street: '456 Tech Drive',
          city: 'Silicon Valley',
          state: 'CA',
          zip: '94025'
        },
        status: 'prospect',
        tags: ['manufacturing']
      },
      'client-3': {
        name: 'Stark Innovations',
        email: 'hello@stark.io',
        status: 'active',
        tags: ['tech', 'startup']
      }
    };

    // Seed invoices
    const invoices: Record<string, Invoice> = {
      'inv-001': {
        clientId: 'client-1',
        invoiceNumber: 'INV-2025-001',
        issueDate: new Date('2025-04-01'),
        dueDate: new Date('2025-04-15'),
        items: [
          {
            description: 'Web Development',
            quantity: 40,
            unitPrice: 75,
            taxRate: 10
          },
          {
            description: 'UI/UX Design',
            quantity: 20,
            unitPrice: 85,
            taxRate: 10
          }
        ],
        status: 'sent',
        notes: 'First phase of project'
      },
      'inv-002': {
        clientId: 'client-2',
        invoiceNumber: 'INV-2025-002',
        issueDate: new Date('2025-04-05'),
        dueDate: new Date('2025-04-20'),
        items: [
          {
            description: 'Consultation',
            quantity: 5,
            unitPrice: 120,
            taxRate: 0
          }
        ],
        status: 'draft'
      },
      'inv-003': {
        clientId: 'client-1',
        invoiceNumber: 'INV-2025-003',
        issueDate: new Date('2025-03-15'),
        dueDate: new Date('2025-03-30'),
        items: [
          {
            description: 'Server Maintenance',
            quantity: 8,
            unitPrice: 95,
            taxRate: 10
          }
        ],
        status: 'paid'
      }
    };

    // Write clients to Firestore
    for (const [id, client] of Object.entries(clients)) {
      await setDoc(doc(db, `users/${userId}/clients/${id}`), client);
      console.log(`✅ Added client: ${client.name}`);
    }

    // Write invoices to Firestore
    for (const [id, invoice] of Object.entries(invoices)) {
      await setDoc(doc(db, `users/${userId}/invoices/${id}`), invoice);
      console.log(`✅ Added invoice: ${invoice.invoiceNumber}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return false;
  }
};