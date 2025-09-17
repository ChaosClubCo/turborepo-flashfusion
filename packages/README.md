# Packages Directory

This directory contains shared libraries, utilities, and reusable components used across the FlashFusion ecosystem.

## Structure

- `flashfusion-data-core/` - Core data extraction library (based on Firecrawl)
- `flashfusion-data-mcp/` - MCP integration for data extraction
- `flashfusion-data-scraper/` - Enhanced scraping functionality
- `claude-flow/` - Orchestration framework for Claude agents
- `agentops/` - Agent monitoring, cost tracking, benchmarking
- `autogen/` - Multi-agent conversation framework
- `langgraph/` - Stateful agent orchestration with LangChain
- `mem0/` - Universal memory layer for AI agents
- `letta/` - Stateful agents framework
- `pipedream-utils/` - API connection utilities

## Usage

Packages can be imported by apps and other packages:

```json
{
  "dependencies": {
    "@flashfusion/data-core": "*",
    "@flashfusion/claude-flow": "*"
  }
}
```

## Development

Build all packages:

```bash
npm run build
```

Build specific package:

```bash
cd packages/[package-name]
npm run build
```