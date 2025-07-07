
# Deployment Guide

## Company Customization

1. **Configure Company Settings**
   - Copy `config.template.js` to `src/config/company.ts`
   - Update company name, logo, colors, and search options
   - Add your company logo to the `public` folder

2. **Customize Colors**
   - Update the `colors` object in the config
   - Colors automatically apply to the interface while preserving branding

3. **Configure API Endpoints**
   - Update webhook URLs in the config
   - These will receive search requests from the chat interface

## Docker Deployment

1. **Build the image**
   ```bash
   docker build -t your-company-chat .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 your-company-chat
   ```

## GitHub Actions Auto-Deployment

1. **Set up secrets in GitHub**
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password

2. **Configure your VPS**
   - Set up a script to pull and restart containers when new images are built
   - Example watchtower configuration for auto-updates:
   ```bash
   docker run -d \
     --name watchtower \
     -v /var/run/docker.sock:/var/run/docker.sock \
     containrrr/watchtower \
     --cleanup \
     --interval 30
   ```

## Environment Variables

The app stores per-company configurations in the config file rather than environment variables for easier customization.

## Multi-Company Support

Each deployment should have its own:
- Company configuration file
- Logo assets
- Docker image
- Domain/subdomain

## Mobile Optimization

The app automatically adapts to mobile devices with:
- Responsive header navigation
- Collapsible sidebar on mobile
- Touch-friendly interface
- Optimized chat input area
