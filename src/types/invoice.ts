export interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
  }
  
  export interface Invoice {
    id?: string;
    clientId: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
    items: InvoiceItem[];
    status: 'draft' | 'sent' | 'paid' | 'overdue';
    notes?: string;
  }