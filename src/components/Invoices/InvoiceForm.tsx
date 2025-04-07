import React, { useState, FormEvent } from 'react';
import { InvoiceItem } from '../../types/invoice';
import { calculateInvoiceTotals } from '../../utils/invoiceCalculator';

interface InvoiceFormProps {
  onSubmit: (items: InvoiceItem[]) => void; // Define the type for the onSubmit prop
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit }) => {
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 0,
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
      },
    ]);
  };

  const { subtotal, taxTotal, total } = calculateInvoiceTotals(items);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(items); // Pass the items to the onSubmit handler
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]:
        field === 'quantity' || field === 'unitPrice' || field === 'taxRate'
          ? parseFloat(value) || 0
          : value,
    };
    setItems(newItems);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Item list rendering */}
      {items.map((item, index) => (
        <div key={index} className="invoice-item">
          <input
            type="text"
            value={item.description}
            onChange={(e) => updateItem(index, 'description', e.target.value)}
          />
          {/* Other item fields */}
        </div>
      ))}

      <button type="button" onClick={handleAddItem}>
        Add Item
      </button>

      <div className="totals">
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        <div>Tax: ${taxTotal.toFixed(2)}</div>
        <div>Total: ${total.toFixed(2)}</div>
      </div>

      <button type="submit">Save Invoice</button>
    </form>
  );
};

export default InvoiceForm;