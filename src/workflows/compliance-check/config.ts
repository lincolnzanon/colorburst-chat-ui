
export const complianceCheckWorkflow = {
  id: 'compliance-check',
  name: 'Compliance Check',
  description: 'Verify compliance with regulations and policies',
  fields: [
    {
      name: 'complianceType',
      label: 'Compliance Type',
      type: 'select' as const,
      options: [
        { value: 'tax', label: 'Tax Compliance' },
        { value: 'regulatory', label: 'Regulatory Compliance' },
        { value: 'internal', label: 'Internal Policy' }
      ]
    },
    {
      name: 'jurisdiction',
      label: 'Jurisdiction',
      type: 'select' as const,
      options: [
        { value: 'federal', label: 'Federal' },
        { value: 'state', label: 'State' },
        { value: 'local', label: 'Local' }
      ]
    }
  ]
};
