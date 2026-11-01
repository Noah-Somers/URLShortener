import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { shortenUrl } from './api'

function App() {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState<string | null>(null)

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const result = await shortenUrl(url)
        setShortUrl(result.shortUrl)
    }

    return (
        <main>
            <h1>URL Shortener</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://example.com/a/very/long/link"
                    required
                />
                <button type="submit">Shorten</button>
            </form>

            {shortUrl && (
                <p>
                    Your short URL:{' '}
                    <a href={shortUrl} target="_blank" rel="noreferrer">
                        {shortUrl}
                    </a>
                </p>
            )}
        </main>
    )
}

export default App