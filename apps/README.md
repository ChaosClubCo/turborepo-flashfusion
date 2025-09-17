# Apps Directory

This directory contains standalone applications and services that are part of the FlashFusion ecosystem.

## Structure

- `activepieces/` - AI workflow automation platform with ~400 MCP servers
- `claude-code/` - Agentic coding tool in terminal  
- `gpt-researcher/` - Automated research agent
- `checkmate/` - Server monitoring and visualization
- `uptime-kuma/` - Uptime monitoring service
- `oneuptime/` - Open-source observability platform
- `templates/` - Project templates for various frameworks
  - `vite-flashfusion/` - Vite template for FlashFusion projects
  - `vite-react-heroui/` - Vite + React + HeroUI template
  - `next-pages/` - Next.js Pages Router template
  - `next-app/` - Next.js App Router template

## Development

Each app can be developed independently using:

```bash
cd apps/[app-name]
npm run dev
```

Or run all apps from the root:

```bash
npm run dev
```