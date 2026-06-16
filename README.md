# VeriLend Platform

VeriLend is a P2P lending platform for the South African market.

## Project Structure

- `backend/`: Fastify Node.js server with Knex.js for migrations.
- `frontend/`: React + TypeScript + Vite + Tailwind CSS.
- `legacy/`: Legacy files from previous iterations.

## Prerequisites

- Node.js (v18+)
- PostgreSQL
- Redis

## Setup

### Backend

1. `cd backend`
2. `npm install`
3. Create a `.env` file based on `.env.example`.
4. `npx knex migrate:latest`
5. `npm start` (or `node index.js` for now)

### Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`
