
# Capital Consult AI Assistant

A configurable AI assistant platform built for consulting companies.

## Project info

**URL**: https://lovable.dev/projects/a67f07d1-065f-47d8-9881-8933b06e9435

**GitHub Repository**: https://github.com/capital-consult/ai-assistant

## Company Configuration

This application is designed to be easily customizable for different companies. All company-specific settings can be found in `src/config/company.ts`:

- Company name, logo, and branding colors
- User settings and greeting preferences  
- Search options and client lists
- Custom workflows and integrations

## Workflow System

Workflows are modular and stored in the `src/workflows/` directory. Each workflow has its own folder containing:

- `config.ts` - Workflow definition with fields and options
- Future: Custom logic, integrations, and UI components

To add a new workflow:
1. Create a new folder in `src/workflows/`
2. Add a `config.ts` file with the workflow definition
3. Export the workflow in `src/workflows/index.ts`

## Features

- **Chat Interface**: AI-powered conversational interface with company-specific greetings
- **Workflow Management**: Structured processes for common business tasks
- **Reminders System**: Integration with external systems for task management
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Modular Architecture**: Easy to customize and extend for different companies

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a67f07d1-065f-47d8-9881-8933b06e9435) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/capital-consult/ai-assistant.git

# Step 2: Navigate to the project directory.
cd ai-assistant

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a67f07d1-065f-47d8-9881-8933b06e9435) and click on Share → Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
