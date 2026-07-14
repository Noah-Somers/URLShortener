using System.ComponentModel.DataAnnotations;

namespace URLShortener.Models.RequestDTOs
{
    public class CreateShortUrlRequest
    {
        [Required]
        [Url]
        public string OriginalUrl { get; set; } = string.Empty;
    }
}