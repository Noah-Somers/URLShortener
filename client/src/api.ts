export type ShortenResponse = {
    shortUrl: string
}

export async function shortenUrl(originalUrl: string): Promise<ShortenResponse> {
    const response = await fetch('/api/urls/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl }),
    })

    return response.json()
}