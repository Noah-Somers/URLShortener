import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Check, Copy } from 'lucide-react'
import { shortenUrl } from './api'
import './App.css'

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
            <h1 className="brand">
                <img src="/kerf.svg" alt="" width={56} height={56} />
                Kerf
            </h1>

            <form className="shorten-form" onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="Paste a long URL"
                    aria-label="URL to cut"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Cutting...' : 'Cut'}
                </button>
            </form>

            {error && (
                <p role="alert" style={{ color: 'crimson' }}>
                    {error}
                </p>
            )}

            {shortUrl && (
                <div className="result">
                    <label htmlFor="short-url"> Your short URL</label>
                    <div className="copy-field">
                        <input
                            id="short-url"
                            type="text"
                            value={shortUrl}
                            readOnly
                            onFocus={(event) => event.target.select()}
                        />
                    <button
                        type="button"
                        className={copied ? 'copy-button copied' : 'copy-button'}
                        onClick={handleCopy}
                        aria-label={copied ? 'Copied' : 'Copy short URL'}
                        title={copied ? 'Copied!' : 'Copy'}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                    </div>
                    <a className="open-link" href={shortUrl} target="_blank" rel="noreferrer">
                    Open Link
                    </a>
                </div>
                )}
        </main>
    )
}

export default App