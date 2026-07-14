using Microsoft.AspNetCore.Mvc;
using URLShortener.Services;
using URLShortener.Models.ResponseDTOs;
using URLShortener.Models.RequestDTOs;

namespace URLShortener.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlsController: ControllerBase
    {
        private readonly IURLShortenerService _service;

        public UrlsController(IURLShortenerService service)
        {
            _service = service;
        }

        /// <summary>
        /// Creates a shortened URL for the provided long URL.
        /// </summary>
        /// <param name="longUrl"></param>
        /// <returns>The shortened URL.</returns>
        [HttpPost("shorten")]
        public async Task<IActionResult> Shorten([FromBody] CreateShortUrlRequest request)
        {
			var shortUrl = await _service.CreateShortUrlAsync(request.OriginalUrl);

			ShortenResponse response = new ShortenResponse()
            {
                ShortUrl = $"{Request.Scheme}://{Request.Host}/{shortUrl.ShortCode}"
            };

            return Ok(response);
        }


        /// <summary>
        /// Returns analytics for a shortened URL.
        /// </summary>
        /// <param name="shortCode"></param>
        /// <returns></returns>
        [HttpGet("analytics/{shortCode}")]
        public async Task<IActionResult> GetAnalytics(string shortCode)
        {
			var shortUrl = await _service.GetByShortCodeAsync(shortCode);

			if (shortUrl == null)
			{
				return NotFound();
			}

			var response = new AnalyticsResponse()
			{
				OriginalUrl = shortUrl.OriginalUrl,
				CreatedAt = shortUrl.CreatedAt,
				ClickCount = shortUrl.ClickCount
			};

			return Ok(response);
		}
    }
}