using Microsoft.AspNetCore.Mvc;
using URLShortener.Services;

namespace URLShortener.Controllers;

[ApiController]
public class RedirectController : ControllerBase
{
    private readonly IURLShortenerService _service;

    public RedirectController(IURLShortenerService service)
    {
        _service = service;
    }


    /// <summary>
    /// Redirects a short URL to the original URL.
    /// </summary>
    /// <param name="shortCode"></param>
    /// <returns></returns>
    [HttpGet("{shortCode}")]
    public async Task<IActionResult> RedirectToOriginalUrl(string shortCode)
    {
        if (string.IsNullOrWhiteSpace(shortCode))
        {
            return BadRequest("Short code cannot be empty.");
        }

        var shortUrl = await _service.GetByShortCodeAsync(shortCode);

        if (shortUrl == null)
        {
            return NotFound();
        }

        await _service.IncrementClickCountAsync(shortUrl);

        return Redirect(shortUrl.OriginalUrl);
    }
}