export type ShortenResponse = {
    shortUrl: string
}

type ValidationProblem = {
    title?: string,
    errors?: Record<string, string[]>
}

export async function shortenUrl(originalUrl: string): Promise<ShortenResponse> {
    const response = await fetch('/api/urls/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl }),
    })

    if (!response.ok) {
        throw new Error(await getErrorMessage(response))
    }

    return response.json()
}

async function getErrorMessage(response: Response): Promise<string> {
    if (response.status === 400) {
        const problem: ValidationProblem = await response.json()
        const firstError = Object.values(problem.errors ?? {}).flat().at(0)
        return firstError ?? problem.title ?? 'That URL is not valid.'
    }

    return `Something went wrong (status ${response.status}). Is the API running?`
}