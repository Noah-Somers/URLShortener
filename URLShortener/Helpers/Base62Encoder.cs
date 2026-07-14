namespace URLShortener.Helpers
{
    public class Base62Encoder
    {
        private const string Characters =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        public static string Encode(long value)
        {
            if (value == 0)
            {
                return Characters[0].ToString();
            }

            var result = string.Empty;

            while (value > 0)
            {
                result = Characters[(int)(value % 62)] + result;
                value /= 62;
            }

            return result;
        }
    }
}