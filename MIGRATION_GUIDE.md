# FlashFusion Migration Guide

This guide provides step-by-step instructions for migrating repositories into the FlashFusion Turborepo based on the mapping plan.

## Migration Methods

### 1. Git Subtree Integration

For core packages and applications that will be actively developed:

```bash
# Example: Migrating activepieces
git subtree add --prefix=apps/activepieces https://github.com/activepieces/activepieces.git main --squash

# Example: Migrating a package
git subtree add --prefix=packages/mem0 https://github.com/mem0ai/mem0.git main --squash
```

### 2. NPM Dependencies

For well-maintained public packages:

```bash
# Add to package.json
npm install heroui @heroui/react zod redux-toolkit

# Or for specific workspace
cd apps/my-app
npm install heroui @heroui/react
```

### 3. Python Dependencies

For Python packages:

```bash
# Add to requirements.txt or pyproject.toml
pip install mem0ai letta agentops sqlfluff
```

### 4. Docker Compose Services

For services that run as containers:

```yaml
# docker-compose.yml
version: '3.8'
services:
  pmm-server:
    image: percona/pmm-server:latest
    ports:
      - "8080:80"
    volumes:
      - pmm-data:/srv
      
  yt-dlp:
    image: ghcr.io/yt-dlp/yt-dlp:latest
    volumes:
      - ./downloads:/downloads
```

## Priority-Based Migration

### Phase 1: Core Infrastructure (High Priority)

1. **AI & Agent Tools**
   ```bash
   git subtree add --prefix=apps/activepieces https://github.com/activepieces/activepieces.git main --squash
   git subtree add --prefix=apps/claude-code https://github.com/claude-code/claude-code.git main --squash
   git subtree add --prefix=packages/autogen https://github.com/microsoft/autogen.git main --squash
   git subtree add --prefix=packages/langgraph https://github.com/langchain-ai/langgraph.git main --squash
   ```

2. **Data Extraction Suite**
   ```bash
   git subtree add --prefix=packages/flashfusion-data-core https://github.com/mendableai/firecrawl.git main --squash
   git subtree add --prefix=packages/flashfusion-data-mcp https://github.com/firecrawl/mcp-server.git main --squash
   ```

3. **Memory & Research**
   ```bash
   git subtree add --prefix=packages/mem0 https://github.com/mem0ai/mem0.git main --squash
   git subtree add --prefix=packages/letta https://github.com/letta-ai/letta.git main --squash
   git subtree add --prefix=apps/gpt-researcher https://github.com/assafelovic/gpt-researcher.git main --squash
   ```

4. **Monitoring Suite**
   ```bash
   git subtree add --prefix=apps/uptime-kuma https://github.com/louislam/uptime-kuma.git master --squash
   git subtree add --prefix=apps/oneuptime https://github.com/OneUptime/oneuptime.git master --squash
   ```

### Phase 2: Development Tools (Medium Priority)

1. **Templates**
   ```bash
   git subtree add --prefix=apps/templates/vite-react-heroui https://github.com/heroui-inc/vite-template.git main --squash
   git subtree add --prefix=apps/templates/next-app https://github.com/vercel/next.js.git canary --squash examples/create-next-app
   ```

2. **Utilities**
   ```bash
   git subtree add --prefix=packages/pipedream-utils https://github.com/PipedreamHQ/pipedream.git master --squash
   ```

### Phase 3: References & Patterns (Low Priority)

1. **Reference Materials**
   ```bash
   git subtree add --prefix=docs/references/awesome-claude-code https://github.com/awesome-claude/awesome-claude-code.git main --squash
   git subtree add --prefix=docs/references/awesome-mcp-servers https://github.com/awesome-mcp/awesome-mcp-servers.git main --squash
   ```

## Post-Migration Steps

### 1. Update Package Configurations

After migrating packages, update their `package.json` files:

```json
{
  "name": "@flashfusion/package-name",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "exports": {
    ".": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint src/",
    "test": "jest"
  }
}
```

### 2. Configure Turborepo Tasks

Update `turbo.json` for new packages:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    }
  }
}
```

### 3. Set Up Internal Dependencies

Link packages together in apps:

```json
{
  "dependencies": {
    "@flashfusion/data-core": "*",
    "@flashfusion/claude-flow": "*",
    "@flashfusion/mem0": "*"
  }
}
```

### 4. Update Documentation

- Add README.md for each migrated package/app
- Update root documentation
- Add examples and usage guides

## Validation Checklist

After migration, verify:

- [ ] All packages build successfully (`npm run build`)
- [ ] Apps start without errors (`npm run dev`)
- [ ] Dependencies resolve correctly
- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation is up to date
- [ ] Turborepo cache is working

## Troubleshooting

### Common Issues

1. **Build failures**: Check package.json scripts and dependencies
2. **Import errors**: Verify package exports and internal dependencies
3. **Cache issues**: Run `npx turbo clean` to clear cache
4. **Type errors**: Ensure TypeScript configurations are compatible

### Rolling Back

If migration fails, remove the subtree:

```bash
git rm -r apps/problematic-app
git commit -m "Remove failed migration"
```

## Maintenance

### Updating Subtrees

To pull updates from upstream repositories:

```bash
git subtree pull --prefix=apps/activepieces https://github.com/activepieces/activepieces.git main --squash
```

### Managing Dependencies

Regular dependency updates:

```bash
npx npm-check-updates -u  # Update package.json
npm install                # Install updates
npm run test              # Verify updates work
```