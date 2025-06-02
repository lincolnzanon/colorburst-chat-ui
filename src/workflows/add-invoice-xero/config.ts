
export const addInvoiceXeroWorkflow = {
  id: 'add-invoice-xero',
  name: 'Add Invoice to Xero',
  description: 'Add a new invoice to your Xero accounting system',
  fields: [
    {
      name: 'invoiceType',
      label: 'Invoice Type',
      type: 'select' as const,
      options: [
        { value: 'sales', label: 'Sales Invoice' },
        { value: 'purchase', label: 'Purchase Invoice' },
        { value: 'credit', label: 'Credit Note' }
      ]
    },
    {
      name: 'supplierName',
      label: 'Supplier Name',
      type: 'select' as const,
      options: [
        { value: 'acme-corp', label: 'Acme Corporation' },
        { value: 'tech-solutions', label: 'Tech Solutions Ltd' },
        { value: 'office-supplies', label: 'Office Supplies Co' }
      ]
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'text' as const
    }
  ]
};
