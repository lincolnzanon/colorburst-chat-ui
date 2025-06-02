
export const riskAssessmentWorkflow = {
  id: 'risk-assessment',
  name: 'Risk Assessment',
  description: 'Evaluate and analyze business risks',
  fields: [
    {
      name: 'riskCategory',
      label: 'Risk Category',
      type: 'select' as const,
      options: [
        { value: 'financial', label: 'Financial Risk' },
        { value: 'operational', label: 'Operational Risk' },
        { value: 'compliance', label: 'Compliance Risk' }
      ]
    },
    {
      name: 'severity',
      label: 'Severity Level',
      type: 'select' as const,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'critical', label: 'Critical' }
      ]
    }
  ]
};
