'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function InvoiceGeneratorPage() {
  const [items, setItems] = useState([
    { desc: 'Web Development', qty: 1, price: 500 },
    { desc: 'UI Design', qty: 1, price: 300 },
  ]);

  const addItem = () => {
    setItems([...items, { desc: '', qty: 1, price: 0 }]);
  };

  const updateItem = (idx: number, key: string, value: any) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [key]: value };
    setItems(newItems);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const invoiceText = `INVOICE\n\nItems:\n${items.map((i) => `${i.desc} x${i.qty} = $${(i.qty * i.price).toFixed(2)}`).join('\n')}\n\nSubtotal: $${subtotal.toFixed(2)}\nTax (10%): $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}`;

  return (
    <ToolTemplate
      title="Invoice Generator"
      description="Create simple invoices"
      icon="📋"
      onReset={() =>
        setItems([
          { desc: 'Web Development', qty: 1, price: 500 },
          { desc: 'UI Design', qty: 1, price: 300 },
        ])
      }
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2">
          <ToolCard title="Line Items">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 p-3 bg-gray-100 dark:bg-slate-900 rounded">
                  <input
                    type="text"
                    value={item.desc}
                    onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                    placeholder="Description"
                    className="col-span-5 px-2 py-1 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 text-sm"
                  />
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => updateItem(idx, 'qty', parseInt(e.target.value))}
                    className="col-span-2 px-2 py-1 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 text-sm"
                    min="1"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(idx, 'price', parseFloat(e.target.value))}
                    placeholder="Price"
                    className="col-span-2 px-2 py-1 border border-gray-300 dark:border-slate-700 rounded bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 text-sm"
                  />
                  <button
                    onClick={() => removeItem(idx)}
                    className="col-span-3 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              + Add Item
            </button>
          </ToolCard>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <ToolCard title="Summary">
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-gray-300 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-300 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Total</span>
                <span className="font-mono font-bold text-lg text-blue-600 dark:text-blue-400">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </ToolCard>

          <ToolCard>
            <div className="relative">
              <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-3 font-mono text-xs text-gray-900 dark:text-gray-100 break-all whitespace-pre-wrap">
                {invoiceText}
              </div>
              <button
                onClick={() => copyToClipboard(invoiceText)}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
              >
                <Copy size={16} />
              </button>
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
