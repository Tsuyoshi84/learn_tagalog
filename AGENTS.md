# AGENTS.md

This document provides AI agents with comprehensive information about the Learn Tagalog repository to help them understand the codebase, assist with development, and provide accurate guidance.

## Project Overview

**Learn Tagalog** is a web application designed to help users learn the Tagalog language through interactive quizzes and memory-based learning techniques. The application uses a spaced repetition system to optimize learning retention.

### Key Features

- **Translation Challenge**: Interactive text translation quizzes with English-to-Tagalog exercises
- **Match Words**: Card-based word matching game for vocabulary practice
- **Memory Level System**: Spaced repetition algorithm that adjusts review intervals based on user performance
- **Multi-level Difficulty**: 5 difficulty levels (1-5) for both texts and words
- **User Authentication**: Google OAuth integration via Supabase
- **Progress Tracking**: Individual user progress tracking with memory levels
- **Admin Interface**: Text management system for content administration

## Technology Stack

### Frontend

- **Framework**: Nuxt 4 with Vue 3
- **Language**: TypeScript
- **Styling**: CSS with logical properties and modern color functions (oklch)
- **State Management**: Pinia
- **Icons**: Nuxt Icon with Fluent UI icons
- **Fonts**: Google Fonts (Comfortaa, Roboto, Gabarito)

### Backend

- **Runtime**: Bun
- **Database**: PostgreSQL with Supabase
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth with Google OAuth
- **API**: Nuxt server API routes

### Development Tools

- **Linting**: ESLint, Biome, Oxlint
- **Formatting**: Biome, Prettier
- **Testing**: Vitest with Happy DOM
- **Git Hooks**: Lefthook
- **Type Checking**: Vue TSC
- **Code Quality**: Knip for unused code detection

## Architecture

### Directory Structure

```
app/
├── components/          # Reusable Vue components
├── composables/         # Vue composables for shared logic
├── layouts/            # Layout components
├── pages/              # Page components (routes)
├── stores/             # Pinia stores
├── utils/              # Utility functions
└── assets/             # Static assets

server/
├── api/                # API endpoints
├── db/                 # Database schema and queries
└── utils/              # Server utility functions

shared/
└── utils/              # Shared utility functions
```

### Database Schema

The application uses three main tables:

1. **`texts`**: Stores English-Tagalog text pairs for translation quizzes
   - `id`, `en` (English), `tl` (Tagalog), `level` (1-5)

2. **`words`**: Stores individual word pairs for matching games
   - `id`, `en` (English), `tl` (Tagalog), `category` (verb/adjective/noun), `level` (1-5)

3. **`user_progress`**: Tracks user learning progress
   - `id`, `textId`, `userId`, `memoryLevel`, `lastAnsweredAt`, `nextDueDate`

## Core Learning System

### Memory Level Algorithm

The application implements a spaced repetition system with 8 memory levels:

- **Level 1**: 1 day interval
- **Level 2**: 2 days interval
- **Level 3**: 5 days interval
- **Level 4**: 11 days interval
- **Level 5**: 24 days interval
- **Level 6**: ~2 months interval
- **Level 7**: ~4 months interval
- **Level 8**: ~8 months interval

When a user answers correctly, their memory level increases. When they answer incorrectly, it decreases. The system ensures levels stay between 1-8.

### Quiz Types

1. **Translation Challenge** (`/quiz`):
   - Shows English text, user reveals Tagalog translation
   - User indicates if they remembered correctly
   - Uses `useTextQuiz` composable for state management

2. **Match Words** (`/match-words`):
   - Interactive card matching game
   - 5 word pairs per session
   - Uses `useMatchWords` composable for game logic

## API Endpoints

### `/api/next-quiz` (POST)

- Returns the next quiz text for a user based on their progress
- Considers memory levels and due dates
- Returns `hasQuiz: boolean` and quiz data

### `/api/answer-text` (POST)

- Processes user's answer to a quiz
- Updates memory level and next due date
- Body: `{ textId: string, remembered: boolean }`

### `/api/words` (GET)

- Returns random words for matching game
- Query: `{ level: number }`
- Returns 5 word pairs

## Key Components

### Core Components

- **`LevelSelectorModal`**: Difficulty level selection
- **`MemoryLevelMeter`**: Visual progress indicator
- **`WordBlock`**: Individual word display for matching
- **`AppButton`**: Reusable button component
- **`BaseModal`**: Modal wrapper component

### Composables

- **`useTextQuiz`**: Manages translation quiz state and API calls
- **`useMatchWords`**: Handles word matching game logic
- **`useQueryParamsWithSchema`**: Validates URL query parameters
- **`useTextSearch`**: Text search functionality

## Development Guidelines

### Code Quality

- Use TypeScript with strict type checking
- Follow Vue 3 Composition API patterns
- Use logical CSS properties (e.g., `inline-size` instead of `width`)
- Implement proper error handling and validation
- Write tests for composables and utilities

### File Organization

- Place page components in `app/pages/`
- Put reusable components in `app/components/`
- Store shared logic in `app/composables/`
- Keep utility functions in `app/utils/` or `shared/utils/`
- API endpoints go in `server/api/`

### Testing

- Unit tests use Vitest with Happy DOM
- Test files should be colocated with source files
- Test file naming: `*.spec.ts`
- Focus on testing composables and utility functions

## Environment Setup

### Prerequisites

- Bun 1.0.35+
- PostgreSQL database (via Supabase)
- Google OAuth credentials

### Development Commands

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Run tests
bun test

# Format code
bun format

# Lint code
bun lint

# Type check
bun typecheck

# Database migration
npx drizzle-kit generate:pg
npx drizzle-kit migrate
```

## Common Patterns

### Query Parameter Validation

```typescript
const queryParamsSchema = object({
  level: pipe(string(), transform(Number.parseInt), integer(), minValue(1), maxValue(5))
})
const parsedQueryParams = useQueryParamsWithSchema(queryParamsSchema)
```

### API Response Handling

```typescript
const { data, refresh } = useFetch('/api/endpoint', {
  method: 'POST',
  body: { /* request data */ }
})
```

### Memory Level Updates

```typescript
const { nextMemoryLevel, interval } = getNextMemoryLevel({
  currentMemoryLevel,
  remembered
})
```

## Troubleshooting

### Common Issues

1. **Database connection**: Ensure Supabase credentials are properly configured
2. **Authentication**: Check Google OAuth setup and redirect URLs
3. **Type errors**: Run `bun typecheck` to identify TypeScript issues
4. **Linting**: Use `bun lint:fix` to automatically fix common issues

### Debug Tools

- Nuxt DevTools for development debugging
- Browser DevTools for client-side issues
- Supabase Dashboard for database inspection
- Console logs for API debugging

## Contributing

When working on this codebase:

1. Follow the established patterns and conventions
2. Write tests for new functionality
3. Ensure all linting and type checks pass
4. Update documentation as needed
5. Use meaningful commit messages

This application prioritizes user experience, learning effectiveness, and code maintainability. The spaced repetition system is designed to optimize long-term retention of Tagalog language skills.
