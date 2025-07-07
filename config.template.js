
// Company Configuration Template
// Copy this file to src/config/company.ts and customize for your deployment

export const companyConfig = {
  name: "Your Company Name",
  logo: "/path/to/your/logo.png", // Place logo in public folder
  colors: {
    primary: "#5B9BD5",      // Main brand color
    primaryDark: "#2E5B8A",  // Darker variant
    secondary: "#F4D03F",    // Secondary color
    light: "#A8CCE8"         // Light variant
  },
  greeting: {
    userName: "User" // Default greeting name
  },
  searchOptions: [
    { value: 'client', label: 'my client' },
    { value: 'company', label: 'my company' },
    { value: 'financials', label: 'my financials' },
    { value: 'crm', label: 'my crm' },
    // Add more search options as needed
  ],
  clients: [
    { value: 'client-1', label: 'Client 1' },
    { value: 'client-2', label: 'Client 2' },
    // Add your company's clients
  ],
  // API endpoints for webhooks
  webhooks: {
    client: 'https://your-api.com/webhooks/client-search',
    company: 'https://your-api.com/webhooks/company-search', 
    financials: 'https://your-api.com/webhooks/financial-search',
    crm: 'https://your-api.com/webhooks/crm-search'
  }
};
