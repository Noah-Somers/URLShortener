using URLShortener.Models;

namespace URLShortener.Services
{
    public interface IURLShortenerService
    {
        Task<ShortUrl> CreateShortUrlAsync(string originalUrl);

        Task<ShortUrl?> GetByShortCodeAsync(string shortCode);

        Task IncrementClickCountAsync(ShortUrl shortUrl);
    }
}