<p align="center">
  <img src="client/public/kerf.svg" alt="Kerf logo" width="96" />
</p>

<h1 align="center">Kerf</h1>

<p align="center">
  A full-stack URL shortener: an ASP.NET Core 8 Web API with a React + TypeScript frontend.
</p>

> **kerf** (noun): the narrow cut made by a saw blade. Kerf cuts long links down to size.

## Features

- Shorten any http, https, or ftp URL into a compact link
- Redirect from a short link to the original URL, tracking each click
- View analytics for a short link (original URL, creation date, click count)
- One-click copy of the short link, with loading and error states in the UI
- Validation errors from the API are shown directly in the frontend

## Tech Stack

**Backend**
- ASP.NET Core 8 Web API
- Entity Framework Core with SQLite
- Swagger / OpenAPI

**Frontend**
- React 19 + TypeScript
- Vite
- Lucide icons

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) 20.19+ or 22.12+

### 1. Run the API

```bash
cd URLShortener
dotnet run --launch-profile http
```

The API runs at `http://localhost:5153`, with Swagger UI at `http://localhost:5153/swagger`.
The SQLite database is created automatically on startup by applying any pending EF Core migrations.

### 2. Run the frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

> **Note:** Start the API with the `http` launch profile. In development, the Vite dev server proxies
> `/api` requests to `http://localhost:5153`. Under the `https` profile, the API's HTTPS redirection
> sends those proxied requests to a different origin, and the browser blocks them.

## Project Structure

```
URLShortener/
├── URLShortener/          # ASP.NET Core Web API
│   ├── Controllers/       # API endpoints and the short-link redirect
│   ├── Data/              # EF Core DbContext
│   ├── Helpers/           # Base62 short-code encoder
│   ├── Migrations/        # EF Core migrations
│   ├── Models/            # Entity and request/response DTOs
│   └── Services/          # URL shortening business logic
└── client/                # React + TypeScript frontend (Vite)
    ├── public/            # Static assets (logo)
    └── src/               # Components, styles, and API client
```

## Design Notes

### Short code generation

Each new URL is saved to the database first, and its auto-incremented ID is then Base62-encoded
(`0-9`, `A-Z`, `a-z`) to produce the short code. Because every ID is unique, every code is unique,
with no collision checks or retries needed, and codes stay short: IDs up to 238,327 fit in three characters.

The trade-off is that codes are sequential and therefore guessable. That's acceptable for a public
shortener, but a production system holding private links would want non-sequential codes.

### Short URL storage

The database stores only the short code, not the complete short URL. The full URL is built
dynamically from the request's current host and the stored code. This keeps the database
independent of the deployment environment and allows domain changes without database updates.

### Frontend API access

The frontend calls the API using relative paths (`/api/...`). During development, Vite's dev-server
proxy forwards these to the API, so no CORS configuration is needed locally. The proxy uses
`changeOrigin` so the API sees its own host, which keeps generated short URLs pointing at the
API rather than the frontend.

## API Endpoints

API documentation is also available through Swagger while running in the development environment.

### Create Short URL

**POST** `/api/Urls/shorten`

Request:

```json
{
  "originalUrl": "https://example.com"
}
```

Response `200 OK`:

```json
{
  "shortUrl": "http://localhost:5153/aZ3"
}
```

Invalid URLs return `400 Bad Request` with ASP.NET Core validation details:

```json
{
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "OriginalUrl": ["The OriginalUrl field is not a valid fully-qualified http, https, or ftp URL."]
  }
}
```

---

### Redirect to Original URL

**GET** `/{shortCode}`

Redirects to the original URL associated with the short code and increments its click count.
Returns `404 Not Found` if the code doesn't exist.

```http
GET /aZ3
```

---

### Get Analytics

**GET** `/api/Urls/analytics/{shortCode}`

Response `200 OK`:

```json
{
  "originalUrl": "https://example.com",
  "createdAt": "2026-07-14T20:00:00Z",
  "clickCount": 10
}
```

Returns `404 Not Found` if the code doesn't exist.

## Roadmap

- [x] Shorten URLs from the React frontend
- [x] Loading/error states and copy-to-clipboard
- [ ] Analytics lookup page in the frontend
- [ ] Recent links list saved in the browser
- [ ] Deployment with a production CORS policy
