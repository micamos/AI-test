# CLAUDE.md

## Project Overview

This is an **AI-powered Project Management (AIPM) system** built for use with Cursor Agent. It combines PMBOK, Lean UX, and Agile methodologies into a unified framework that automates document creation, review, and archival workflows using LLM assistance.

The primary language of this project is **Japanese**. All responses and generated documents should be in Japanese unless otherwise specified.

## Repository Structure

```
AI-test/
├── .gitignore              # Temp files, cache, personal/private content
├── README.md               # Comprehensive system documentation (Japanese)
├── setup_config.sh         # Configuration for workspace setup (repo URLs, directories)
├── setup_workspace_simple.sh  # Main workspace bootstrap script
├── Flow/                   # Draft documents (date-organized: YYYYMM/YYYY-MM-DD/)
├── Stock/                  # Finalized/approved documents
│   └── programs/           # Program-level folders containing projects
├── Archived/               # Completed project archives
├── scripts/                # Utility scripts (cloned from external repo)
└── .cursor/rules/          # LLM rule files (.mdc format)
    └── basic/              # Core PMBOK rule files
```

### Three-Layer Document Architecture

| Layer | Purpose |
|-------|---------|
| **Flow** | Drafts, rough ideas, daily outputs (organized by date) |
| **Stock** | Approved documents, official deliverables |
| **Archived** | Frozen copies of completed projects |

Documents flow: `Flow` → (review + "確定反映して") → `Stock` → (project complete) → `Archived`

## Key Files

- **`setup_workspace_simple.sh`** — Bash script that bootstraps the workspace: creates directory structure, clones rule/script/program repositories, configures VSCode/Marp settings. Run with `./setup_workspace_simple.sh [config_file]`.
- **`setup_config.sh`** — Configuration file defining which repositories to clone (`RULE_REPOS`, `SCRIPT_REPOS`, `PROGRAM_REPOS`) and base directory structure (`BASE_DIRS`). Supports `AUTO_APPROVE` and `AUTO_CLONE` flags.
- **`README.md`** — Full system documentation covering all phases, trigger words, and usage examples.

## Development Conventions

### Shell Scripts
- Use `set -e` for error handling
- Use colored log functions (`log_info`, `log_success`, `log_warning`, `log_error`)
- Avoid subshell command substitution in complex commands — break into separate steps
- Avoid backticks; use explicit variable assignment instead
- Quote file paths that may contain spaces or Japanese characters

### Document Generation
- Draft files use the `draft_` prefix (e.g., `draft_project_charter.md`)
- All drafts go to `Flow/YYYYMM/YYYY-MM-DD/` directories
- Finalized documents are moved to `Stock/programs/<PROGRAM>/projects/<PROJECT>/documents/<phase>/`
- YAML format is used for backlogs (`backlog.yaml`) and routine tasks (`routines.yml`)

### PMBOK Phases and Document Structure
Projects follow six phases, each with corresponding document directories:
1. `1_initiating/` — Project charters, stakeholder analysis
2. `2_discovery/` and `2_research/` — Personas, journey maps, market research
3. `3_planning/` — WBS, PRD, scope statements, roadmaps
4. `4_executing/` — Sprint goals, daily tasks, meeting minutes
5. `5_monitoring/` — Change requests, sprint reviews
6. `6_closing/` — Lessons learned, transition documents

## Build & Setup Commands

```bash
# Initialize workspace (interactive)
./setup_workspace_simple.sh setup_config.sh

# Initialize workspace with custom root directory
./setup_workspace_simple.sh /path/to/workspace setup_config.sh
```

There are no build, test, or lint commands — this is a document management and workspace scaffolding project, not a software application.

## Important Notes for AI Assistants

1. **Language**: Always respond in Japanese (日本語) when interacting within this system's context
2. **File generation**: Create outputs as files using edit/write tools rather than inline text
3. **Shell safety**: Never use `$(command)` subshells or backticks in complex commands — break into separate sequential steps
4. **Path variables**: Rule files use `{{dirs.*}}` and `{{patterns.*}}` template variables for paths — respect these conventions
5. **Trigger words**: The system uses Japanese trigger words (e.g., "プロジェクト憲章", "確定反映して") to invoke specific document templates via `.cursor/rules/` files
6. **Git management**: This repo manages workspace configuration only; the actual rule files, scripts, and program content are cloned from separate repositories
