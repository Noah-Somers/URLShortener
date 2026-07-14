namespace URLShortener.Models.ResponseDTOs
{
    public class AnalyticsResponse
    {
        public string OriginalUrl { get; set; } = string.Empty;
        public DateTime? CreatedAt { get; set; }
        public int ClickCount { get; set; }
    }
}