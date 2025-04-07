import { InvoiceItem } from '../types/invoice';

export const calculateInvoiceTotals = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0);
    
    const taxTotal = items.reduce((sum, item) =>
      sum + (item.quantity * item.unitPrice * (item.taxRate / 100)), 0);
  
    return {
      subtotal,
      taxTotal,
      total: subtotal + taxTotal
    };
  };