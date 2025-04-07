export interface Client {
    id?: string;
    name: string;
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    status: 'active' | 'inactive' | 'prospect';
    notes?: string;
    tags?: string[];
  }