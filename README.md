# FlashFusion Turborepo

A comprehensive monorepo for AI-powered development tools, agent orchestration, and web automation built with Turborepo.

## 🏗️ Repository Structure

```
├── apps/                    # Standalone applications
│   ├── activepieces/       # AI workflow automation platform
│   ├── claude-code/        # Agentic coding tool
│   ├── gpt-researcher/     # Automated research agent
│   ├── uptime-kuma/        # Uptime monitoring
│   ├── oneuptime/          # Observability platform
│   └── templates/          # Project templates
├── packages/               # Shared libraries and utilities
│   ├── flashfusion-data-*/ # Data extraction tools
│   ├── claude-flow/        # Agent orchestration
│   ├── mem0/              # Memory layer
│   ├── letta/             # Stateful agents
│   └── agentops/          # Agent monitoring
├── docs/                  # Documentation and references
└── monorepo-mapping-plan.json # Repository migration plan
```

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build all packages:**
   ```bash
   npm run build
   ```

3. **Start development mode:**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

## 📋 Migration Plan

This repository follows a structured migration plan for organizing 70+ repositories into a cohesive monorepo. See `monorepo-mapping-plan.json` for the complete mapping strategy.

### Key Categories:

- **🤖 AI & Agent Tools**: Core AI workflow automation and agent orchestration
- **🌐 Web Crawling & Data**: Consolidated data extraction tools (FlashFusion Data suite)
- **📊 Monitoring & Infrastructure**: Observability and infrastructure management
- **🧑‍💻 Dev Tools & Templates**: Development templates and UI frameworks
- **🧠 Memory & Research**: AI memory systems and research automation
- **📦 Business/SaaS**: Pattern extraction from business applications

### Migration Methods:

- **git_subtree**: Full integration with history preservation
- **npm_dependency**: Standard package dependencies
- **docker_compose**: Containerized services
- **pattern_extraction**: Documentation of useful patterns
- **archive**: Reference-only repositories

## 🛠️ Development

### Available Scripts

- `npm run build` - Build all packages and apps
- `npm run dev` - Start development servers
- `npm run lint` - Lint all code
- `npm run test` - Run all tests
- `npm run clean` - Clean build artifacts

### Adding New Packages/Apps

1. Create directory in `apps/` or `packages/`
2. Initialize with `package.json`
3. Configure build/dev scripts
4. Update root `package.json` workspaces if needed

## 📚 Documentation

- `apps/README.md` - Applications overview
- `packages/README.md` - Packages overview  
- `docs/references/` - External reference materials
- `docs/patterns/` - Extracted patterns from other projects

## 🤝 Contributing

1. Follow the existing directory structure
2. Use TypeScript for new applications
3. Add appropriate tests
4. Update documentation as needed

## 📄 License

This monorepo contains code from multiple sources. See individual package/app directories for specific license information.