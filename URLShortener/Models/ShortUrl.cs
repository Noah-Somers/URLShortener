using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace URLShortener.Models
{
    [Index(nameof(ShortCode), IsUnique = true)]
    public class ShortUrl
    {
        [Key]
        public long Id { get; set; }
        public string OriginalUrl { get; set; } = string.Empty;
        public string? ShortCode { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int ClickCount { get; set; } = 0;
    }
}