# URL Shortener API

A simple URL shortener API built with ASP.NET Core 8 and SQLite.

## Technologies

- ASP.NET Core 8 Web API
- Entity Framework Core
- SQLite
- Swagger/OpenAPI

## Short URL Storage Design

The database stores the generated short code rather than the complete shortened URL. The full short URL is generated dynamically using the application's current host and the stored short code, keeping the database independent of the deployment environment and allowing domain changes without requiring database updates.

The API documentation is available through Swagger while running in the development environment.

## API Endpoints

### Create Short URL

**POST** `/api/Urls/shorten`

Creates a shortened URL from a provided original URL.

Request:

```json
{
  "originalUrl": "https://example.com"
}
```

Response:

```json
{
  "shortUrl": "https://localhost:5001/abc123"
}
```

---

### Redirect to Original URL

**GET** `/{shortCode}`

Redirects the user to the original URL associated with the provided short code.

Example:

```http
GET /abc123
```

Returns an HTTP redirect response to the original URL.

---

### Get Analytics

**GET** `/api/Urls/analytics/{shortCode}`

Returns analytics information for a shortened URL.

Response:

```json
{
  "originalUrl": "https://example.com",
  "createdAt": "2026-07-14T20:00:00Z",
  "clickCount": 10
}
```