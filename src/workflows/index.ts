
import { addInvoiceXeroWorkflow } from './add-invoice-xero/config';
import { financialAnalysisWorkflow } from './financial-analysis/config';
import { riskAssessmentWorkflow } from './risk-assessment/config';
import { complianceCheckWorkflow } from './compliance-check/config';

export type WorkflowField = {
  name: string;
  label: string;
  type: 'select' | 'text';
  options?: Array<{ value: string; label: string }>;
};

export type WorkflowConfig = {
  id: string;
  name: string;
  description: string;
  fields: WorkflowField[];
};

export const workflows: WorkflowConfig[] = [
  addInvoiceXeroWorkflow,
  financialAnalysisWorkflow,
  riskAssessmentWorkflow,
  complianceCheckWorkflow
];

export const getWorkflowById = (id: string): WorkflowConfig | undefined => {
  return workflows.find(workflow => workflow.id === id);
};
