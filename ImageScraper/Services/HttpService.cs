using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace ImageScraper.Services
{
    public class HttpService
    {
        private readonly HttpClient _httpClient;

        public HttpService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<Stream> GetStreamAsync(string link)
        {
            var response = await _httpClient.GetAsync(link);
            var content = response.Content;
            return await content.ReadAsStreamAsync();
        }
    }
}
