using Microsoft.EntityFrameworkCore;
using URLShortener.Data;
using URLShortener.Helpers;
using URLShortener.Models;

namespace URLShortener.Services
{
    public class URLShortenerService : IURLShortenerService
    {
        private readonly AppDbContext _context;

        public URLShortenerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ShortUrl> CreateShortUrlAsync(string originalUrl)
        {
            var shortUrl = new ShortUrl
            {
                OriginalUrl = originalUrl,
                CreatedAt = DateTime.UtcNow,
                ClickCount = 0
            };

            _context.ShortUrls.Add(shortUrl);

            await _context.SaveChangesAsync();

            shortUrl.ShortCode = Base62Encoder.Encode(shortUrl.Id);

            await _context.SaveChangesAsync();

            return shortUrl;
        }


        public async Task<ShortUrl?> GetByShortCodeAsync(string shortCode)
        {
            return await _context.ShortUrls
                .FirstOrDefaultAsync(x => x.ShortCode == shortCode);
        }

        public async Task IncrementClickCountAsync(ShortUrl shortUrl)
        {
            shortUrl.ClickCount++;
            await _context.SaveChangesAsync();
        }
    }
}