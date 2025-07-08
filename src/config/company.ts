
export const companyConfig = {
  name: "Capital Consult",
  logo: "/lovable-uploads/b896dd65-439e-45a9-b30b-3cd296e40436.png",
  colors: {
    primary: "#5B9BD5",
    primaryDark: "#2E5B8A", 
    secondary: "#F4D03F",
    light: "#A8CCE8"
  },
  greeting: {
    userName: "Tony"
  },
  searchOptions: [
    { value: 'client', label: 'my client' },
    { value: 'company', label: 'my company' },
    { value: 'financials', label: 'my financials' },
    { value: 'crm', label: 'my crm' },
  ],
  clients: [
    { value: 'acme-corp', label: 'Acme Corporation' },
    { value: 'tech-solutions', label: 'Tech Solutions Ltd' },
    { value: 'global-industries', label: 'Global Industries' },
    { value: 'startup-inc', label: 'Startup Inc' },
  ],
  webhooks: {
    client: 'https://api.example.com/webhooks/client-search',
    company: 'https://api.example.com/webhooks/company-search', 
    financials: 'https://api.example.com/webhooks/financial-search',
    crm: 'https://api.example.com/webhooks/crm-search'
  }
};
