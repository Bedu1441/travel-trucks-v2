# TravelTrucks v2

Frontend application for camper rental service.

---

## Tech Stack

React app with modern tooling.

- React + Vite — fast frontend setup
- Redux Toolkit — global state management
- React Router — client-side routing
- Axios — API requests
- CSS Modules — scoped component styles

---

## Live Demo

Deployed production version.

(add Vercel / Netlify link here)

---

## API

External mock backend.

- Base URL: https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
- GET /campers — campers list
- GET /campers/:id — camper details

---

## Pages & Routes

Main application pages.

- `/` — Home page with banner
- `/catalog` — Campers catalog
- `/catalog/:id` — Camper details
- `/favorites` — Saved campers

---

## Features

Core user functionality.

- Campers list with pagination
- Client-side filtering
- Favorites with persistence
- Camper details page
- Photo gallery
- Reviews display
- Booking form with notification
- Loader and error handling

---

## State Management

Redux-based global state.

- Campers list & pagination
- Filters state
- Favorites persisted in localStorage

---

## Run Locally

Local development setup.

```bash
npm install
npm run dev
Build
Production build.

npm run build
Lint
Code quality check.

npm run lint
```
