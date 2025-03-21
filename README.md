# Learn Tagalog

A web application for learning Tagalog language.

## Setup

1. Clone the repository

```sh
git clone https://github.com/your-username/learn-tagalog.git
cd learn-tagalog
```

2. Install dependencies

```sh
bun install
```

3. Set up environment variables

```sh
cp .env.example .env
```

Edit `.env` with your database credentials and other configuration.

## Development

Run the following command to launch the development server:

```sh
bun dev
```

The application will be available at `http://localhost:3000`.

## Database

### Migration

The database schema is defined in `server/db/schema.ts`.
After changing the schema, run the following command to generate the migration:

```sh
npx drizzle-kit generate:pg
```

To apply migrations:

```sh
npx drizzle-kit migrate
```

## Testing

Run tests with:

```sh
bun run test
```

## Build

Build for production:

```sh
bun run build
```

### Git Hooks with Lefthook

This project uses [Lefthook](https://github.com/evilmartians/lefthook) to manage Git hooks. Lefthook automatically runs code quality checks before commits and pushes.

The hooks are installed automatically when you run `bun install` (via the postinstall script).

#### Pre-commit hooks

- Biome format: Automatically formats staged files
- Biome lint: Checks and fixes linting issues in staged files

### Manual Commands

```bash
# Format code
bun format

# Check formatting
bun format:check

# Lint code
bun lint

# Fix linting issues
bun lint:fix

# Run Biome linter
bun lint:biome

# Fix Biome linting issues
bun lint:biome:fix

# Run tests
bun test

# Type check
bun typecheck
```
