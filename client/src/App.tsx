import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { shortenUrl } from './api'

function App() {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        setShortUrl(null)
        setCopied(false)

        try {
            const result = await shortenUrl(url)
            setShortUrl(result.shortUrl)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong.')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCopy() {
        if (!shortUrl) return

        await navigator.clipboard.writeText(shortUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Shortening...' : 'Shorten'}
                </button>
            </form>

            {error && (
                <p role="alert" style={{ color: 'crimson' }}>
                    {error}
                </p>
            )}

            {shortUrl && (
                <p>
                    Your short URL:{' '}
                    <a href={shortUrl} target="_blank" rel="noreferrer">
                        {shortUrl}
                    </a>{' '}
                    <button type="button" onClick={handleCopy}>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </p>
            )}
        </main>
    )
}

export default App