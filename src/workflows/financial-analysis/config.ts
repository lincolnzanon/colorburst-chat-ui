
export const financialAnalysisWorkflow = {
  id: 'financial-analysis',
  name: 'Financial Analysis',
  description: 'Generate comprehensive financial analysis reports',
  fields: [
    {
      name: 'analysisType',
      label: 'Analysis Type',
      type: 'select' as const,
      options: [
        { value: 'profit-loss', label: 'Profit & Loss' },
        { value: 'cash-flow', label: 'Cash Flow' },
        { value: 'balance-sheet', label: 'Balance Sheet' }
      ]
    },
    {
      name: 'period',
      label: 'Period',
      type: 'select' as const,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annual', label: 'Annual' }
      ]
    }
  ]
};
