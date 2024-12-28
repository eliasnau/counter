# Counter Click

A real-time multiplayer counter game built with Next.js and Appwrite.

## Features

- Shared counter between all players
- Real-time updates using Appwrite Realtime
- Cooldown system (500ms between actions)
- Anonymous sessions
- Rate limiting and abuse prevention

## Tech Stack

- Next.js 14 with TypeScript
- Appwrite Cloud
- TailwindCSS
- Framer Motion

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create an Appwrite project and set up:
   - Database with a collection for the counter
   - Cloud functions for increment and get operations
   - API keys with appropriate permissions

4. Create a `.env.local` file:
```env
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

### Frontend
```typescript
src/
  ├── app/                    # Next.js app router
  ├── components/             # React components
  │   ├── Counter.tsx        # Main counter logic
  │   ├── ActionGrid.tsx     # Button grid
  │   └── CooldownBar.tsx    # Cooldown indicator
  ├── lib/
  │   └── appwrite.ts        # Appwrite client config
  └── styles/                # Global styles
```

### Backend
```typescript
appwrite/
  └── functions/
      ├── increment-counter/  # Counter increment logic
      └── get-counter/       # Counter fetch logic
```

## Dependencies

```json
{
  "dependencies": {
    "appwrite": "^16.1.0",
    "framer-motion": "^11.0.3",
    "next": "15.1.3",
    "react": "^19.0.0"
  }
}
```

## License

MIT

## Contact

Email: contact@eliasnau.dev