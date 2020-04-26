using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace ImageScraper.Services
{
    public class Process
    {
        private readonly HttpService _httpService;
        private readonly ScraperService _scraperService;
        private readonly FileManager _fileManager;
        private readonly MainOptions _mainOptions;

        public Process(
            HttpService httpService,
            ScraperService scraperService,
            FileManager fileManager,
            IOptions<MainOptions> options
            )
        {
            _httpService = httpService;
            _scraperService = scraperService;
            _fileManager = fileManager;
            _mainOptions = options.Value;
        }

        public async Task Run()
        {
            var directoryName = _mainOptions.OutputDirectoryName;
            var fileName = _mainOptions.OutputFileName;
            
            if (!_fileManager.DirectoryExists(directoryName))
            {
                _fileManager.CreateDirectory(directoryName);
            }

            var images = await _scraperService.GetImages();

            foreach (var image in images)
            {
                var inputStream = await _httpService.GetStreamAsync(image.Link);
                var filePath = _fileManager.Combine(directoryName, image.FileName);
                await _fileManager.SaveFile(filePath, inputStream);
            }

            var json = JsonConvert.SerializeObject(images);
            var path = _fileManager.Combine(directoryName, fileName);
            await _fileManager.SaveFile(path, json);

            _scraperService.Close();
        }
    }
}
